<template>
  <nav class="navbar-wrapper shadow">
    <div @click="closeSidebar" class="navbar-brand">
      <router-link :to="{ path: '/home' }" class="brand-title">
        <Logo />
      </router-link>
    </div>

    <button @click.stop="toggleSidebar" type="button" class="btn-navbar">
      <font-awesome-icon :icon="['fas', sidebarVisibility ? 'times' : 'bars']" />
    </button>

    <ul class="navbar-nav">
      <li class="nav-item nav-item-input-plano">
        <label class="m-0 pr-2" for="planoAtual">Plano atual</label>
        <select
          id="planoAtual"
          class="input-plano"
          v-model.number="planoIdForm"
          @change="changeCurrentPlano(planoIdForm)"
        >
          <option v-for="plano in PlanosVisiveis" :value="plano.id" :key="plano.id">
            {{ plano.ano }} - {{ plano.nome }}
          </option>
        </select>
      </li>
      <li class="nav-item" @click="modalCallbacks.openUser">
        <font-awesome-icon :icon="['fas', 'user']" />
        <span>Usuário</span>
      </li>
      <li class="nav-item" @click="modalCallbacks.openDownload">
        <font-awesome-icon :icon="['fas', 'download']" />
        <span>Download</span>
      </li>
      <li class="nav-item" @click="doLogout">
        <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        <span>Logout</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Logo } from "@/components/ui";

export default {
  name: "Navbar",
  components: { Logo },
  props: {
    modalCallbacks: { type: Object, required: true },
  },
  data() {
    return {
      planoIdForm: null,
    };
  },

  methods: {
    ...mapActions(["closeSidebar", "toggleSidebar", "changeCurrentPlano", "doLogout"]),
  },

  computed: {
    ...mapGetters(["sidebarVisibility", "Planos", "currentPlano"]),

    PlanosVisiveis() {
      return this.Planos.filter((plano) => plano.visible === true);
    },
  },

  watch: {
    currentPlano: {
      handler(currentPlano) {
        if (currentPlano) {
          this.planoIdForm = currentPlano.id;
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins";
@import "@/assets/styles/theme";

.navbar-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: fixed;
  z-index: 945;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--navbar-height);
  background-color: $clr-base-darkgray;
  font-size: 12px;

  > .navbar-brand {
    @include flex-center;
    @include base-transition(color);
    @include no-focus;
    width: 190px;
    height: 30px;
    margin: 0;
    padding: 0;
    color: $clr-text-gray;
    background-color: $clr-base-dark;
    cursor: pointer;
    &:hover {
      color: #fff;
    }

    > .brand-title {
      pointer-events: none;
      font-size: 16px;
      text-align: start;
      text-decoration: none;
      color: currentColor;
    }
  }

  > .btn-navbar {
    @include base-transition(color);
    @include no-focus;
    width: 40px;
    height: 30px;
    padding: 0;
    margin: 0;
    border: none;
    outline: none;
    color: $clr-text-gray;
    background-color: $clr-base-dark;
    font-size: 20px;
    border-left: #1f1f1f 2px solid;
    border-right: #1f1f1f 2px solid;
    &:hover {
      color: #fff;
    }
  }

  > ul.navbar-nav {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    height: 30px;
    margin: 0;
    padding: 0 5px;

    > li.nav-item {
      @include flex-center;
      @include base-transition(color);
      flex-direction: row;
      height: 100%;
      padding: 0 8px;
      margin: 0 3px;
      color: $clr-text-gray;
      filter: brightness(85%);
      cursor: pointer;
      &:hover {
        color: #fff;
      }

      span,
      label {
        min-width: max-content;
        line-height: 12px;
        position: relative;
        top: 1px;
      }
      svg {
        margin: 0 3px;
      }
    }

    > li.nav-item-input-plano {
      cursor: default;
      padding-right: 0;

      .input-plano {
        width: 160px;
        height: 20px;
        border-radius: 3px;
        padding: 0 2px;
        color: currentColor;
        border-color: $clr-text-gray;
        background-color: transparent;
        &:hover {
          color: #fff;
          border-color: #fff;
        }
      }
    }
  }
}

@media screen and (max-width: 731px) {
  .navbar-wrapper > ul.navbar-nav > li.nav-item {
    padding: 0 10px;
    > span {
      display: none;
    }
  }
}
@media screen and (max-width: 605px) {
  .navbar-wrapper {
    > .navbar-brand {
      width: 100%;

      .brand-title {
        text-align: center;
      }
    }

    > .btn-navbar {
      position: fixed;
      top: 0;
      left: 0;
    }

    > ul.navbar-nav {
      width: 100% !important;
      justify-content: flex-start;
      margin: 0;
      padding: 0;

      > li.nav-item:nth-of-type(1) {
        padding: 0 5px;
      }
      > li.nav-item:nth-of-type(2) {
        margin-left: auto;
      }
    }
  }
}
</style>
