<script setup>
import { ref, onMounted } from 'vue';
import { useFetch } from '@/composable/useFetch.js';
import GolejadorCard from '@/component/GolejadorCard.vue';
import { RouterLink, useRouter } from 'vue-router';

const url = ref(`http://localhost:3000/golejadors`);
const { data, error, loading, fetchData } = useFetch(url);
const router = useRouter();
const username = ref('');

onMounted(() => {
  const userStored = localStorage.getItem('user');
  if (userStored) {
    try {
      username.value = JSON.parse(userStored).username;
    } catch (e) {
      username.value = userStored;
    }
  }
});

async function logout() {
  try {
    await fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include'
    });

    localStorage.removeItem('user');
    router.push('/login');
  } catch (e) {
    console.error("Error al salir", e);
  }
}

function deleteGolejador(pos) {
  fetch(`http://localhost:3000/golejadors/${pos}`, {
    method: 'DELETE',
    credentials: 'include'
  }).then(() => {
    fetchData();
  });
}
</script>

<template>
  <div class="user-bar" v-if="username">
    <span>Hola, <strong>{{ username }}</strong></span>
    <button @click="logout" class="logout-btn">Tancar Sessió</button>
  </div>
  <h1>Llistat de Golejadors</h1>
  <div>
    <div v-if="loading">Carregant...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div class="add-button">
        <RouterLink to="/afegirGolejador">Afegir un nou golejador</RouterLink>
      </div>
      <div class="grid" v-if="data && data.goleadores">
        <div v-for="golejador in data.goleadores">
          <GolejadorCard :golejador="golejador" :key="golejador.pos" @delete-golejador="deleteGolejador" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-bar {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #f8f9fa;
  padding: 8px 15px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logout-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
}

.logout-btn:hover {
  background-color: #c82333;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2933;
  margin-top: 30px;
}

.add-button {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.add-button a {
  padding: 0.6rem 1.2rem;
  background-color: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.add-button a:hover {
  background-color: #1d4ed8;
}
</style>