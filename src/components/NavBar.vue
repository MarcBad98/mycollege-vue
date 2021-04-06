<template>
  <b-navbar type="is-primary">
    <template #brand>
      <b-navbar-item
        tag="router-link"
        :to="{ name: 'Home' }"
        :active="$route.name === 'Home'"
      >
        MyCollege
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item
        tag="router-link"
        :to="{ name: 'Jobs' }"
        :active="$route.name === 'Jobs'"
      >
        Jobs
      </b-navbar-item>
      <b-navbar-dropdown label="Skills" hoverable>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'Skills', query: { skill: 'Web Development' } }"
          :active="$route.query.skill === 'Web Development'"
        >
          Web Development
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'Skills', query: { skill: 'JavaScript' } }"
          :active="$route.query.skill === 'JavaScript'"
        >
          JavaScript
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'Skills', query: { skill: 'Python' } }"
          :active="$route.query.skill === 'Python'"
        >
          Python
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'Skills', query: { skill: 'REST vs GraphQL' } }"
          :active="$route.query.skill === 'REST vs GraphQL'"
        >
          REST vs GraphQL
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'Skills', query: { skill: 'Tips for Remote Work' } }"
          :active="$route.query.skill === 'Tips for Remote Work'"
        >
          Tips for Remote Work
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="General Links" hoverable>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'About' }"
          :active="$route.name === 'About'"
        >
          About
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'HelpCenter' }"
          :active="$route.name === 'HelpCenter'"
        >
          Help Center
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'Press' }"
          :active="$route.name === 'Press'"
        >
          Press
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'Blog' }"
          :active="$route.name === 'Blog'"
        >
          Blog
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'CareersCenter' }"
          :active="$route.name === 'CareersCenter'"
        >
          Careers Center
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'DevelopersCenter' }"
          :active="$route.name === 'DevelopersCenter'"
        >
          Developers Center
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="Useful Links" hoverable>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'Browse' }"
          :active="$route.name === 'Browse'"
        >
          Browse MyCollege
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'BusinessSolutions' }"
          :active="$route.name === 'BusinessSolutions'"
        >
          Business Solutions
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'Directories' }"
          :active="$route.name === 'Directories'"
        >
          Directories
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown label="Important Links" hoverable>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'Accessibility' }"
          :active="$route.name === 'Accessibility'"
        >
          Accessibility
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'UserAgreement' }"
          :active="$route.name === 'UserAgreement'"
        >
          User Agreement
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'PrivacyPolicy' }"
          :active="$route.name === 'PrivacyPolicy'"
        >
          Privacy Policy
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'CookiePolicy' }"
          :active="$route.name === 'CookiePolicy'"
        >
          Cookie Policy
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'CopyrightPolicy' }"
          :active="$route.name === 'CopyrightPolicy'"
        >
          Copyright Policy
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'BrandPolicy' }"
          :active="$route.name === 'BrandPolicy'"
        >
          Brand Policy
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
    <template #end>
      <b-navbar-item tag="div">
        <b-field grouped>
          <b-input v-model="keyword" size="is-small" role="search"></b-input>
          <p class="control">
            <b-button
              label="Search"
              size="is-small"
              icon-left="magnify"
              @click="search()"
            ></b-button>
          </p>
        </b-field>
      </b-navbar-item>
      <b-navbar-dropdown
        label="Anonymous User"
        hoverable
        v-if="!$keycloak.authenticated"
      >
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-button
              label="Sign Up"
              type="is-primary"
              icon-left="account-plus"
              expanded
              @click="$keycloak.keycloak.register()"
            ></b-button>
            <b-button
              label="Log In"
              type="is-light"
              icon-left="login"
              expanded
              @click="$keycloak.keycloak.login()"
            ></b-button>
          </div>
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-dropdown
        :label="$keycloak.userName"
        hoverable
        v-else-if="$keycloak.authenticated"
      >
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'ProfileView' }"
          :active="$route.name === 'ProfileView'"
        >
          Profile
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'FriendsList' }"
          :active="$route.name === 'FriendsList'"
        >
          Friends
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          :to="{ name: 'UserSettings' }"
          :active="$route.name === 'UserSettings'"
        >
          Settings
        </b-navbar-item>
        <b-navbar-item tag="div">
          <b-button
            label="Log Out"
            type="is-light"
            icon-left="logout"
            expanded
            @click="$keycloak.keycloak.logout()"
          ></b-button>
        </b-navbar-item>
      </b-navbar-dropdown>
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
      const route = { name: "SearchResults", query: { keyword: this.keyword } };
      if (this.$route.name === route.name) this.$router.replace(route);
      else this.$router.push(route);
    }
  }
};
</script>
