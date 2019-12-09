<template>
  <div class="DashboardPerfis row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0">
      <div class="form-inline col-12 pl-0 mb-2 pr-1">
        <h1 class="col-12 titulo">Lista Perfis</h1>
      </div>
    </div>
    <div class="w-100 mb-2 border-bottom"></div>

    <!-- Grid Esquerdo -->
    <div class="divTable">
      <!-- Inicio da Tabela -->
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
            <tr
              v-for="perfil in Perfis"
              :key="perfil.id"
              v-on:click.prevent="showPerfil(perfil), clickada(perfil.nome)"
              :class="{'bg-custom' : perfilClickado === perfil.nome}"
            >
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
                class="col-sm-3 col-3 col-form-label"
                style="text-align: end;"
              >Nome</label>
              <div class="col-lg-8 col-md-9 col-sm-9 col-9">
                <input type="text" class="form-control" id="nome" v-model="perfilForm.nome" />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="abreviacao"
                class="col-sm-3 col-3 col-form-label"
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
                class="col-sm-3 col-3 col-form-label"
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
                <template v-if="isEdit">
                  <div style="display: flex; margin-right: 0; margin-left: auto">
                    <button
                      type="button"
                      title="Editar"
                      class="editbtn"
                      v-on:click.prevent="editPerfil"
                      :key="1"
                    ><i class="fas fa-edit"></i></button>
                    <button
                      type="button"
                      title="Deletar"
                      class="delbtn"
                      v-on:click.prevent="deletePerfil"
                      :key="3"
                    ><i class="far fa-trash-alt"></i></button>
                    <button
                      type="button"
                      title="Cancelar"
                      class="cancelbtn"
                      v-on:click.prevent="cleanPerfil"
                      :key="2"
                    ><i class="fas fa-times"></i></button>
                  </div>
                </template>
                <template v-else>
                  <div style="display: flex; margin-right: 0; margin-left: auto">
                    <button
                      type="button"
                      title="Adicionar"
                      class="addbtn"
                      v-on:click.prevent="addPerfil"
                      :key="1"
                    ><i class="fas fa-plus"></i></button>
                    <button
                      type="button"
                      title="Cancelar"
                      class="cancelbtn"
                      v-on:click.prevent="cleanPerfil"
                      :key="2"
                    ><i class="fas fa-times"></i></button>
                  </div>
                </template>
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
      error: undefined,
      perfilClickado: ""
    };
  },

  methods: {
    clickada(f_perfil) {
      this.perfilClickado = f_perfil;
    },
    clearClick() {
      this.perfilClickado = "";
    },
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
      this.clearClick();
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
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

.DashboardPerfis {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.custom-control {
  font-size: 11px;
}
input[type="text"] {
  height: 25px !important;
  font-size: 11px;
}
.card {
  min-width: 300px;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  height: auto !important;
  padding: 0;
}
.card-body {
  font-size: 12px;
  padding-top: 15px;
}
.card-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.col-form-label{
  padding-left: 0;
  padding-right: 0;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
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
.bg-custom {
  background-color: #c8c8c8;
}
.bg-custom:hover {
  background-color: #c8c8c8;
}
/* Botoes */
button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  margin-right: 15px;
}
i.fas,
i.far {
  font-size: 30px;
}
.addbtn {
  background-color: white;
  color: #a0e7a0;
}
.addbtn:hover {
  background-color: white;
  cursor: pointer;
  color: #77dd77;
}
.addbtn:focus {
  color: #77dd77;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #2fbf53;
}
.cancelbtn {
  color: #cfcfc4;
}
.cancelbtn:hover {
  cursor: pointer;
  color: #b8b4a8;
}
.cancelbtn:focus {
  color: #b8b8a8;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ada89a;
}
.editbtn {
  background-color: white;
  color: #ffbe61;
}
.editbtn:hover {
  cursor: pointer;
  color: #ffb448;
}
.editbtn:focus {
  color: #ffb448;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ffa548;
}
.delbtn {
  background-color: white;
  color: #ff817b;
}
.delbtn:hover {
  cursor: pointer;
  color: #ff5f48;
}
.delbtn:focus {
  color: #ff5f48;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ff4e34;
}
</style>