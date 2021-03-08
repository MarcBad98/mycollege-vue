<template>
  <div>
    <h1 tabindex="0">Profile</h1>
    <div class="buttons">
      <b-button
        tag="router-link"
        :to="{ name: 'ProfileView' }"
        label="View"
        type="is-info"
        icon-left="eye"
      />
      <b-button
        tag="router-link"
        :to="{ name: 'ProfileEdit' }"
        label="Edit"
        type="is-warning"
        icon-left="pencil"
      />
    </div>
    <hr aria-hidden="true" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "UserProfile"
};
</script>
