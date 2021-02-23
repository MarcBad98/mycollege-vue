<template>
  <div>
    <EmploymentModalForm
      :isActive="isModalActive"
      :isCreate="isModalCreate"
      :isRead="isModalRead"
      :isUpdate="isModalUpdate"
      :isDelete="isModalDelete"
      :employment="modalForm"
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
    <template v-if="employment.length !== 0">
      <b-table :data="employment" :selected.sync="selected" focusable>
        <b-table-column field="title" label="Title" v-slot="props">
          {{ props.row.title }}
        </b-table-column>
        <b-table-column field="employer" label="Employer" v-slot="props">
          {{ props.row.employer }}
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
import EmploymentModalForm from "@/components/parts/EmploymentModalForm.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "EmploymentTable.vue",
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
    submitModal(employment) {
      if (employment.dateStarted)
        employment.dateStarted = this.moment(employment.dateStarted).format(
          "YYYY-MM-DD"
        );
      if (employment.dateEnded)
        employment.dateEnded = this.moment(employment.dateEnded).format(
          "YYYY-MM-DD"
        );
      if (this.isModalCreate) {
        this.employment.push(employment);
      } else if (this.isModalUpdate) {
        const idx = this.employment.findIndex(emp => emp.id === employment.id);
        this.employment.splice(idx, 1, employment);
      } else if (this.isModalDelete) {
        const idx = this.employment.findIndex(emp => emp.id === employment.id);
        this.employment.splice(idx, 1);
      }
    }
  }
};
</script>
