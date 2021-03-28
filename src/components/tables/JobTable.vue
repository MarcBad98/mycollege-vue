<template>
  <div>
    <div class="buttons">
      <b-button
        label="Add"
        type="is-primary"
        size="is-small"
        icon-left="plus"
        @click="openModal('Create', {})"
      />
    </div>
    <b-table :data="jobs">
      <b-table-column label="Title" width="20%" v-slot="props">
        {{ props.row.title }}
      </b-table-column>
      <b-table-column label="Employer" width="20%" v-slot="props">
        {{ props.row.employer }}
      </b-table-column>
      <b-table-column label="Location" width="20%" v-slot="props">
        {{ props.row.location }}
      </b-table-column>
      <b-table-column label="Salary" width="15%" v-slot="props">
        {{ props.row.salary }}
      </b-table-column>
      <b-table-column label="Actions" width="25%" v-slot="props">
        <div class="buttons">
          <b-button
            label="View"
            type="is-info"
            size="is-small"
            icon-left="eye"
            @click="openModal('Read', props.row)"
          />
          <b-button
            label="Update"
            type="is-warning"
            size="is-small"
            icon-left="pencil"
            @click="openModal('Update', props.row)"
            v-if="isPoster(props.row)"
          />
          <b-button
            label="Delete"
            type="is-danger"
            size="is-small"
            icon-left="delete"
            @click="openModal('Delete', props.row)"
            v-if="isPoster(props.row)"
          />
          <b-button
            label="Star"
            type="is-info"
            size="is-small"
            icon-left=""
            v-if="!isPoster(props.row)"
          />
          <b-button
            label="Apply"
            type="is-info"
            size="is-small"
            icon-left=""
            v-if="!isPoster(props.row)"
          />
        </div>
      </b-table-column>
    </b-table>
    <JobModalForm ref="modal" />
  </div>
</template>

<script>
import JobModalForm from "@/components/modals/JobModalForm.vue";

export default {
  name: "JobTable",
  components: {
    JobModalForm
  },
  props: {
    jobs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    openModal(op, form) {
      this.lastOp = op;
      this.$refs.modal.open({
        isCreate: op === "Create",
        isRead: op === "Read",
        isUpdate: op === "Update",
        isDelete: op === "Delete",
        form
      });
    },
    isPoster(form) {
      return form.poster.keycloakUserId === this.$keycloak.subject;
    }
  }
};
</script>
