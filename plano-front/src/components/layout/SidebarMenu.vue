<template>
  <section class="sidebar-menu">
    <div
      v-if="sectionTitle"
      class="section-title"
      :class="{ 'is-open': isOpen }"
      @click="isOpen = !isOpen"
      v-prevent-click-selection
    >
      <font-awesome-icon :icon="['fas', icon]" />
      <span>{{ sectionTitle }}</span>
      <ButtonArrow class="ml-auto" :state="isOpen" />
    </div>

    <ul class="nav flex-column" v-if="pages.length && isOpen">
      <li
        v-for="page in pages"
        :key="page.path"
        :class="['nav-link', { active: $route.path === page.path }]"
        @click="changeRoute(page.path)"
      >
        {{ page.title }}
      </li>
    </ul>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import { ButtonArrow } from "@/components/ui";
import { preventClickSelection } from "@/common/mixins";

export default {
  name: "SidebarSection",
  components: { ButtonArrow },
  mixins: [preventClickSelection],
  props: {
    pages: { type: Array, default: () => [] },
    sectionTitle: { type: String, default: "" },
    icon: { type: String, default: "" },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  beforeMount() {
    const hasPageActive = this.pages.find((route) => route.path === this.$route.path);
    if (hasPageActive || !this.sectionTitle) this.isOpen = true;
  },

  methods: {
    ...mapActions(["closeSidebar"]),

    changeRoute(path) {
      if (path !== this.$route.path) {
        this.$router.push({ path });
      }

      setTimeout(() => {
        this.closeSidebar();
      }, 600);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/theme";
@import "@/assets/styles/mixins";

.sidebar-menu {
  font-size: 12px;
  color: $clr-text-gray;

  > .section-title {
    @include base-transition(all);
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    padding: 0 5px;
    margin: 0;
    font-family: Roboto, "Segoe UI", -apple-system, BlinkMacSystemFont, Oxygen, Ubuntu, Cantarell,
      "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #d3d3d3;
    text-transform: uppercase;
    cursor: pointer;
    &:hover {
      background-color: #3b4046;
      color: #fff;
    }
    &.is-open {
      background-color: #3b4046;
    }

    > svg {
      color: currentColor;
      width: 18px;
      height: 12px;
      margin-right: 4px;
      text-align: start;
    }
  }

  ul.nav {
    padding-bottom: 10px;
    background-color: #1c1f22;
  }

  ul.nav > li.nav-link {
    position: relative;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 0 5px;
    padding-left: 27px; // espaço a esquerda igual do section-title
    color: $clr-text-gray;
    letter-spacing: 0.5px;
    transition: all 100ms ease;
    transition: background-color 300ms ease;
    &:hover {
      cursor: pointer;
      color: #fff;
      &::after {
        background-color: #fff;
      }
    }
    // backgorund line
    &::before {
      content: "";
      position: absolute;
      z-index: 5;
      top: 0;
      left: 13px;
      width: 2px;
      height: 100%;
      background-color: #4b4b4b;
    }
    // circle
    &::after {
      content: "";
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 14px;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: #6e6e6e;
      transition: all 300ms ease;
    }
  }

  ul.nav > li.nav-link.active {
    color: #fff;
    background-color: $clr-blue;
    &::before {
      filter: brightness(150%);
    }
    &::after {
      background-color: #fff;
    }
  }
}

.sidebar-menu:first-of-type {
  > ul.nav {
    padding: 5px 0;
  }
}
</style>
