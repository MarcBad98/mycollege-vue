<template>
  <b-notification type="is-warning is-light" :closable="false">
    <p class="announcement">
      <strong>
        🚧 Feature Under Construction 🚧
        <br />
        <template v-if="feature !== null">{{ feature }}</template>
      </strong>
    </p>
  </b-notification>
</template>

<script>
export default {
  name: "UnderConstruction",
  props: {
    feature: {
      type: String,
      default: null
    }
  }
};
</script>

<style scoped>
.announcement {
  text-align: center;
}
</style>
