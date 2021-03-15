<template>
  <b-table :data="users">
    <b-table-column label="Full Name" width="25%" v-slot="props">
      {{ props.row.fullName }}
      <b-tag type="is-success" v-if="props.row.status === 'ACCEPTED'">
        Confirmed
      </b-tag>
      <b-tag type="is-warning" v-if="props.row.status === 'PENDING'">
        Pending
      </b-tag>
    </b-table-column>
    <b-table-column label="University" width="25%" v-slot="props">
      {{ props.row.profile.currentUniversity }}
    </b-table-column>
    <b-table-column label="Major" width="25%" v-slot="props">
      {{ props.row.profile.major }}
    </b-table-column>
    <b-table-column label="Actions" width="25%" v-slot="props">
      <div class="buttons">
        <b-button
          tag="router-link"
          :to="{
            name: 'OtherUserProfileView',
            params: { id: props.row.keycloakUserId }
          }"
          label="View"
          type="is-info"
          size="is-small"
          icon-left="eye"
        />
      </div>
    </b-table-column>
  </b-table>
</template>

<script>
export default {
  name: "UserTable",
  props: {
    users: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
