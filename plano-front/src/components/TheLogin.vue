<template>
  <div id="loginForm" class="text-center">
    <form class="form-signin" v-on:submit.prevent="doLogin">
      <h1 class="h3 mb-3 font-weight-normal">Login</h1>
      <b-alert :show="Boolean(error)" variant="danger" dismissible>{{error}}</b-alert>
      <label for="login" class="sr-only">Usuário</label>
      <input
        v-focus
        type="text"
        id="login"
        class="form-control"
        placeholder="Usuário"
        v-model.trim="form.login"
      />
      <label for="senha" class="sr-only">Senha</label>
      <input
        type="password"
        id="senha"
        class="form-control"
        placeholder="Senha"
        v-model.trim="form.senha"
      />
      <button class="btn btn-lg btn-primary btn-block mt-3" type="submit">Entrar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "TheLogin",

  data() {
    return {
      form: {
        login: undefined,
        senha: undefined
      },
      error: undefined
    };
  },

  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },

  methods: {
    doLogin() {
      this.$store
        .dispatch("authenticate", this.form)
        .then(() => {
          if (this.$store.state.route.query.redirect) {
            this.$router.replace(this.$store.state.route.query.redirect);
          } else {
            this.$router.replace("/dashboard");
          }
        })
        .catch(error => {
          if (error.response) {
            this.error = error.response.data.message;
          } else {
            this.error = "Erro na requisição! Tente novamente.";
          }
        });
    }
  },

  beforeCreate() {
    this.$store
      .dispatch("fetchUsuario")
      .then(() => {
        this.$router.replace("/dashboard");
      })
      .catch(() => {});
  }
};
</script>

<style scoped>
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

#loginForm {
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -ms-flex-align: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  height: 100%;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .form-control {
  position: relative;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="text"] {
  margin-bottom: -1px;
  -webkit-border-bottom-right-radius: 0;
  -moz-border-radius-bottomright: 0;
  border-bottom-right-radius: 0;
  -webkit-border-bottom-left-radius: 0;
  -moz-border-radius-bottomleft: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  -webkit-border-top-left-radius: 0;
  -moz-border-radius-topleft: 0;
  border-top-left-radius: 0;
  -webkit-border-top-right-radius: 0;
  -moz-border-radius-topright: 0;
  border-top-right-radius: 0;
}
</style>
