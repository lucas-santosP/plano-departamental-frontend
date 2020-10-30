<template>
  <div class="nav-container">
    <ul class="nav nav-tabs card-header-tabs m-0" ref="nav">
      <li
        v-for="tab in allTabs"
        :key="'navTab' + tab"
        @click="$emit('change-tab', tab)"
        class="nav-item"
      >
        <a
          class="nav-link border border-right-0"
          :class="[
            'clickable',
            {
              active: currentTab === tab,
            },
          ]"
        >
          {{ normalizeText(tab) }}
        </a>
      </li>
      <button class="btn-slide" @click="slideRight">
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
  },
  data() {
    return {
      trackWidth: null,
    };
  },
  mounted() {
    this.trackWidth = this.$refs.nav.scrollWidth;
  },
  methods: {
    normalizeText(tabText) {
      if (tabText === "Laboratorios") return "Laborátorios";
      return tabText;
    },
    slideRight() {
      this.$refs.nav.scrollBy(this.trackWidth / 4, 0);
    },
  },
};
</script>

<style scoped>
.nav-container {
  height: 30px;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  position: relative;
}
.nav-tabs {
  font-size: 11px !important;
  height: 30px;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-color: transparent transparent;
}

.nav-tabs::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background: transparent;
}

.nav-item {
  scroll-snap-align: start;
  -webkit-overflow-scrolling: touch;
}
.btn-slide {
  top: 50%;
  right: 0;
  width: 25px;
  height: 25px;
  border-radius: 15px;
  border: 1px black solid;
  background-color: #fff;
  transform: translateY(-50%);
  cursor: pointer;
  position: absolute;
}
.nav-tabs .nav-link {
  color: #0079fa !important;
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
