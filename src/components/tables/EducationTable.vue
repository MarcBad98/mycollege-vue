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
    <template v-if="education.length !== 0">
      <b-table :data="education">
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
    <EducationModalForm ref="modal" @submit="submitModal($event)" />
  </div>
</template>

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
    }
  }
};
</script>
