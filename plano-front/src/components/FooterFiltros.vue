<template>
  <div id="FooterFiltros" class="w-100 m-0 px-1" style="display: flex;">
    <div class="w-100">
      <button class="btn btn-modal btn-azul" @click="$emit('select-all')">
        Selecionar Todos
      </button>
      <button class="btn btn-modal btn-cinza" @click="$emit('select-none')">
        Desmarcar Todos
      </button>
    </div>
    <button
      @click="$emit('btn-ok')"
      class="btn btn-modal btn-verde"
      style="padding-right: 15px !important; padding-left: 15px !important;"
    >
      OK
    </button>
  </div>
</template>

<script>
export default {
  name: "FooterFiltros",
};
</script>
