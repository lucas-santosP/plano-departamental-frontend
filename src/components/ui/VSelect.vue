<template>
  <b-form-group class="mb-1" label-size="sm" :label="label" :label-for="id">
    <b-form-select
      :id="id"
      :value="value"
      @input="emitInput"
      :state="isValid"
      :aria-describedby="feedbackId"
      size="sm"
    >
      <b-form-select-option value="" disabled>Selecione...</b-form-select-option>
      <slot></slot>
    </b-form-select>

    <b-form-invalid-feedback v-if="isValid === false" :id="feedbackId">
      <template v-if="validation.$params.required && !validation.required">
        Campo obrigatório
      </template>
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
import { uniqueId } from "lodash-es";

export default {
  name: "VSelect",
  props: {
    id: { type: String, default: () => uniqueId() },
    value: { type: [String, Number], required: true },
    label: { type: String, default: "" },
    validation: { type: Object, default: null },
  },

  methods: {
    emitInput(newValue) {
      this.$emit("input", newValue);
      if (this.validation) this.validation.$touch();
    },
  },

  computed: {
    isValid() {
      if (!this.validation) return null;

      const { $dirty, $error } = this.validation;
      if ($dirty && $error) return false;
      return null;
    },
    feedbackId() {
      return "feedback-" + this.id;
    },
  },
};
</script>
