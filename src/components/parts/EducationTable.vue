<template>
  <div>
    <EducationModalForm
      :isActive="isModalActive"
      :isCreate="isModalCreate"
      :isRead="isModalRead"
      :isUpdate="isModalUpdate"
      :isDelete="isModalDelete"
      :education="modalForm"
      @cancel="closeModal()"
      @submit="submitModal($event)"
    />
    <div class="buttons" v-if="!readonly">
      <b-button
        label="Add"
        type="is-primary"
        size="is-small"
        icon-left="plus"
        @click="openModal({ isCreate: true, form: {} })"
      />
    </div>
    <template v-if="education.length !== 0">
      <b-table :data="education" :selected.sync="selected" focusable>
        <b-table-column field="degree" label="Degree" v-slot="props">
          {{ props.row.degree }}
        </b-table-column>
        <b-table-column field="school" label="School" v-slot="props">
          {{ props.row.school }}
        </b-table-column>
        <b-table-column field="location" label="Location" v-slot="props">
          {{ props.row.location }}
        </b-table-column>
        <b-table-column v-slot="props">
          <div class="buttons is-right">
            <b-button
              label="View"
              type="is-info"
              size="is-small"
              icon-left="eye"
              @click="openModal({ isRead: true, form: props.row })"
            />
            <b-button
              label="Edit"
              type="is-warning"
              size="is-small"
              icon-left="pencil"
              @click="openModal({ isUpdate: true, form: props.row })"
              v-if="!readonly"
            />
            <b-button
              label="Delete"
              type="is-danger"
              size="is-small"
              icon-left="delete"
              @click="openModal({ isDelete: true, form: props.row })"
              v-if="!readonly"
            />
          </div>
        </b-table-column>
      </b-table>
    </template>
  </div>
</template>

<script>
import EducationModalForm from "@/components/parts/EducationModalForm.vue";
import { v4 as uuidv4 } from "uuid";

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
      isModalActive: false,
      isModalCreate: false,
      isModalRead: false,
      isModalUpdate: false,
      isModalDelete: false,
      modalForm: {},
      selected: {}
    };
  },
  methods: {
    openModal(options) {
      this.isModalActive = true;
      this.isModalCreate = options.isCreate === true;
      this.isModalRead = options.isRead === true;
      this.isModalUpdate = options.isUpdate === true;
      this.isModalDelete = options.isDelete === true;
      options.form.id = uuidv4();
      this.modalForm = JSON.parse(JSON.stringify(options.form));
      this.modalForm.dateStarted = this.moment(
        this.modalForm.dateStarted
      ).toDate();
      this.modalForm.dateEnded = this.moment(this.modalForm.dateEnded).toDate();
    },
    closeModal() {
      this.isModalActive = false;
      this.modalForm = {};
    },
    submitModal(education) {
      if (education.dateStarted)
        education.dateStarted = this.moment(education.dateStarted).format(
          "YYYY-MM-DD"
        );
      if (education.dateEnded)
        education.dateEnded = this.moment(education.dateEnded).format(
          "YYYY-MM-DD"
        );
      if (this.isModalCreate) {
        this.education.push(education);
      } else if (this.isModalUpdate) {
        const idx = this.education.findIndex(edu => edu.id === education.id);
        this.education.splice(idx, 1, education);
      } else if (this.isModalDelete) {
        const idx = this.education.findIndex(edu => edu.id === education.id);
        this.education.splice(idx, 1);
      }
    }
  }
};
</script>
