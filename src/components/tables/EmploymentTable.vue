<template>
  <div>
    <div class="buttons" v-if="!readonly">
      <b-button
        label="Add Employment"
        type="is-primary"
        size="is-small"
        icon-left="plus"
        @click="openModal('Create', {})"
      ></b-button>
    </div>
    <b-table :data="employment" :selected.sync="selected" focusable>
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
      <b-table-column label="Actions" width="20%" v-slot="props">
        <div class="b-tooltips">
          <b-tooltip label="View Employment" type="is-info">
            <b-button
              :tabindex="tabindex(props.row)"
              aria-label="View Employment"
              type="is-info"
              size="is-small"
              icon-left="eye"
              @click="openModal('Read', props.row)"
            ></b-button>
          </b-tooltip>
          <b-tooltip label="Edit Employment" type="is-warning">
            <b-button
              :tabindex="tabindex(props.row)"
              aria-label="Edit Employment"
              type="is-warning"
              size="is-small"
              icon-left="pencil"
              @click="openModal('Update', props.row)"
              v-if="!readonly"
            ></b-button>
          </b-tooltip>
          <b-tooltip label="Delete Employment" type="is-danger">
            <b-button
              :tabindex="tabindex(props.row)"
              aria-label="Delete Employment"
              type="is-danger"
              size="is-small"
              icon-left="delete"
              @click="openModal('Delete', props.row)"
              v-if="!readonly"
            ></b-button>
          </b-tooltip>
        </div>
      </b-table-column>
      <template #empty>
        <p tabindex="0" class="has-text-centered">
          No employment records listed.
        </p>
      </template>
    </b-table>
    <EmploymentModalForm ref="modal" @submit="submitModal($event)" />
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
      lastOp: null,
      selected: {}
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
    },
    tabindex(education) {
      return education.id === this.selected.id ? "0" : "-1";
    }
  }
};
</script>
