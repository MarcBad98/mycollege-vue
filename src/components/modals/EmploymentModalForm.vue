<template>
  <GenericCardModal ref="generic" topic="Employment" @submit="submit()">
    <b-field id="employmentmodalform-title" label="Title">
      <b-input
        aria-labelledby="employmentmodalform-title"
        v-model="employment.title"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field id="employmentmodalform-employer" label="Employer">
      <b-input
        aria-labelledby="employmentmodalform-employer"
        v-model="employment.employer"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <b-field id="employmentmodalform-location" label="Location">
      <b-input
        aria-labelledby="employmentmodalform-location"
        v-model="employment.location"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
    <div class="columns">
      <div class="column">
        <b-field id="employmentmodalform-startdate" label="Start Date">
          <b-datepicker
            aria-labelledby="employmentmodalform-startdate"
            v-model="employment.dateStarted"
            icon="calendar-today"
            :disabled="disabled"
            v-if="!readonly"
          >
          </b-datepicker>
          <b-input
            aria-labelledby="employmentmodalform-startdate"
            :value="moment(employment.dateStarted).format('YYYY-MM-DD')"
            readonly
            v-else
          ></b-input>
        </b-field>
      </div>
      <div class="column">
        <b-field id="employmentmodalform-enddate" label="End Date">
          <b-datepicker
            aria-labelledby="employmentmodalform-enddate"
            v-model="employment.dateEnded"
            icon="calendar-today"
            :disabled="disabled"
            v-if="!readonly"
          >
          </b-datepicker>
          <b-input
            aria-labelledby="employmentmodalform-enddate"
            :value="moment(employment.dateEnded).format('YYYY-MM-DD')"
            readonly
            v-else
          ></b-input>
        </b-field>
      </div>
    </div>
    <b-field id="employmentmodalform-description" label="Description">
      <b-input
        aria-labelledby="employmentmodalform-description"
        v-model="employment.description"
        type="textarea"
        :disabled="disabled"
        :readonly="readonly"
      ></b-input>
    </b-field>
  </GenericCardModal>
</template>

<script>
import GenericCardModal from "@/components/generic/GenericCardModal.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "EmploymentModalForm",
  components: {
    GenericCardModal
  },
  data() {
    return {
      readonly: false,
      disabled: false,
      employment: {}
    };
  },
  methods: {
    open(options) {
      this.$refs.generic.open(options);
      this.readonly = options.isRead === true;
      this.disabled = options.isDelete === true;
      options.form.id = uuidv4();
      const obj = JSON.parse(JSON.stringify(options.form));
      obj.dateStarted = this.moment(obj.dateStarted).toDate();
      obj.dateEnded = this.moment(obj.dateEnded).toDate();
      this.employment = obj;
    },
    submit() {
      this.$emit("submit", this.employment);
      this.employment = {};
    }
  }
};
</script>
