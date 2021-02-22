<template>
  <div>
    <h1>Profile</h1>
    <div class="buttons">
      <b-button
        tag="router-link"
        :to="{ name: 'ProfileView' }"
        type="is-primary"
        icon-left="eye"
      >
        View
      </b-button>
      <b-button
        tag="router-link"
        :to="{ name: 'ProfileEdit' }"
        type="is-warning"
        icon-left="pencil"
      >
        Edit
      </b-button>
    </div>
    <hr />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "UserProfile"
};
</script>
