<template>
  <b-notification
    role="region"
    aria-label="Feature Under Construction"
    tabindex="0"
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
