<template>
  <form>
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
    <b-field>
      <b-checkbox v-model="isPlusUser">
        Subscribe to MyCollege+ ($30/month)?
      </b-checkbox>
    </b-field>
    <b-field label="Language" label-for="usersettingsform-language">
      <b-select id="usersettingsform-language" v-model="settings.language">
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
  </form>
</template>

<script>
import { UpdateUserSettings } from "@/graphql/User.gql";
export default {
  name: "UserSettingsForm",
  props: {
    user: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      isPlusUser: false,
      settings: {}
    };
  },
  mounted() {
    this.setComponentData(this.user);
  },
  watch: {
    user(user) {
      this.setComponentData(user);
    }
  },
  methods: {
    setComponentData(user) {
      this.isPlusUser = user.isPlusUser;
      this.settings = JSON.parse(JSON.stringify(user.settings));
      delete this.settings.__typename;
    },
    save() {
      this.$apollo
        .mutate({
          mutation: UpdateUserSettings,
          variables: {
            keycloakUserId: this.$keycloak.subject,
            isPlusUser: this.isPlusUser,
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
