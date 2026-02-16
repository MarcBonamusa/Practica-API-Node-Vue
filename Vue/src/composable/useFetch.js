import { ref, watchEffect, toValue } from 'vue';

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  const fetchData = async () => {
    loading.value = true;
    data.value = null;
    error.value = null;
    
    try {
      const res = await fetch(toValue(url), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
            throw new Error('No tienes permiso (403). Revisa si estás logueado.');
        }
        throw new Error(`Error en la petición: ${res.status}`);
      }

      data.value = await res.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  watchEffect(() => {
    fetchData();
  });

  return { data, error, loading, fetchData };
}