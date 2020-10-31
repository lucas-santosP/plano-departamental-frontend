<template>
  <div class="nav-container">
    <ul class="nav nav-tabs card-header-tabs m-0" ref="navTab">
      <button
        v-if="withScroll"
        v-show="buttonsVisibility.left"
        class="btn-slide btn-slide-left"
        @click="scrollTo('left')"
      >
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </button>

      <li
        v-for="(tab, index) in allTabs"
        :key="index + tab"
        class="nav-item"
        @click="$emit('change-tab', tab)"
      >
        <a
          class="nav-link border border-right-0"
          :class="['clickable', { active: currentTab === tab }]"
        >
          {{ tab }}
        </a>
      </li>

      <button
        v-if="withScroll"
        v-show="buttonsVisibility.right"
        class="btn-slide btn-slide-right"
        @click="scrollTo('right')"
      >
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </button>
    </ul>
  </div>
</template>

<script>
export default {
  name: "navTab",
  props: {
    currentTab: { type: String, required: true },
    allTabs: { type: Array, required: true },
    withScroll: { type: Boolean, default: false },
  },
  data() {
    return {
      currentScrollPosition: 0,
      buttonsVisibility: {
        left: false,
        right: true,
      },
    };
  },

  mounted() {
    this.$refs.navTab.handleScroll = () => {
      this.currentScrollPosition = this.$refs.navTab.scrollLeft;
    };
    this.$refs.navTab.addEventListener("scroll", this.$refs.navTab.handleScroll);
  },
  beforeDestroy() {
    this.$refs.navTab.removeEventListener("scroll", this.$refs.navTab.handleScroll);
  },

  methods: {
    scrollTo(direction) {
      const scrollValue = this.$refs.navTab.offsetWidth / 2;

      if (direction === "right") this.$refs.navTab.scrollBy(scrollValue, 0);
      else this.$refs.navTab.scrollBy(-scrollValue, 0);
    },
  },

  watch: {
    currentScrollPosition(currentScrollPosition) {
      const navWidth = this.$refs.navTab.offsetWidth;
      const navMaxScroll = this.$refs.navTab.scrollWidth;

      if (navWidth + currentScrollPosition >= navMaxScroll && navWidth != 0) {
        this.buttonsVisibility.right = false;
      } else {
        this.buttonsVisibility.right = true;
      }

      if (currentScrollPosition <= 0) {
        this.buttonsVisibility.left = false;
      } else {
        this.buttonsVisibility.left = true;
      }
    },
  },
};
</script>

<style scoped>
.nav-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.nav-tabs {
  font-size: 11px !important;
  height: 30px;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-color: transparent transparent;
}
.nav-tabs::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background: transparent;
}

.btn-slide {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 30px;

  border-radius: 5px;
  border: 2px solid #909090;
  color: #313131;
  background-color: var(--light-gray);
  font-size: 11px;
  cursor: pointer;
  box-shadow: none !important;
  transition: 200ms all ease;
  box-shadow: none !important;
}

.btn-slide:hover {
  background-color: #f8f8f8;
  color: #000;
  box-shadow: 0px 0px 20px 5px #50505071 !important;
}

.btn-slide-right {
  right: 0;
}
.btn-slide-left {
  left: 0;
}

.nav-item {
  scroll-snap-align: start;
  -webkit-overflow-scrolling: touch;
}
.nav-tabs .nav-link {
  color: var(--light-blue) !important;
  cursor: pointer;
  user-select: none;
}
.nav-tabs li:last-of-type .nav-link {
  border-right: 1px solid #dee2e6 !important;
}
.nav-tabs .nav-link:hover {
  text-decoration: underline;
}
.nav-tabs .nav-link.active {
  background-color: #e9ecef !important;
  color: #495057 !important;
  cursor: default !important;
  text-decoration: none !important;
  transition: background-color 100ms;
}
</style>
