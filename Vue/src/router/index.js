import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: "/", name: "Home", component: () => import("@/views/Home.vue")},
    {path: "/editarGolejador/:pos", name: "editarGolejador", component: () => import("@/views/editarGolejador.vue")},
    {path: "/afegirGolejador", name: "afegirGolejador", component: () => import("@/views/afegirGolejador.vue")},

  ],
})

export default router
