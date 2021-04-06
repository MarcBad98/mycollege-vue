<template>
  <div>
    <h1 class="title" tabindex="0">Account</h1>
    <hr aria-hidden="true" />
    <div class="columns">
      <div class="column is-one-quarter">
        <b-menu
          role="menu"
          aria-label="User Account Management"
          class="box has-background-light"
        >
          <b-menu-list label="Profile">
            <b-menu-item
              tag="router-link"
              :to="{ name: 'ProfileView' }"
              label="View Profile"
              icon="account"
              :active="$route.name === 'ProfileView'"
            ></b-menu-item>
            <b-menu-item
              tag="router-link"
              :to="{ name: 'ProfileEdit' }"
              label="Edit Profile"
              icon="account-edit"
              :active="$route.name === 'ProfileEdit'"
            ></b-menu-item>
          </b-menu-list>
          <b-menu-list label="Settings">
            <b-menu-item
              tag="router-link"
              :to="{ name: 'UserSettings' }"
              label="Settings"
              icon="account-cog"
              :active="$route.name === 'UserSettings'"
            ></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
      <div class="column">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfile"
};
</script>
