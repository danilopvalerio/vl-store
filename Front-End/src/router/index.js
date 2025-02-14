import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login.vue";
import Produto from "@/pages/Produto.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "Login",
  //   component: LoginPage,
  // },
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/produto",
    name: "Produtos",
    component: Produto,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
