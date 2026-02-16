import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue') 
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/registro.vue')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/afegirGolejador',
      name: 'afegirGolejador',
      component: () => import('../views/afegirGolejador.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/editarGolejador/:id', 
      name: 'editarGolejador',
      component: () => import('../views/editarGolejador.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) {
    return next();
  }

  try {
    const res = await fetch('http://localhost:3000/protected', {
      credentials: 'include'
    });

    if (!res.ok) {
      return next('/login');
    }

    const data = await res.json();

    if (data.authenticated) {
      next();
    } else {
      next('/login');
    }

  } catch (error) {
    console.error("Error de autenticación:", error);
    next('/login');
  }
});

export default router;