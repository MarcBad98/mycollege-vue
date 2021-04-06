<template>
  <b-notification
    tabindex="0"
    role="region"
    aria-label="Feature Under Construction"
    type="is-warning is-light"
    :closable="false"
  >
    <p aria-hidden="true" class="announcement">
      <strong>
        🚧 Feature Under Construction 🚧
        <br />
        <template v-if="feature !== null">{{ feature }}</template>
      </strong>
    </p>
  </b-notification>
</template>

<style scoped>
.announcement {
  text-align: center;
}
</style>

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
