import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Book from "./views/Book.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/book",
      name: "book",
      component: Book,
      props: route => ({ movieId: route.query.id, timeslot: route.query.t })
    },
    { path: "*", redirect: "/" }
  ]
});
