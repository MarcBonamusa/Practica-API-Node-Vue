<script setup>
    
import { RouterLink } from 'vue-router';

const props = defineProps({
    golejador: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['deleteGolejador']);

const esborrarGolejador = (pos) => {
    if (confirm(`Segur que vols eliminar a ${props.golejador.nombre}?`)) {
        emit('deleteGolejador', pos);
    }
};

</script>

<template>
    <div class="GolejadorCard">
        <h3>{{ golejador.nombre }}</h3>
        <p><strong>Equip:</strong> {{ golejador.equipo }}</p>
        <p><strong>Gols:</strong> {{ golejador.goles }}</p>
        
        <div class="botons">
            <RouterLink :to="`/editarGolejador/${golejador.pos}`" class="editar">Editar</RouterLink>
            <button @click="esborrarGolejador(golejador.pos)" class="esborrar">Eliminar</button>
        </div>
    </div>
</template>

<style scoped>

.GolejadorCard {
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
    margin: 10px;
    background-color: #f9f9f9;
}

.botons {
    margin-top: 1rem;
    display: flex;
    gap: 10px;
}

.editar { 
    color: blue; 
    text-decoration: none; 
}

.esborrar { 
    color: red; cursor: 
    pointer; border: none; 
    background: none; 
}

</style>