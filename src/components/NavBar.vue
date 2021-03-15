<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
        MyCollege
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ name: 'Jobs' }">
        Jobs
      </b-navbar-item>
      <b-navbar-dropdown label="Skills">
        <b-navbar-item
          tag="router-link"
          :to="{
            name: 'Skills',
            query: { skill: 'Beginner\'s Guide to Web Development' }
          }"
        >
          Beginner's Guide to Web Development
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{
            name: 'Skills',
            query: { skill: 'JavaScript' }
          }"
        >
          JavaScript
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{
            name: 'Skills',
            query: { skill: 'Python' }
          }"
        >
          Python
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{
            name: 'Skills',
            query: { skill: 'REST vs GraphQL' }
          }"
        >
          REST vs GraphQL
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{
            name: 'Skills',
            query: { skill: 'Productivity while Working from Home' }
          }"
        >
          Productivity while Working from Home
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="General Links">
        <b-navbar-item tag="router-link" :to="{ name: 'About' }">
          About
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'HelpCenter' }">
          Help Center
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'Press' }">
          Press
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'Blog' }">
          Blog
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'CareersCenter' }">
          Careers Center
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'DevelopersCenter' }">
          Developers Center
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="Useful Links">
        <b-navbar-item tag="router-link" :to="{ name: 'Browse' }">
          Browse MyCollege
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'BusinessSolutions' }">
          Business Solutions
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'Directories' }">
          Directories
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="Important Links">
        <b-navbar-item tag="router-link" :to="{ name: 'Accessibility' }">
          Accessibility
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'UserAgreement' }">
          User Agreement
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'PrivacyPolicy' }">
          Privacy Policy
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'CookiePolicy' }">
          Cookie Policy
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'CopyrightPolicy' }">
          Copyright Policy
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'BrandPolicy' }">
          Brand Policy
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
    <template #end>
      <b-navbar-item tag="div">
        <b-input role="search" v-model="keyword"></b-input>
        <b-button label="Search" icon-left="magnify" @click="search()" />
      </b-navbar-item>
      <template v-if="!$keycloak.authenticated">
        <b-navbar-dropdown label="Anonymous User">
          <b-navbar-item tag="div">
            <div class="buttons">
              <b-button
                type="is-primary"
                expanded
                @click="$keycloak.keycloak.register()"
              >
                Sign Up
              </b-button>
              <b-button
                type="is-light"
                expanded
                @click="$keycloak.keycloak.login()"
              >
                Log In
              </b-button>
            </div>
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>
      <template v-else>
        <b-navbar-dropdown :label="$keycloak.userName">
          <b-navbar-item tag="router-link" :to="{ name: 'ProfileView' }">
            Profile
          </b-navbar-item>
          <b-navbar-item tag="router-link" :to="{ name: 'UserSettings' }">
            Settings
          </b-navbar-item>
          <b-navbar-item tag="div">
            <b-button
              type="is-light"
              expanded
              @click="$keycloak.keycloak.logout()"
            >
              Log Out
            </b-button>
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    search() {
      const route = {
        name: "SearchResults",
        query: { keyword: this.keyword }
      };
      if (this.$route.name === "SearchResults") this.$router.replace(route);
      else this.$router.push(route);
    }
  }
};
</script>
