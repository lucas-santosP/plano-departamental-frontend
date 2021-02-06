<template>
  <BaseModal
    ref="baseModalImportPedidos"
    title="Importar pedidos"
    :hasOverlay="true"
    :hasFooter="true"
  >
    <template #modal-body>
      <div class="row mb-2 mx-0">
        <div class="form-group col m-0 p-0">
          <label for="inputPedidos">Arquivo .csv do SIGA:</label>
          <input
            id="inputPedidos"
            type="file"
            ref="input1periodo"
            class="w-100 form-control-file mt-1"
            accept=".csv"
          />
        </div>
      </div>
    </template>
    <template #modal-footer>
      <div class="mr-auto">
        <BaseButton class="paddingX-20" text="Cancelar" color="gray" @click="close" />
      </div>
      <BaseButton
        text="Confirmar"
        color="blue"
        class="px-3"
        @click="handleImportPedidosOferecidos"
      />
    </template>
  </BaseModal>
</template>

<script>
export default {
  name: "ModalNovoPlano",
  props: {
    planoForm: { type: Object, required: true },
  },
  data() {
    return {};
  },

  methods: {
    open() {
      this.$refs.baseModalImportPedidos.open();
    },
    close() {
      this.$refs.baseModalImportPedidos.close();
    },
    async handleImportPedidosOferecidos() {},
  },
};
</script>

<style></style>
