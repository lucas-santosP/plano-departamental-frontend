<template>
  <BaseModal2
    ref="baseModalDelete"
    :title="'Confirmar exclusão'"
    :position="'center'"
    :hasBackground="true"
    :hasFooter="true"
    :styles="{ width: '400px', maxHeight: '600px', fontSize: '14px' }"
  >
    <template #modal-body>
      <ul class="list-group list-delete">
        <slot></slot>
      </ul>
    </template>

    <template #modal-footer>
      <BaseButton :type="'text'" :color="'gray'" @click="$emit('btn-cancelar')">
        Cancelar seleção
      </BaseButton>
      <BaseButton
        class="paddingX-20"
        :type="'text'"
        :color="'red'"
        @click="$emit('btn-deletar')"
      >
        Deletar
      </BaseButton>
    </template>
  </BaseModal2>
</template>

<script>
import BaseModal2 from "./BaseModal2";
import BaseButton from "./BaseButton";

export default {
  name: "ModalDelete",
  components: { BaseModal2, BaseButton },
  props: {
    isDeleting: { type: Boolean, default: false },
  },
  methods: {
    open() {
      this.$refs.baseModalDelete.open();
    },
    close() {
      this.$refs.baseModalDelete.close();
    },
  },
};
</script>
