<template>
  <div class="sidebar-menu">
    <h3
      v-if="menuTitle !== ''"
      class="title pr-3 pl-2 mt-3 mb-1 text-muted d-flex justify-content-between align-items-center"
    >
      {{ menuTitle }}
    </h3>
    <ul class="nav flex-column mb-2" v-if="menuPages.length">
      <li v-for="page in menuPages" :key="page.path" @click="closeSidebar">
        <router-link :to="{ path: page.path }" class="nav-link">
          <font-awesome-icon :icon="['fas', page.icon]" />
          <span>
            {{ page.title }}
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SidebarMenu",
  props: {
    menuPages: { type: Array, default: () => [] },
    menuTitle: { type: String, default: "" },
  },

  methods: {
    ...mapActions(["closeSidebar"]),
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme.scss";

.sidebar-menu {
  > .title {
    font-weight: bold;
    font-size: 0.75rem;
    text-transform: uppercase;
  }

  ul.nav > li {
    color: $clr-text-darkgray;
    transition: all 100ms ease;
  }

  ul.nav > li > .nav-link {
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 5px 0 5px;
    font-size: 12px;
    font-weight: 500;
    color: currentColor;
    transition: all 100ms ease;
    &:focus {
      box-shadow: none !important;
      outline: #007bff40 solid 2px !important;
      border-left: $clr-lightblue 10px solid;
      outline-offset: -2px;
    }
    &:hover {
      background-color: $clr-lightblue;
      color: #fff;
    }

    > svg {
      color: inherit;
      font-size: 12px;
      width: 18px;
      margin-right: 3px;
      text-align: start;
    }

    &.active {
      border-left: $clr-lightblue 10px solid;
      background-color: $clr-blue;
      color: #fff;
    }
  }
}
</style>
