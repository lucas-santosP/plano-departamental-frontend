<template>
  <transition name="sidebar-transition">
    <nav v-show="sidebarVisibility" class="sidebar bg-light" @click.stop>
      <SidebarMenu :menuPages="RoutesHome" />
      <SidebarMenu
        v-if="currentUser.isAdmin && currentPlano.isEditable"
        menuTitle="Plano"
        :menuPages="RoutesPlano"
      />
      <SidebarMenu menuTitle="Relatórios" :menuPages="RoutesRelatorios" />
      <SidebarMenu
        v-if="currentUser.isSuperAdmin"
        menuTitle="Gerenciar"
        :menuPages="RoutesGerenciar"
      />
      <SidebarMenu menuTitle="Histórico" :menuPages="RoutesHistorico" />
      <SidebarMenu menuTitle="Validações" :menuPages="RoutesValidacoes" />
    </nav>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarMenu from "./SidebarMenu.vue";

export default {
  name: "Sidebar",
  components: { SidebarMenu },

  computed: {
    ...mapGetters([
      "sidebarVisibility",
      "RoutesHome",
      "RoutesPlano",
      "RoutesRelatorios",
      "RoutesGerenciar",
      "RoutesHistorico",
      "RoutesValidacoes",
      "currentUser",
      "currentPlano",
    ]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins";
@import "@/assets/styles/theme";

.sidebar {
  @include base-transition(all);
  @include custom-scrollbar(7px);
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  z-index: 940;
  width: 230px;
  height: calc(100vh - var(--navbar-height));
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0.5rem 0;
  font-size: 14px;
  box-shadow: 0px 0px 75px 0px rgba(0, 0, 0, 0.75);

  > .sidebar-menu:last-of-type {
    margin-bottom: 2.5rem;
  }
}

/* transition */
.sidebar-transition-enter-active {
  animation: slideInLeft 0.25s;
  animation-fill-mode: both;
}
.sidebar-transition-leave-active {
  animation: slideOutLeft 0.25s;
  animation-fill-mode: both;
}
</style>
