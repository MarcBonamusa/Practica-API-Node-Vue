<template>
  <div class="page-container">
    <div class="login-card">
      <h1>Iniciar Sessió</h1>

      <form @submit.prevent="login">
        <div class="form-group">
          <label>Usuari</label>
          <input v-model="username" type="text" placeholder="Introdueix el nom d'usuari" required />
        </div>

        <div class="form-group">
          <label>Contrasenya</label>
          <input v-model="password" type="password" placeholder="Introdueix la contrasenya" required />
        </div>

        <button type="submit">Entrar</button>
      </form>

      <div class="footer-links">
        <p>No tens compte? <router-link to="/register">Registra't aquí</router-link></p>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      }),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Error al iniciar sesión');

    localStorage.setItem('user', JSON.stringify(data.user));

    router.push('/');

  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.login-card {
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  color: #1f2933;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  font-weight: 700;
}

.form-group {
  margin-bottom: 1.2rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.9rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #1d4ed8;
}

.footer-links {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #4a5568;
}

a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
}

a:hover {
  text-decoration: underline;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fee2e2;
  color: #dc2626;
  border-radius: 6px;
  font-size: 0.9rem;
  border: 1px solid #fecaca;
}
</style>