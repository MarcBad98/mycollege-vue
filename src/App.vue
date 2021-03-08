<template>
  <div id="app">
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
          MyCollege
        </b-navbar-item>
      </template>
      <template #start>
        <template v-for="link in links">
          <template v-if="link.type === 'item'">
            <b-navbar-item
              v-bind:key="link.label"
              tag="router-link"
              :to="link.route"
            >
              {{ link.label }}
            </b-navbar-item>
          </template>
          <template v-if="link.type === 'dropdown'">
            <b-navbar-dropdown v-bind:key="link.label" :label="link.label">
              <template v-for="item in link.items">
                <b-navbar-item
                  v-bind:key="item.label"
                  tag="router-link"
                  :to="item.route"
                >
                  {{ item.label }}
                </b-navbar-item>
              </template>
            </b-navbar-dropdown>
          </template>
        </template>
      </template>
      <template #end>
        <b-navbar-item tag="div">
          <b-input
            placeholder="Search for People"
            type="search"
            icon="magnify"
            icon-clickable
            rounded
          ></b-input>
        </b-navbar-item>
        <template v-if="!$keycloak.authenticated">
          <b-navbar-dropdown label="Anonymous User">
            <b-navbar-item tag="div" v-if="!$keycloak.authenticated">
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
    <main class="section container">
      <div class="content box">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import { CreateRetrieveUser } from "@/graphql/User.gql";
import { EventBus } from "@/EventBus";

export default {
  mounted() {
    this.$apollo
      .mutate({
        mutation: CreateRetrieveUser,
        variables: {
          keycloakUserId: this.$keycloak.subject
        }
      })
      .then(response => {
        this.$store.state.user = response.data.createRetrieveUser.user;
        this.$buefy.snackbar.open("Login successful. Welcome to MyCollege!");
        EventBus.$emit("retrieved-user-data");
      });
  },
  data() {
    return {
      links: [
        {
          type: "item",
          label: "Jobs",
          route: { name: "Jobs" }
        },
        {
          type: "dropdown",
          label: "Skills",
          items: [
            "Beginner's Guide to Web Development",
            "JavaScript",
            "Python",
            "REST vs GraphQL",
            "Productivity while Working from Home"
          ].map(skill => {
            return {
              label: skill,
              route: {
                name: "Skills",
                query: { skill }
              }
            };
          })
        },
        {
          type: "dropdown",
          label: "General Links",
          items: [
            {
              label: "About",
              route: { name: "About" }
            },
            {
              label: "Help Center",
              route: { name: "HelpCenter" }
            },
            {
              label: "Press",
              route: { name: "Press" }
            },
            {
              label: "Blog",
              route: { name: "Blog" }
            },
            {
              label: "Careers Center",
              route: { name: "CareersCenter" }
            },
            {
              label: "Developers Center",
              route: { name: "DevelopersCenter" }
            }
          ]
        },
        {
          type: "dropdown",
          label: "Useful Links",
          items: [
            {
              label: "Browse MyCollege",
              route: { name: "Browse" }
            },
            {
              label: "Business Solutions",
              route: { name: "BusinessSolutions" }
            },
            {
              label: "Directories",
              route: { name: "Directories" }
            }
          ]
        },
        {
          type: "dropdown",
          label: "Important Links",
          items: [
            {
              label: "Accessibility",
              route: { name: "Accessibility" }
            },
            {
              label: "User Agreement",
              route: { name: "UserAgreement" }
            },
            {
              label: "Privacy Policy",
              route: { name: "PrivacyPolicy" }
            },
            {
              label: "Cookie Policy",
              route: { name: "CookiePolicy" }
            },
            {
              label: "Copyright Policy",
              route: { name: "CopyrightPolicy" }
            },
            {
              label: "Brand Policy",
              route: { name: "BrandPolicy" }
            }
          ]
        }
      ]
    };
  }
};
</script>
