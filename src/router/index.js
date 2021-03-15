import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import Jobs from "@/views/Jobs.vue";
import Skills from "@/views/Skills.vue";

import About from "@/views/GeneralLinks/About.vue";
import HelpCenter from "@/views/GeneralLinks/HelpCenter.vue";
import Press from "@/views/GeneralLinks/Press.vue";
import Blog from "@/views/GeneralLinks/Blog.vue";
import CareersCenter from "@/views/GeneralLinks/CareersCenter.vue";
import DevelopersCenter from "@/views/GeneralLinks/DevelopersCenter.vue";

import Browse from "@/views/UsefulLinks/Browse.vue";
import BusinessSolutions from "@/views/UsefulLinks/BusinessSolutions.vue";
import Directories from "@/views/UsefulLinks/Directories.vue";

import Accessibility from "@/views/ImportantLinks/Accessibility.vue";
import UserAgreement from "@/views/ImportantLinks/UserAgreement.vue";
import PrivacyPolicy from "@/views/ImportantLinks/PrivacyPolicy.vue";
import CookiePolicy from "@/views/ImportantLinks/CookiePolicy.vue";
import CopyrightPolicy from "@/views/ImportantLinks/CopyrightPolicy.vue";
import BrandPolicy from "@/views/ImportantLinks/BrandPolicy.vue";

import SearchResults from "@/views/UserProfile/SearchResults.vue";
import OtherUserProfileView from "@/views/UserProfile/OtherUserProfileView.vue";
import UserProfile from "@/views/UserProfile/UserProfile.vue";
import UserProfileView from "@/views/UserProfile/UserProfileView.vue";
import UserProfileEdit from "@/views/UserProfile/UserProfileEdit.vue";
import UserSettings from "@/views/UserSettings.vue";

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
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/help-center",
    name: "HelpCenter",
    component: HelpCenter
  },
  {
    path: "/press",
    name: "Press",
    component: Press
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog
  },
  {
    path: "/careers-center",
    name: "CareersCenter",
    component: CareersCenter
  },
  {
    path: "/developers-center",
    name: "DevelopersCenter",
    component: DevelopersCenter
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
    path: "/search-results",
    name: "SearchResults",
    component: SearchResults
  },
  {
    path: "/profile",
    component: UserProfile,
    children: [
      {
        path: "",
        name: "ProfileView",
        component: UserProfileView
      },
      {
        path: "edit",
        name: "ProfileEdit",
        component: UserProfileEdit
      }
    ]
  },
  {
    path: "/profile/:fullName",
    name: "OtherUserProfileView",
    component: OtherUserProfileView
  },
  {
    path: "/settings",
    name: "UserSettings",
    component: UserSettings
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
