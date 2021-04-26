<template>
  <b-notification
    tabindex="0"
    role="region"
    aria-label="Notifications"
    type="is-info is-light"
    :closable="false"
    v-if="messages.length !== 0"
  >
    <div class="content">
      <div class="columns">
        <div class="column is-2">
          <h2 class="title is-4">Notifications</h2>
        </div>
        <div class="column is-10">
          <p v-for="message in messages" :key="message.id">
            {{ message.title }}
          </p>
        </div>
      </div>
    </div>
  </b-notification>
</template>

<script>
export default {
  name: "Notifications",
  computed: {
    messages() {
      return this.$store.state.messages.filter(
        message => message.category === "notification"
      );
    }
  }
};
</script>
