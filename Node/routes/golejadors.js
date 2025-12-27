import express from 'express';
import fs from 'fs';

const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data, null, 2));

router.get('/', (req, res) => {
    const data = readData();
    res.json({ goleadores: data.goleadores });
});

router.get('/:pos', (req, res) => {
    const data = readData();
    const golejador = data.goleadores.find(p => p.pos === parseInt(req.params.pos));
    if (!golejador) return res.status(404).json({ error: 'Golejador not found' });
    res.json({ golejador });
});

router.post('/', (req, res) => {
    const data = readData();
    const { nom, equip, gols } = req.body;

    if (!nom || !equip || gols === undefined) {
        return res.status(400).json({ error: 'Tots els camps són obligatoris' });
    }

    const newGolejador = { 
        pos: data.goleadores.length > 0 ? data.goleadores[data.goleadores.length - 1].pos + 1 : 1,
        nombre: nom,
        equipo: equip,
        goles: parseInt(gols)
    };

    data.goleadores.push(newGolejador);
    writeData(data);
    res.status(201).json({ golejador: newGolejador });
});

router.put('/:pos', (req, res) => {
    const data = readData();
    const pos = parseInt(req.params.pos);
    const index = data.goleadores.findIndex(g => g.pos === pos); 
    
    if (index === -1) return res.status(404).json({ error: 'Golejador no trobat' });
    
    data.goleadores[index] = { ...data.goleadores[index], ...req.body };
    writeData(data);
    res.json({ golejador: data.goleadores[index] });
});


router.delete('/:pos', (req, res) => {
    const data = readData();
    const pos = parseInt(req.params.pos);
    const index = data.goleadores.findIndex(g => g.pos === pos);
    
    if (index === -1) return res.status(404).json({ error: 'Golejador no trobat' });
    
    const deleted = data.goleadores.splice(index, 1);
    writeData(data);
    res.json({ message: 'Golejador eliminat', golejador: deleted[0] });
});

export default router;