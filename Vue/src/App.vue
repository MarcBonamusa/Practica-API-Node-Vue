<script setup></script>

<template>

  <nav>
    <div class="container">
        <RouterLink to="/">Inici</RouterLink>
    </div>
  </nav>
  <RouterView/>

</template>

<style scoped>

.container {
  padding: 1rem;
}

.container a {
  text-decoration: none;
  font-weight: bold;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  transition: color 0.2s ease;
  background-color: #2563eb;
}

.container a:hover {
  text-decoration: underline;
}

</style>