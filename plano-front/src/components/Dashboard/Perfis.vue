<template>
  <div class="DashboardPerfis row" v-if="Admin">
    <!-- Grid Esquerdo -->
    <div class="col-12" style="padding-left: 0; height: 45px;">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pl-0 pt-3 pb-2 mb-3  " style="height: 45px;" >
        <h1 class="col-12 titulo">Lista Perfis</h1>
      </div>
    </div>
    <div class="w-100 mb-2 border-bottom"></div>
      <!-- Inicio da Tabela -->
      <div class="divTable">
        <table class="table table-hover table-bordered table-sm">
          <thead class="thead-light">
            <tr>
              <div style="display: block; overflow: hidden; width: 485px;" class="sticky">
                <th scope="col">
                  <p style="width: 350px" class="p-header">Nome</p>
                </th>
                <th scope="col">
                  <p style="width: 90px" class="p-header">Abreviação</p>
                </th>
                <th scope="col">
                  <p style="width: 40px;" class="p-header">Cor</p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <template v-if="Perfis.length > 0">
              <tr v-for="perfil in Perfis" :key="perfil.id" v-on:click.prevent="showPerfil(perfil)">
                <div style="width: 485px">
                  <td>
                    <p style="width: 350px">{{perfil.nome}}</p>
                  </td>
                  <td>
                    <p style="width: 90px">{{perfil.abreviacao}}</p>
                  </td>
                  <td>
                    <div style="padding-left: 2px; width: 40px">
                      <input
                        type="color"
                        style="width: 30px; padding: 0;vertical-align:middle; margin-top:2px"
                        v-model="perfil.cor"
                      />
                    </div>
                  </td>
                </div>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="2" class="text-center">
                  <i class="fas fa-exclamation-triangle"></i> Nenhum perfil encontrado!
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!-- Fim da Tabela -->
    <!-- Fim do Grid Esquerdo -->
    <!-- Grid Direito -->
    <div class="cartao-inteiro col-lg-5 col-md-12 col-sm-12 col-12 mt-3 pl-0 ml-auto">
      <div class="col card cartao ml-auto" style="margin-right:20px; max-width: 350px;">
        <div class="card-header">
          <template v-if="isEdit">
            <h2 class="card-title">Editar Perfil</h2>
          </template>
          <template v-else>
            <h2 class="card-title">Adicionar Perfil</h2>
          </template>
        </div>
        <div class="card-body" style="padding:20px;">
          <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error"></b-alert>
          <form>
            <div class="form-group row">
              <label
                for="nome"
                class="col-sm-3 col-3 col-form-label texto-cartao"
                style="text-align: end;"
              >Nome</label>
              <div class="col-lg-8 col-md-9 col-sm-9 col-9">
                <input type="text" class="form-control" id="nome" v-model="perfilForm.nome" />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="abreviacao"
                class="col-sm-3 col-3 col-form-label texto-cartao"
                style="text-align: end;"
              >Abreviação</label>
              <div class="col-lg-8 col-md-9 col-sm-9 col-9">
                <input
                  type="text"
                  class="form-control"
                  id="abreviacao"
                  v-model="perfilForm.abreviacao"
                />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="cor"
                class="col-sm-3 col-3 col-form-label texto-cartao"
                style="text-align: end;"
              >Cor</label>
              <div class="col-lg-8 col-md-9 col-sm-9 col-9">
                <input
                  type="color"
                  class="form-control"
                  style="height:25px !important; padding:1px;"
                  id="cor"
                  v-model="perfilForm.cor"
                />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-10">
                <template v-if="isEdit">
                  <button
                    type="button"
                    class="btn btn-success m-2 botao-estilo"
                    v-on:click.prevent="editPerfil"
                    :key="1"
                  >Editar</button>
                  <button
                    type="button"
                    class="btn btn-danger m-2"
                    v-on:click.prevent="deletePerfil"
                    :key="3"
                  >Excluir</button>
                  <button
                    type="button"
                    class="btn btn-secondary m-2"
                    v-on:click.prevent="cleanPerfil"
                    :key="2"
                  >Cancelar</button>
                </template>
                <template v-else>
                  <button
                    type="button"
                    class="btn btn-success m-2"
                    v-on:click.prevent="addPerfil"
                    :key="1"
                  >Adicionar</button>
                  <button
                    type="button"
                    class="btn btn-secondary m-2"
                    v-on:click.prevent="cleanPerfil"
                    :key="2"
                  >Resetar</button>
                </template>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Fim do Grid Direito -->
  </div>
</template>

<script>
import _ from "lodash";
import perfilService from "../../common/services/perfil";

const emptyPerfil = {
  id: undefined,
  nome: undefined,
  abreviacao: undefined,
  cor: "#ff0000"
};

export default {
  name: "DashboardPerfis",

  data() {
    return {
      perfilForm: _.clone(emptyPerfil),
      error: undefined
    };
  },

  methods: {
    addPerfil() {
      perfilService
        .create(this.perfilForm)
        .then(response => {
          this.cleanPerfil();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${response.Perfil.nome} foi criado!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao criar Perfil</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    editPerfil() {
      perfilService
        .update(this.perfilForm.id, this.perfilForm)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${response.Perfil.nome} foi atualizado!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Perfil</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    deletePerfil() {
      perfilService
        .delete(this.perfilForm.id, this.perfilForm)
        .then(response => {
          this.cleanPerfil();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${response.Perfil.nome} foi excluído!`,
            type: "success"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Perfil</b>";
        });
    },

    cleanPerfil() {
      console.log(this.perfilForm.cor);
      this.perfilForm = _.clone(emptyPerfil);
      this.error = undefined;
    },

    showPerfil(perfil) {
      this.cleanPerfil();
      this.perfilForm = _.clone(perfil);
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    }
  },

  computed: {
    Perfis() {
      return this.$store.state.perfil.Perfis;
    },

    isEdit() {
      return this.perfilForm.id !== undefined;
    },

    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.DashboardPerfis {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.custom-control {
  font-size: 11px;
}
.texto-cartao {
  font-size: 12px;
  padding: 0;
}
input[type="text"] {
  height: 25px !important;
  font-size: 11px;
}
.cartao {
  width: 330px !important;
  height: auto !important;
  top: -15px !important;
  padding: 0 0 0 0px;
}
.cartao-inteiro {
  padding-right: 15px;
}
.card-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.btn {
  height: 25px;
  min-width: -webkit-max-content;
  min-width: -moz-max-content;
  min-width: max-content;
  font-size: 12px;
  padding: 0 5px 0 5px;
  max-width: 65px;
}
.botao-estilo {
  background-color: #faca4d !important;
  border-color: #faca4d !important;
  color: white;
}

.botao-estilo:hover {
  background-color: #f8ac51 !important;
  border-color: #f8ac51 !important;
}

.botao-estilo:focus {
  box-shadow: 0 0 0 0.2rem rgba(194, 146, 84, 0.5) !important;
}
.titulo{
    font-size: 25px;
    padding-left: 0px;
    width: 100%;
}
@media screen and (max-width: 992px) {
  .cartao {
    margin-top: 20px;
    margin-left: auto !important;
    margin-right: auto !important;
  }
}

/* Tabela Lucas */
.p-header {
  padding: 0px 0 0px 0;
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
}
.divTable {
  overflow: hidden;
  border: #808080 solid 2px;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
}
table {
  display: block;
  overflow-y: hidden;
  overflow-x: auto; 
  height: auto;
  font-size: 11px;
  background-color: #f5f5f5;
  margin: 0;
}
tbody {
  max-height: 100%;
  width: 100%;
}
table td {
  text-align: center;
  vertical-align: middle;
  padding: 0 !important;
}
table p {
  margin-bottom: 0;
  text-align: center;
}
tr thead {
  display: block;
}
thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}

table input {
  height: 18px !important;
  text-align: center !important;
  margin: 0;
}

table tbody tr div {
  height: 22px !important;
}
.sticky {
  display: block !important;
  overflow: hidden !important;
  height: 20px !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
}

</style>