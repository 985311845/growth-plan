import Vue from "vue";
import VueRouter from "vue-router";
import Login4A from '../views/Login4A.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login4A",
    component: Login4A,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
