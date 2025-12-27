<script setup>
import { ref } from 'vue';
import { useFetch } from '@/composable/useFetch.js';
import GolejadorCard from '@/component/GolejadorCard.vue';
import { RouterLink, RouterView } from 'vue-router';

const url = ref(`http://localhost:3000/golejadors`);

const { data, error, loading, fetchData } = useFetch(url);

function deleteGolejador(pos) {
  fetch(`http://localhost:3000/golejadors/${pos}`, {
    method: 'DELETE',
  }).then(() => {
    fetchData();
  });
}

</script>

<template>
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
          <GolejadorCard :golejador="golejador" :key="golejador.pos" @delete-golejador="deleteGolejador"/>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

h1 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2933;
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