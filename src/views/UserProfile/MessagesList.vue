<template>
  <div>
    <h1 tabindex="0" class="title is-4">Messages List</h1>
    <hr aria-hidden="true" />
    <MessageTable :messages="messages" />
  </div>
</template>

<script>
import MessageTable from "@/components/tables/MessageTable.vue";
import { DeleteMessage } from "@/graphql/Message.gql";
export default {
  name: "MessagesList",
  components: {
    MessageTable
  },
  mounted() {
    this.deleteMessageNotification();
    this.deleteFriendsRequestNotification();
  },
  computed: {
    messages() {
      return this.$store.state.messages.filter(
        message => message.category !== "notification"
      );
    }
  },
  methods: {
    deleteMessageNotification() {
      const notification = this.$store.state.messages.find(message => {
        const matchSender = message.sender === "SYSTEM";
        const matchTitle =
          message.title === "You have messages waiting for you!";
        return matchSender && matchTitle;
      });
      if (notification !== undefined) {
        this.$apollo
          .mutate({
            mutation: DeleteMessage,
            variables: {
              inputs: {
                id: notification.id
              }
            }
          })
          .then(response => {
            const message = response.data.deleteMessage.message;
            this.$store.commit("deleteMessage", message);
          });
      }
    },
    deleteFriendsRequestNotification() {
      const notification = this.$store.state.messages.find(message => {
        const matchSender = message.sender === "SYSTEM";
        const matchTitle =
          message.title === "You have friend requests waiting for you!";
        return matchSender && matchTitle;
      });
      if (notification !== undefined) {
        this.$apollo
          .mutate({
            mutation: DeleteMessage,
            variables: {
              inputs: {
                id: notification.id
              }
            }
          })
          .then(response => {
            const message = response.data.deleteMessage.message;
            this.$store.commit("deleteMessage", message);
          });
      }
    }
  }
};
</script>
