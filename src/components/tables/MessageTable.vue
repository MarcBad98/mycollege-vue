<template>
  <div>
    <b-table
      :data="messages"
      :selected.sync="selected"
      focusable
      detailed
      detail-key="id"
      :show-detail-icon="false"
      ref="table"
    >
      <b-table-column label="Title" width="50%" v-slot="props">
        {{ props.row.title }}
      </b-table-column>
      <b-table-column label="Category" width="25%" v-slot="props">
        <b-tag
          type="is-warning"
          v-if="props.row.category === 'friends-request'"
        >
          Friends Request
        </b-tag>
        <b-tag type="is-info" v-if="props.row.category === 'message'">
          Message
        </b-tag>
      </b-table-column>
      <b-table-column label="Actions" width="25%" v-slot="props">
        <div class="b-tooltips">
          <b-tooltip label="View Message" type="is-info">
            <b-button
              :tabindex="tabindex(props.row)"
              aria-label="View Message"
              type="is-info"
              size="is-small"
              icon-left="eye"
              @click="props.toggleDetails(props.row)"
            ></b-button>
          </b-tooltip>
          <b-tooltip label="View Sender's Profile" type="is-info">
            <b-button
              :tabindex="tabindex(props.row)"
              tag="router-link"
              :to="{
                name: 'OtherUserProfileView',
                params: { id: props.row.sender }
              }"
              aria-label="View Sender's Profile"
              type="is-info"
              size="is-small"
              icon-left="eye"
            ></b-button>
          </b-tooltip>
          <b-tooltip
            label="Accept Friends Request"
            type="is-success"
            v-if="props.row.category === 'friends-request'"
          >
            <b-button
              :tabindex="tabindex(props.row)"
              aria-label="Accept Friends Request"
              type="is-success"
              size="is-small"
              icon-left="check"
              @click="acceptFriendRequest(props.row)"
            ></b-button>
          </b-tooltip>
          <b-tooltip
            label="Reject Friends Request"
            type="is-danger"
            v-if="props.row.category === 'friends-request'"
          >
            <b-button
              :tabindex="tabindex(props.row)"
              aria-label="Reject Friends Request"
              type="is-danger"
              size="is-small"
              icon-left="cancel"
              @click="rejectFriendRequest(props.row)"
            ></b-button>
          </b-tooltip>
        </div>
      </b-table-column>
      <template #detail="props">
        <p :tabindex="tabindex(props.row)">
          {{ props.row.message }}
        </p>
      </template>
      <template #empty>
        <p tabindex="0" class="has-text-centered">
          No messages listed.
        </p>
      </template>
    </b-table>
  </div>
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
import { AcceptFriendRequest, RejectFriendRequest } from "@/graphql/User.gql";
export default {
  name: "MessageTable",
  props: {
    messages: {
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
  methods: {
    acceptFriendRequest(form) {
      this.$apollo
        .mutate({
          mutation: AcceptFriendRequest,
          variables: {
            friend1: this.$keycloak.subject,
            friend2: form.sender,
            messageId: form.id
          }
        })
        .then(response => {
          const user = response.data.friend1.user;
          this.$store.commit("setUser", user);
          this.$buefy.snackbar.open("Accepted the friend request!");
          const message = response.data.deleteMessage.message;
          this.$store.commit("deleteMessage", message);
        });
    },
    rejectFriendRequest(form) {
      this.$apollo
        .mutate({
          mutation: RejectFriendRequest,
          variables: {
            messageId: form.id
          }
        })
        .then(response => {
          this.$buefy.snackbar.open("Rejected the friend request!");
          const message = response.data.deleteMessage.message;
          this.$store.commit("deleteMessage", message);
        });
    },
    tabindex(message) {
      return message.id === this.selected.id ? "0" : "-1";
    }
  }
};
</script>
