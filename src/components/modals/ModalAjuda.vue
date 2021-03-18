<template>
  <BaseModal ref="baseModalAjuda" title="Ajuda" type="ajuda">
    <template #modal-body>
      <ul class="list-ajuda list-group">
        <li v-if="pageDescription" class="list-group-item">
          <b>Descrição da página:</b>
          {{ pageDescription }}
        </li>
        <li class="list-group-item">
          <b>Ordenar tabela:</b>
          Clique no cabeçalho da coluna desejada na tabela, caso haja um ícone de seta
          <font-awesome-icon :icon="['fas', 'arrow-down']" class="icon-darkgray" />
          , para alterar a ordenação do conteúdo. Note que podem existir colunas com o icone
          <font-awesome-icon :icon="['fas', 'thumbtack']" class="icon-darkgray" />
          que significa que esta ordenação terá pripridade em relação as outras.
        </li>

        <slot></slot>
      </ul>
    </template>
  </BaseModal>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ModalAjuda",

  methods: {
    toggle() {
      this.$refs.baseModalAjuda.toggle();
    },
    close() {
      this.$refs.baseModalAjuda.close();
    },
  },

  computed: {
    ...mapGetters(["AllPages"]),

    pageDescription() {
      const page = this.AllPages.find((page) => page.path === this.$route.path);
      return page ? page.description : "";
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/theme.scss";

.modal-custom .list-ajuda {
  .list-group-item b:first-of-type {
    color: $clr-lightblue;
  }
  svg {
    font-size: 12px !important;
    margin: 0 1px !important;
    color: #585858;
  }
}
</style>
