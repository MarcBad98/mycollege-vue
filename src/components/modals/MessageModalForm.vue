<template>
  <GenericCardModal ref="generic" topic="Message" @submit="submit()">
    <b-field label="Title" label-for="messagemodalform-title">
      <b-input id="messagemodalform-title" v-model="message.title"></b-input>
    </b-field>
    <b-field label="Message" label-for="messagemodalform-message">
      <b-input
        id="messagemodalform-message"
        v-model="message.message"
        type="textarea"
      ></b-input>
    </b-field>
  </GenericCardModal>
</template>

<script>
import GenericCardModal from "@/components/generic/GenericCardModal.vue";
import { CreateMessage } from "@/graphql/Message.gql";
export default {
  name: "MessageModalForm",
  components: {
    GenericCardModal
  },
  data() {
    return {
      message: {}
    };
  },
  methods: {
    open(options) {
      this.$refs.generic.open(options);
      this.message.sender = this.$keycloak.subject;
      this.message.recipient = options.keycloakUserId;
      this.message.category = "message";
    },
    submit() {
      this.$apollo
        .mutate({
          mutation: CreateMessage,
          variables: {
            inputs: this.message
          }
        })
        .then(response => {
          console.log(response);
          // TODO: Separate sent and received messages.
          // const message = response.data.createMessage.message;
          // this.$store.commit("createMessage", message);
          this.$buefy.snackbar.open("Message successfully sent!");
        });
      this.message = {};
    }
  }
};
</script>
