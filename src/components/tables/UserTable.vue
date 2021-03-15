<template>
  <b-table :data="users">
    <b-table-column label="Full Name" v-slot="props">
      {{ props.row.fullName }}
    </b-table-column>
    <b-table-column label="University" v-slot="props">
      {{ props.row.profile.currentUniversity }}
    </b-table-column>
    <b-table-column label="Major" v-slot="props">
      {{ props.row.profile.major }}
    </b-table-column>
    <b-table-column label="Actions" v-slot="props">
      <div class="buttons is-right">
        <b-button
          tag="router-link"
          :to="{
            name: 'OtherUserProfileView',
            params: { fullName: props.row.fullName, user: props.row }
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
