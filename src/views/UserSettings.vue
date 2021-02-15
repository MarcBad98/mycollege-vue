<template>
  <div>
    <h1>Settings</h1>
    <hr />
    <b-field>
      <b-checkbox v-model="settings.subscriptionEmail">
        Opt-in to Email Notifications?
      </b-checkbox>
    </b-field>
    <b-field>
      <b-checkbox v-model="settings.subscriptionSms">
        Opt-in to SMS Notifications?
      </b-checkbox>
    </b-field>
    <b-field>
      <b-checkbox v-model="settings.targetedAdvertising">
        Opt-in to Targeted Advertisement?
      </b-checkbox>
    </b-field>
    <b-field label="Language">
      <b-select v-model="settings.language">
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
      </b-select>
    </b-field>
    <b-button type="is-primary" v-on:click="save()">Save</b-button>
  </div>
</template>

<script>
import { UpdateUser } from "@/graphql/User.gql";
import { EventBus } from "@/EventBus";

export default {
  name: "UserSettings",
  mounted() {
    EventBus.$on("retrieved-user-data", user => {
      this.settings = {
        subscriptionEmail: user.settings.subscriptionEmail,
        subscriptionSms: user.settings.subscriptionSms,
        targetedAdvertising: user.settings.targetedAdvertising,
        language: user.settings.language
      };
    });
  },
  destroyed() {
    EventBus.$off("retrieved-user-data");
  },
  data() {
    return {
      settings: {}
    };
  },
  methods: {
    save() {
      this.$apollo
        .mutate({
          mutation: UpdateUser,
          variables: {
            keycloakUserId: this.$keycloak.subject,
            settings: this.settings
          }
        })
        .then(response => {
          this.$store.state.user = response.data.updateUser.user;
          this.$buefy.snackbar.open("Your settings was successfully saved!");
          EventBus.$emit("retrieved-user-data", this.$store.state.user);
        });
    }
  }
};
</script>
