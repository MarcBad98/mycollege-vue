<template>
  <div>
    <h1 class="title" tabindex="0">Profile</h1>
    <hr aria-hidden="true" />
    <div class="columns">
      <div class="column is-one-quarter box has-background-light">
        <b-menu role="menu" aria-label="User Account Management">
          <b-menu-list label="Profile">
            <b-menu-item
              tag="router-link"
              :to="{ name: 'ProfileView' }"
              label="View Profile"
              type="is-info"
              icon="eye"
              :active="$route.name === 'ProfileView'"
            ></b-menu-item>
            <b-menu-item
              tag="router-link"
              :to="{ name: 'ProfileEdit' }"
              label="Edit Profile"
              type="is-warning"
              icon="pencil"
              :active="$route.name === 'ProfileEdit'"
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
