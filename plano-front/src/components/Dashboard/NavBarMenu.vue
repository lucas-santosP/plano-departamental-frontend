<template>
  <ul class="nav flex-column mb-2">
    <li
      v-for="page in pageLinks"
      :key="page.routerName"
      @click="EmitcloseSideBar()"
      class="nav-item"
    >
      <router-link :to="{ name: page.routerName }" class="nav-link">
        <i class="icon-nav-link fas" :class="page.icon"></i>
        {{ page.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import { EventBus } from "@/event-bus.js";

export default {
  name: "NavBarMenu",
  props: {
    pageLinks: { type: Array, default: () => [] },
    menuTitle: {
      type: String,
      default: "Nenhum titulo passado pro componente!",
    },
  },
  methods: {
    EmitcloseSideBar() {
      EventBus.$emit("close-sidebar");
    },
  },
};
</script>

<style scoped>
.nav-link {
  font-weight: 500;
  color: #333;
  font-size: 12px;
  height: 30px;
  padding: 5px;
  padding-left: 8px;
}
.icon-nav-link {
  color: inherit;
  width: 18px !important;
  height: 18px !important;
  text-align: start;
}

.sidebar-heading {
  font-weight: bold;
  font-size: 0.75rem;
  text-transform: uppercase;
}
.nav li {
  border-top: rgb(248, 249, 250) solid 0.1px;
  border-bottom: rgb(248, 249, 250) solid 0.1px;
}
.nav li:hover {
  background-color: #0079fa;
  color: white;
}
.sidebar .nav-link:hover {
  color: white;
}
.sidebar .nav-link.active:hover {
  background-color: #0055af;
}

/* pagina ativa */
.sidebar .nav-link.active {
  background-color: #0055af;
  color: white;
  border-left: #0079fa 10px solid;
}

.sidebar-sticky {
  position: relative;
  top: 0;
  padding-top: 0.5rem;
  height: -webkit-calc(100vh - 30px);
  height: -moz-calc(100vh - 30px);
  height: calc(100vh - 30px);
  padding-bottom: 1rem;
  overflow-x: hidden;
  overflow-y: auto !important; /* Scrollable contents if viewport is shorter than content. */
}
@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

/* SCROLL BAR CUSTOM */
.sidebar-sticky ::-webkit-scrollbar-track {
  background-color: #f4f4f4 !important;
}
.sidebar-sticky::-webkit-scrollbar {
  width: 6px !important;
  background: #f4f4f4 !important;
}
.sidebar-sticky::-webkit-scrollbar-thumb {
  background: #666 !important;
}
/* ========================== */
[role="main"]::-webkit-scrollbar-track {
  background-color: #f4f4f4 !important;
}
[role="main"]::-webkit-scrollbar {
  width: 6px !important;
  background: #f4f4f4 !important;
}
[role="main"]::-webkit-scrollbar-thumb {
  background: #666 !important;
}
</style>
