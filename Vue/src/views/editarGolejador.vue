<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const golejador = ref({
  nombre: '',
  equipo: '',
  goles: 0
})

onMounted(() => {
  const id = route.params.id;

  fetch(`http://localhost:3000/golejadors/${id}`, { credentials: 'include' })
    .then(res => res.json())
    .then(data => {
      console.log("Datos recibidos:", data);

      if (data.golejador) {
        golejador.value = data.golejador;
      } else {
        golejador.value = data;
      }
      
    })
    .catch(err => console.error("Error cargando:", err));
})

function updateGolejador() {
  const id = route.params.id;

  fetch(`http://localhost:3000/golejadors/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(golejador.value)
  })
    .then(res => {
      if (res.ok) {
        router.push('/')
      } else {
        alert("Error al guardar cambios");
      }
    })
}
</script>

<template>
  <div class="page-container">
    <div class="edit-card">
      <header>
        <h1>Editar Golejador: {{ golejador.nombre || '...' }}</h1>
      </header>
      <main>
        <form @submit.prevent="updateGolejador">
          <div class="form-group">
            <label for="nombre">Nom:</label>
            <input type="text" id="nombre" v-model="golejador.nombre" required />
          </div>

          <div class="form-group">
            <label for="equipo">Equip:</label>
            <input type="text" id="equipo" v-model="golejador.equipo" required />
          </div>

          <div class="form-group">
            <label for="goles">Gols:</label>
            <input type="number" id="goles" v-model.number="golejador.goles" required />
          </div>

          <button type="submit">Desar Canvis</button>
        </form>
      </main>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 1rem;
}

.edit-card {
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

header h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: #1f2933;
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

button {
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.75rem;
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