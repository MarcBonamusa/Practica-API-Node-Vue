import express from 'express';
import golejadorRoutes from './routes/golejadors.js';
import { PORT, SECRET_JWT_KEY } from './config.js';
import { UserRepository } from './user-repository.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use((req, res, next) => {
    const token = req.cookies.access_token;
    req.session = { user: null };

    if (token) {
        try {
            const data = jwt.verify(token, SECRET_JWT_KEY);
            req.session.user = data;
        } catch (error) {
            req.session.user = null;
        }
    }
    next();
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserRepository.login({ username, password });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            SECRET_JWT_KEY,
            { expiresIn: '1h' }
        );

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60
        })
        .json({ status: 'ok', user, message: 'Login correcte' });

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const id = await UserRepository.create({ username, password });
        res.status(201).json({ id, message: 'Usuari creat' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/logout', (req, res) => {
    res
        .clearCookie('access_token')
        .json({ message: 'Logout exitós' });
});

app.get('/protected', (req, res) => {
    if (req.session.user) {
        res.json({ authenticated: true, user: req.session.user });
    } else {
        res.status(401).json({ authenticated: false });
    }
});

const requireAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.status(403).json({ message: 'Accés denegat' });
    }
    next();
};

app.use('/golejadors', requireAuth, golejadorRoutes);

app.listen(PORT, () => {
    console.log(`Servidor API REST corrent en port ${PORT}`);
});