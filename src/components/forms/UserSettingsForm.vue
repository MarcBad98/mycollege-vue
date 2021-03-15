<template>
  <div>
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
    <b-field id="usersettingsform-language" label="Language">
      <b-select
        aria-labelledby="usersettingsform-language"
        v-model="settings.language"
      >
        <option value="English">English</option>
        <option value="French">French</option>
        <option value="Spanish">Spanish</option>
        <option value="Russian">Russian</option>
        <option value="Chinese">Chinese</option>
        <option value="Korean">Korean</option>
        <option value="Japanese">Japanese</option>
        <option value="Arabic">Arabic</option>
      </b-select>
    </b-field>
    <b-button label="Save" type="is-primary" @click="save()" />
  </div>
</template>

<script>
import { UpdateUserSettings } from "@/graphql/User.gql";

export default {
  name: "UserSettingsForm",
  data() {
    return {
      settings: {}
    };
  },
  watch: {
    "$store.state.user.settings"(settings) {
      this.settings = JSON.parse(JSON.stringify(settings));
      delete this.settings.__typename;
    }
  },
  methods: {
    save() {
      this.$apollo
        .mutate({
          mutation: UpdateUserSettings,
          variables: {
            keycloakUserId: this.$keycloak.subject,
            settings: this.settings
          }
        })
        .then(response => {
          const user = response.data.updateUser.user;
          this.$store.commit("setUser", user);
          this.$buefy.snackbar.open("Your settings were successfully saved!");
        });
    }
  }
};
</script>
