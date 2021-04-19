<template>
  <div>
    <h1 tabindex="0" class="title is-4">Messages List</h1>
    <hr aria-hidden="true" />
    <MessageTable :messages="messages" />
  </div>
</template>

<script>
import MessageTable from "@/components/tables/MessageTable.vue";
export default {
  name: "MessagesList",
  components: {
    MessageTable
  },
  computed: {
    messages() {
      return this.$store.state.messages;
    }
  }
};
</script>
