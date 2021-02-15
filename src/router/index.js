import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Jobs from "../views/Jobs.vue";
import Skills from "../views/Skills.vue";
import GeneralInformation from "../views/UsefulLinks/GeneralInformation.vue";
import Browse from "../views/UsefulLinks/Browse.vue";
import BusinessSolutions from "../views/UsefulLinks/BusinessSolutions.vue";
import Directories from "../views/UsefulLinks/Directories.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: Jobs
  },
  {
    path: "/skills",
    name: "Skills",
    component: Skills
  },
  {
    path: "/general-information",
    name: "GeneralInformation",
    component: GeneralInformation
  },
  {
    path: "/browse",
    name: "Browse",
    component: Browse
  },
  {
    path: "/business-solutions",
    name: "BusinessSolutions",
    component: BusinessSolutions
  },
  {
    path: "/directories",
    name: "Directories",
    component: Directories
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
