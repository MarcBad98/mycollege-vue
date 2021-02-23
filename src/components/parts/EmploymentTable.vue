<template>
  <div>
    <EmploymentModalForm
      :isActive="isModalActive"
      :isCreate="isModalCreate"
      :isUpdate="isModalUpdate"
      :isDelete="isModalDelete"
      :employment="modalForm"
      @cancel="closeModal()"
      @submit="submitModal($event)"
    />
    <b-button
      label="Add"
      type="is-primary"
      size="is-small"
      icon-left="plus"
      @click="openModal({ isCreate: true, form: {} })"
    />
    <template v-if="employment.length !== 0">
      <b-table :data="employment" :selected.sync="selected" focusable>
        <b-table-column field="title" label="Title" v-slot="props">
          {{ props.row.title }}
        </b-table-column>
        <b-table-column field="employer" label="Employer" v-slot="props">
          {{ props.row.employer }}
        </b-table-column>
        <b-table-column field="dateStarted" label="Date Started" v-slot="props">
          {{ props.row.dateStarted }}
        </b-table-column>
        <b-table-column field="dateEnded" label="Date Ended" v-slot="props">
          {{ props.row.dateEnded }}
        </b-table-column>
        <b-table-column label="Actions" v-slot="props">
          <div class="buttons">
            <b-button
              type="is-warning"
              size="is-small"
              icon-left="pencil"
              @click="openModal({ isUpdate: true, form: props.row })"
            />
            <b-button
              type="is-danger"
              size="is-small"
              icon-left="delete"
              @click="openModal({ isDelete: true, form: props.row })"
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
    }
  },
  data() {
    return {
      isModalActive: false,
      isModalCreate: false,
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
