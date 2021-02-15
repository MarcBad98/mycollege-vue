import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Jobs from "../views/Jobs.vue";
import Skills from "../views/Skills.vue";

import GeneralInformation from "../views/UsefulLinks/GeneralInformation.vue";
import Browse from "../views/UsefulLinks/Browse.vue";
import BusinessSolutions from "../views/UsefulLinks/BusinessSolutions.vue";
import Directories from "../views/UsefulLinks/Directories.vue";

import Accessibility from "../views/ImportantLinks/Accessibility.vue";
import UserAgreement from "../views/ImportantLinks/UserAgreement.vue";
import PrivacyPolicy from "../views/ImportantLinks/PrivacyPolicy.vue";
import CookiePolicy from "../views/ImportantLinks/CookiePolicy.vue";
import CopyrightPolicy from "../views/ImportantLinks/CopyrightPolicy.vue";
import BrandPolicy from "../views/ImportantLinks/BrandPolicy.vue";
import GuestControls from "../views/ImportantLinks/GuestControls.vue";

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
  },
  {
    path: "/accessibility",
    name: "Accessibility",
    component: Accessibility
  },
  {
    path: "/user-agreement",
    name: "UserAgreement",
    component: UserAgreement
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy
  },
  {
    path: "/cookie-policy",
    name: "CookiePolicy",
    component: CookiePolicy
  },
  {
    path: "/copyright-policy",
    name: "CopyrightPolicy",
    component: CopyrightPolicy
  },
  {
    path: "/brand-policy",
    name: "BrandPolicy",
    component: BrandPolicy
  },
  {
    path: "/guest-controls",
    name: "GuestControls",
    component: GuestControls
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
