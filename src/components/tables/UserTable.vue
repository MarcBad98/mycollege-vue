<template>
  <b-table :data="users" :selected.sync="selected" focusable>
    <b-table-column label="Full Name" width="25%" v-slot="props">
      {{ props.row.profile.fullName }}
      <b-taglist>
        <b-tag
          type="is-info"
          v-if="props.row.keycloakUserId === $keycloak.subject"
        >
          You
        </b-tag>
        <b-tag
          type="is-success"
          v-if="props.row.metadata.userIsConfirmedFriend"
        >
          Confirmed Friend
        </b-tag>
        <b-tag type="is-warning" v-if="props.row.metadata.userIsPendingFriend">
          Pending Friend
        </b-tag>
      </b-taglist>
    </b-table-column>
    <b-table-column label="University" width="25%" v-slot="props">
      {{ props.row.profile.university }}
    </b-table-column>
    <b-table-column label="Major" width="25%" v-slot="props">
      {{ props.row.profile.major }}
    </b-table-column>
    <b-table-column label="Actions" width="25%" v-slot="props">
      <div class="b-tooltips">
        <b-tooltip label="View Profile" type="is-info">
          <b-button
            :tabindex="tabindex(props.row)"
            tag="router-link"
            :to="{
              name: 'OtherUserProfileView',
              params: { id: props.row.keycloakUserId }
            }"
            aria-label="View Profile"
            type="is-info"
            size="is-small"
            icon-left="eye"
          ></b-button>
        </b-tooltip>
        <b-tooltip
          label="Send Friends Request"
          type="is-info"
          v-if="props.row.keycloakUserId !== $keycloak.subject"
        >
          <b-button
            :tabindex="tabindex(props.row)"
            aria-label="Send Friends Request"
            type="is-info"
            size="is-small"
            icon-left="email-alert"
            @click="sendFriendsRequest(props.row)"
            :disabled="
              props.row.metadata.userIsConfirmedFriend ||
                props.row.metadata.userIsPendingFriend ||
                props.row.metadata.userSentFriendsRequest
            "
          ></b-button>
        </b-tooltip>
        <b-tooltip
          label="Revoke Friendship"
          type="is-danger"
          v-if="props.row.metadata.userIsConfirmedFriend"
        >
          <b-button
            :tabindex="tabindex(props.row)"
            aria-label="Revoke Friendship"
            type="is-danger"
            size="is-small"
            icon-left="cancel"
            @click="revokeFriendship(props.row)"
          ></b-button>
        </b-tooltip>
      </div>
    </b-table-column>
    <template #empty>
      <p tabindex="0" class="has-text-centered">
        No users listed.
      </p>
    </template>
  </b-table>
</template>

<style lang="scss" scoped>
.b-tooltips {
  .b-tooltip:not(:last-child) {
    margin-right: 0.5em;
  }
  .b-tooltip {
    margin-bottom: 0.5em;
  }
}
</style>

<script>
import { RevokeFriendship } from "@/graphql/User.gql";
import { CreateMessage } from "@/graphql/Message.gql";
export default {
  name: "UserTable",
  props: {
    users: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      selected: {}
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    sendFriendsRequest(form) {
      this.$apollo
        .mutate({
          mutation: CreateMessage,
          variables: {
            inputs: {
              sender: this.$keycloak.subject,
              recipient: form.keycloakUserId,
              category: "friends-request",
              title: `Friend Request: ${this.user.profile.fullName}`,
              message: `${this.user.profile.fullName} wants to be friends.`
            }
          }
        })
        .then(response => {
          const message = response.data.createMessage.message;
          // this.$store.commit("createMessage", message);
          this.$buefy.snackbar.open("Friend request successfully sent!");
          const user = this.users.find(
            user => user.keycloakUserId === message.recipient
          );
          user.metadata.userIsPendingFriend = true;
        });
    },
    revokeFriendship(form) {
      this.$apollo
        .mutate({
          mutation: RevokeFriendship,
          variables: {
            friend1: this.$keycloak.subject,
            friend2: form.keycloakUserId
          }
        })
        .then(response => {
          const user = response.data.friend1.user;
          this.$store.commit("setUser", user);
          this.$buefy.snackbar.open("Friendship successfully revoked!");
          const idx = this.users.findIndex(
            user => user.keycloakUserId === form.keycloakUserId
          );
          this.users.splice(idx, 1);
        });
    },
    tabindex(user) {
      return user.keycloakUserId === this.selected.keycloakUserId ? "0" : "-1";
    }
  }
};
</script>
