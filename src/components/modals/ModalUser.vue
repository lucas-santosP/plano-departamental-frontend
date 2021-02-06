<template>
  <BaseModal ref="baseModalUser" :title="'Usuário'" :type="'fromNavbar'">
    <template #modal-body>
      <div class="user-container w-100">
        <div class="user-header border px-3 py-2 w-100">
          <div class="d-flex w-100 align-items-center">
            <img class="user-img" src="@/assets/images/user.png" alt="Usuário" />
            <div class="d-flex flex-column w-100">
              <p class="mx-2">
                <b>Nome:</b>
                {{ currentUser.nome }}
              </p>
              <p class="mx-2">
                <b>Login:</b>
                {{ currentUser.login }}
              </p>
              <p class="mx-2">
                <b>Tipo:</b>
                {{ currentUser.type }}
              </p>
            </div>
          </div>
          <BaseButton text="Logout" color="red" @click="doLogout" />
        </div>

        <div v-if="currentUser.isAdmin" class="w-100 border rounded-bottom py-2 px-3">
          <div class="form-row">
            <label required for="nome">Nome</label>
            <input class="form-control" type="text" id="nome" v-model="userForm.nome" />
          </div>
          <div class="form-row">
            <label required for="login">Login</label>
            <input class="form-control" type="text" id="login" v-model="userForm.login" />
          </div>
          <div class="form-row">
            <label required for="senhaAtual">Senha atual</label>
            <InputPassword :isInvalid="false" :inputId="'senhaAtual'" v-model="senhaAtual" />
          </div>
          <!-- toggle edit senha -->
          <ButtonSlideSection :isOpen="isEditingSenha" @handel-click="toggleEditSenha" />

          <transition-group name="slideY" mode="out-in">
            <template v-if="isEditingSenha">
              <div :key="'newPass'" class="form-row">
                <label required for="novaSenha">Nova senha</label>
                <InputPassword :inputId="'novaSenha'" v-model="userForm.senha" />
              </div>

              <div :key="'repeatPass'" class="form-row">
                <label required for="confirmaSenha">Confirmar nova senha</label>
                <InputPassword
                  :isInvalid="confirmaSenha != userForm.senha"
                  :inputId="'confirmaSenha'"
                  v-model="confirmaSenha"
                />
              </div>
            </template>
          </transition-group>
          <div :key="'btns'" class="mt-3 mb-1 d-flex justify-content-end">
            <BaseButton class="paddingX-20" text="Cancelar" color="gray" @click="close" />
            <BaseButton class="paddingX-20" text="Salvar" color="blue" @click="editUser" />
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { clone } from "lodash-es";
import userService from "@/services/usuario";
import { InputPassword, ButtonSlideSection } from "@/components/ui";

const emptyUser = {
  nome: "",
  login: "",
  senha: "",
  admin: 0,
};

export default {
  name: "ModalUser",
  components: { InputPassword, ButtonSlideSection },
  data() {
    return {
      userForm: clone(emptyUser),
      currentTab: "edit",
      confirmaSenha: "",
      senhaAtual: "",
      isEditingSenha: false,
    };
  },

  beforeMount() {
    this.clearEditUserForm();
  },

  methods: {
    ...mapActions(["doLogout"]),

    open() {
      this.$refs.baseModalUser.open();
    },
    close() {
      this.$refs.baseModalUser.close();
    },
    toggleEditSenha() {
      this.isEditingSenha = !this.isEditingSenha;
      this.userForm.senha = "";
      this.confirmaSenha = "";
    },
    clearEditUserForm() {
      this.userForm = clone(emptyUser);
      this.isEditingSenha = false;
      this.userForm.nome = this.currentUser.nome;
      this.userForm.login = this.currentUser.login;
      this.userForm.admin = this.currentUser.admin;
      this.confirmaSenha = "";
      this.senhaAtual = "";
    },
    validateEditUser(user) {
      return (!this.isEditingSenha || this.confirmaSenha === user.senha) && this.validateUser(user);
    },
    validateUser(user) {
      for (const value of Object.values(user)) {
        if (value === "" || value === null) return false;
      }
      return true;
    },

    async editUser() {
      const user = clone(this.userForm);
      user.senhaAtual = this.senhaAtual;
      user.admin = this.currentUser.admin;

      if (!this.isEditingSenha) user.senha = this.senhaAtual;

      if (!this.validateEditUser(user)) {
        this.pushNotification({
          type: "error",
          text: "Campos obrigátorios incompletos ou inválidos.",
        });
        return;
      }

      try {
        await userService.update(this.currentUser.id, user);
        this.pushNotification({
          type: "success",
          text: `Usuário ${this.currentUser.nome} atualizado.`,
        });
        this.clearEditUserForm();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao editar usuário",
          text: "Senha atual incorreta.",
        });
      }
    },
  },

  computed: {
    ...mapGetters(["currentUser"]),
  },
};
</script>

<style scoped>
.user-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 14px;
}
.user-container .user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-header .user-img {
  width: 50px;
}

.user-container .form-row {
  position: relative;
  margin: 0 !important;
  margin-bottom: 10px !important;
}
.form-row label {
  font-weight: bold;
}
.form-row label > i {
  color: #f30000;
}
::v-deep .form-row input.form-control {
  height: 30px !important;
  font-size: 14px !important;
  padding: 2px 8px !important;
  text-align: start !important;
}
.form-row input[type="checkbox"] {
  height: 14px !important;
  font-size: 10px !important;
  padding: 2px 8px !important;
  text-align: start !important;
}

.user-container p {
  margin: 0;
  word-break: break-all;
}
</style>