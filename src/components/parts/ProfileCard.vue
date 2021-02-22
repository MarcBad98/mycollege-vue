<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <h3 class="title">{{ fullName }}</h3>
          <p class="subtitle">{{ profile.title }}</p>
        </div>
      </div>
      <b-field label="Description">
        {{ fullName }} is a {{ profile.title }} studying {{ profile.major }} at
        {{ profile.currentUniversity }}. Here's a little something this person
        said about themself: "{{ profile.about }}"
      </b-field>
      <b-field label="Employment">
        <template v-if="profile.employment.length === 0">
          This person does not have any employment listed.
        </template>
      </b-field>
      <b-field label="Education">
        <template v-if="profile.education.length === 0">
          This person does not have any education listed.
        </template>
      </b-field>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileCard",
  props: {
    profile: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    fullName() {
      return this.$store.state.user.fullName;
    }
  }
};
</script>
