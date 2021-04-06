<template>
  <div>
    <div class="buttons" v-if="!readonly">
      <b-button
        label="Add Education"
        type="is-primary"
        size="is-small"
        icon-left="plus"
        @click="openModal('Create', {})"
      ></b-button>
    </div>
    <b-table :data="education" :selected.sync="selected" focusable>
      <b-table-column label="Degree" width="20%" v-slot="props">
        {{ props.row.degree }}
      </b-table-column>
      <b-table-column label="School" width="20%" v-slot="props">
        {{ props.row.school }}
      </b-table-column>
      <b-table-column label="Start Date" width="20%" v-slot="props">
        {{ props.row.dateStarted }}
      </b-table-column>
      <b-table-column label="End Date" width="20%" v-slot="props">
        {{ props.row.dateEnded }}
      </b-table-column>
      <b-table-column label="Actions" width="20%" v-slot="props">
        <div class="b-tooltips">
          <b-tooltip label="View Education" type="is-info">
            <b-button
              :tabindex="tabindex(props.row)"
              aria-label="View Education"
              type="is-info"
              size="is-small"
              icon-left="eye"
              @click="openModal('Read', props.row)"
            ></b-button>
          </b-tooltip>
          <b-tooltip label="Edit Education" type="is-warning">
            <b-button
              :tabindex="tabindex(props.row)"
              aria-label="Edit Education"
              type="is-warning"
              size="is-small"
              icon-left="pencil"
              @click="openModal('Update', props.row)"
              v-if="!readonly"
            ></b-button>
          </b-tooltip>
          <b-tooltip label="Delete Education" type="is-danger">
            <b-button
              :tabindex="tabindex(props.row)"
              aria-label="Delete Education"
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
          No education records listed.
        </p>
      </template>
    </b-table>
    <EducationModalForm ref="modal" @submit="submitModal($event)" />
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
import EducationModalForm from "@/components/modals/EducationModalForm.vue";
export default {
  name: "EducationTable",
  components: {
    EducationModalForm
  },
  props: {
    education: {
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
    submitModal(education) {
      const fmt = "YYYY-MM-DD";
      education.dateStarted = this.moment(education.dateStarted).format(fmt);
      education.dateEnded = this.moment(education.dateEnded).format(fmt);
      if (this.lastOp === "Create") {
        this.education.push(education);
      } else if (this.lastOp === "Update") {
        const idx = this.education.findIndex(edu => edu.id === education.id);
        this.education.splice(idx, 1, education);
      } else if (this.lastOp === "Delete") {
        const idx = this.education.findIndex(edu => edu.id === education.id);
        this.education.splice(idx, 1);
      }
    },
    tabindex(education) {
      return education.id === this.selected.id ? "0" : "-1";
    }
  }
};
</script>
