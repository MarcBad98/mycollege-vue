<template>
  <div>
    <div class="buttons" v-if="!readonly">
      <b-button
        label="Add"
        type="is-primary"
        size="is-small"
        icon-left="plus"
        @click="openModal('Create', {})"
      />
    </div>
    <template v-if="employment.length !== 0">
      <b-table :data="employment">
        <b-table-column label="Title" width="20%" v-slot="props">
          {{ props.row.title }}
        </b-table-column>
        <b-table-column label="Employer" width="20%" v-slot="props">
          {{ props.row.employer }}
        </b-table-column>
        <b-table-column label="Start Date" width="20%" v-slot="props">
          {{ props.row.dateStarted }}
        </b-table-column>
        <b-table-column label="End Date" width="20%" v-slot="props">
          {{ props.row.dateEnded }}
        </b-table-column>
        <b-table-column width="20%" v-slot="props">
          <div class="buttons">
            <b-button
              label="View"
              type="is-info"
              size="is-small"
              icon-left="eye"
              @click="openModal('Read', props.row)"
            />
            <b-button
              label="Edit"
              type="is-warning"
              size="is-small"
              icon-left="pencil"
              @click="openModal('Update', props.row)"
              v-if="!readonly"
            />
            <b-button
              label="Delete"
              type="is-danger"
              size="is-small"
              icon-left="delete"
              @click="openModal('Delete', props.row)"
              v-if="!readonly"
            />
          </div>
        </b-table-column>
      </b-table>
    </template>
    <EmploymentModalForm ref="modal" @submit="submitModal($event)" />
  </div>
</template>

<script>
import EmploymentModalForm from "@/components/modals/EmploymentModalForm.vue";

export default {
  name: "EmploymentTable",
  components: {
    EmploymentModalForm
  },
  props: {
    employment: {
      type: Array,
      default() {
        return [];
      }
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lastOp: null
    };
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
    submitModal(employment) {
      const fmt = "YYYY-MM-DD";
      employment.dateStarted = this.moment(employment.dateStarted).format(fmt);
      employment.dateEnded = this.moment(employment.dateEnded).format(fmt);
      if (this.lastOp === "Create") {
        this.employment.push(employment);
      } else if (this.lastOp === "Update") {
        const idx = this.employment.findIndex(emp => emp.id === employment.id);
        this.employment.splice(idx, 1, employment);
      } else if (this.lastOp === "Delete") {
        const idx = this.employment.findIndex(emp => emp.id === employment.id);
        this.employment.splice(idx, 1);
      }
    }
  }
};
</script>
