<template>
  <transition name="modal-fade">
    <div :class="modalClass" :style="modalStyle">
      <header class="modal-custom-header w-100">
        <h2 class="title">
          {{ modalOptions.title }}
        </h2>
        <button
          type="button"
          class="btn-custom btn-close"
          @click="closeModal()"
          aria-label="Close modal"
        >
          &times;
        </button>
      </header>

      <main class="modal-custom-body">
        <slot name="modal-body">Modal Body</slot>
      </main>

      <footer v-if="modalOptions.hasFooter" class="modal-custom-footer w-100">
        <slot name="footer">
          <div class="div">
            <button
              class="btn btn-custom btn-modal btn-azul"
              @click="emitSelectAll()"
            >
              Selecionar Todos
            </button>
            <button
              class="btn btn-custom btn-modal btn-cinza"
              @click="emitSelectNone()"
            >
              Desmarcar Todos
            </button>
          </div>
          <button
            @click="emitOk()"
            class="btn btn-modal btn-verde btn-ok-modal"
          >
            OK
          </button>
        </slot>
      </footer>
    </div>
  </transition>
</template>

<script>
import { EventBus } from "@/event-bus.js";

export default {
  name: "BaseModal",
  props: {
    modalOptions: {
      type: Object,
      required: true,
    },
    classes: {
      type: [String, Array],
      default: () => [],
    },
    styles: {
      type: [String, Array, Object],
    },
  },
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("keyup", this.onEscKeyUp);
    //Remove background events
    if (this.modalConfigs.hasBackground) {
      EventBus.$emit("toggle-bg-modal", true);
      EventBus.$on("close-modal", () => {
        this.closeModal();
      });
    }
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.onEscKeyUp);
    this.$emit("on-close");
    //Remove background events
    if (this.modalConfigs.hasBackground) {
      EventBus.$emit("toggle-bg-modal", false);
      EventBus.$off("close-modal");
    }
  },
  methods: {
    onEscKeyUp(event) {
      const { code } = event;
      const { type } = this.modalOptions;

      if (code === "Escape") {
        this.closeModal();
      } else if (type === "filtros" && code === "Backquote") {
        this.emitSelectAll();
      }
    },
    closeModal() {
      this.modalOptions.visibility = false;
    },
    emitSelectAll() {
      this.$emit("select-all");
    },
    emitSelectNone() {
      this.$emit("select-none");
    },
    emitOk() {
      this.$emit("btn-ok");
      // this.closeModal();
    },
  },
  computed: {
    modalClass() {
      return ["modal-custom", this.classes];
    },
    modalStyle() {
      const { position, type } = this.modalConfigs;
      let styles = "";

      if (position === "center") {
        styles +=
          "top: 50px;left:50%; transform: translateX(-50%); z-index: 1000;";
      } else if (position === "right") {
        styles += "top: 5vh; right: 10px;z-index: 900;";
      }

      if (type === "filtros") {
        styles += "max-width:500px; min-height:600px;";
      } else if (position === "editTurma") {
        styles += "max-width:500px;min-height: 800px;";
      } else {
        styles += "max-width:500px; height:auto;";
      }

      return styles;
    },
    modalConfigs() {
      return {
        visibility: false,
        title: "Nenhum titulo recebido!",
        dimensionTyp: "default",
        position: "center",
        hasBackground:
          this.modalOptions.position === "center" || !this.modalOptions.position
            ? true
            : false,
        ...this.modalOptions,
      };
    },
  },
};
</script>

<style scoped>
.modal-custom {
  position: absolute;

  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 5px;
}
.modal-custom-header,
.modal-custom-footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.modal-custom-header {
  border-bottom: 1px solid #eeeeee;
  color: #000000;
  min-height: 56px;
}
.modal-custom-body {
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.modal-custom-footer {
  justify-content: space-between;
  margin-top: auto;
  padding: 15px;
  border-top: 1px solid #eeeeee;
  align-items: center;
}

.title {
  width: 100%;
  padding-left: 15px;
  padding-right: 5px;
  margin: 0;
  font-size: 20px;
}
.btn-close {
  height: 100% !important;
  min-height: 55px;
  width: 70px;
  font-size: 22px;
  border: none;
  color: #2d2e2e;
  font-weight: bold;
  text-align: center;
  background: none;
  cursor: pointer;
}
.btn-close:hover {
  background-color: rgba(192, 192, 192, 0.335);
}

.btn {
  color: white;
}
.btn:hover {
  color: white;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
</style>
