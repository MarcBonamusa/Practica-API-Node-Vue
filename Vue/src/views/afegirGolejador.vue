<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const nuevoGolejador = ref({
  nom: '',
  equip: '',
  gols: 0
})

function createGolejador() {
  fetch('http://localhost:3000/golejadors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(nuevoGolejador.value)
  })
  .then(res => {
    if (res.ok) {
      router.push('/')
    } else {
      console.error("Error en el servidor");
    }
  })
}

</script>

<template>
  <div>
    <header>
      <h1>Afegir Nou Golejador</h1>
    </header>
    <main>
      <form @submit.prevent="createGolejador">
        <label for="nombre">Nom:</label>
        <input type="text" id="nombre" v-model="nuevoGolejador.nom" placeholder="Ex: Lamine Yamal" required /><br>

        <label for="equipo">Equip:</label>
        <input type="text" id="equipo" v-model="nuevoGolejador.equip" placeholder="Ex: FC Barcelona" required /><br>

        <label for="goles">Gols:</label>
        <input type="number" id="goles" v-model.number="nuevoGolejador.gols" required /><br>

        <button type="submit">Crear Golejador</button>
      </form>
    </main>
  </div>
</template>

<style scoped>

div {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  background-color: #ffffff;
}

header h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #1f2933;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 0.8rem;
  margin-bottom: 0.3rem;
  font-weight: 600;
  color: #374151;
}

input {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  margin-top: 1.5rem;
  padding: 0.6rem;
  font-weight: 600;
  font-size: 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #1d4ed8;
}

</style>