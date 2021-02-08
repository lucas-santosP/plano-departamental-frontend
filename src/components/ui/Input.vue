<template>
  <b-form-group class="mb-1" label-size="sm" :label="label" :label-for="id">
    <b-form-input
      :id="id"
      :type="inputType"
      :value="value"
      @input="emitInput"
      :state="isValid"
      :placeholder="placeholder"
      :aria-describedby="feedbackId"
      size="sm"
      autocomplete="off"
      step="1"
      min="0"
    />

    <b-form-invalid-feedback v-if="isValid === false" :id="feedbackId">
      <template v-if="validation.$params.required && !validation.required">
        Campo obrigatório
      </template>
      <template v-if="validation.$params.maxLength && !validation.maxLength">
        Limite de caracteres excedido
      </template>
      <template v-if="validation.$params.integer && !validation.integer">
        Número deve ser inteiro
      </template>
    </b-form-invalid-feedback>
  </b-form-group>
</template>

<script>
import { uniqueId } from "lodash-es";

export default {
  name: "Input",
  props: {
    id: { type: String, default: () => uniqueId() },
    inputType: { type: String, default: "text" },
    value: { type: [String, Number], required: true },
    label: { type: String, default: "" },
    validation: { type: Object, default: null },
    placeholder: { type: String, default: "" },
  },

  methods: {
    emitInput(newValue) {
      this.$emit("input", newValue.toUpperCase());
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
