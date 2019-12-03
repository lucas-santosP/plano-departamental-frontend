<template>
  <div class="DashboardDocentes row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div class="col-12" style="padding-left: 0; height: 45px;">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pl-0 pt-3 pb-2 mb-3  " style="height: 45px;" >
        <h1 class="col-12 titulo">Lista Docentes</h1>
      </div>
    </div>
    <div class="w-100 mb-2 border-bottom"></div>
    <!-- Fim do Titulo -->

    <!-- Grid Esquerdo -->
    <div class="col p-0">
      <div class="divTable">
        <!-- Inicio da Tabela -->
        <table class="table table-hover table-bordered table-sm">
          <thead class="thead-light">
            <tr>
              <div style="width: 416px " class="sticky">
                <th scope="col">
                  <p class="p-header" style="width: 240px">Nome</p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width: 130px">Apelido</p>
                </th>
                <th scope="col">
                  <p class="p-header" style="width: 42px">Ativo</p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <template v-if="Docentes.length > 0">
              <tr
                v-for="docente in Docentes"
                :key="docente.id"
                v-on:click.prevent="showDocentes(docente, DocentePerfis)"
                :class="{'bg-custom':docenteClickado == docente.nome}"
                style="cursor: pointer"
              >
                <div style="width: 416px">
                  <td>
                    <p style="width: 240px">{{docente.nome}}</p>
                  </td>
                  <td>
                    <p style="width: 130px">{{docente.apelido}}</p>
                  </td>
                  <td>
                    <div style="width: 42px">
                      <input
                        class="form-check-input position-static noHover"
                        v-on:click.prevent="showDocentes(docente, DocentePerfis)"
                        type="checkbox"
                        v-model="docente.ativo"
                      />
                    </div>
                  </td>
                </div>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="2" class="text-center">
                  <i class="fas fa-exclamation-triangle"></i> Nenhum docente encontrado!
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <!-- Fim da Tabela -->
      </div>
    </div>
    <!-- Fim do Grid Esquerdo -->
    <!-- Grid Direito -->

    <div class="cartao-inteiro col-lg-5 col-md-5 col-sm-12 col-12 mt-3 pl-0 ml-auto">
      <div class="col card cartao ml-auto" style="margin-right:20px; max-width: 350px;">
        <div class="card-header">
          <template v-if="isEdit">
            <h1 class="card-title">Editar Docente</h1>
          </template>
          <template v-else>
            <h1 class="card-title">Adicionar Docente</h1>
          </template>
        </div>
        <div class="card-body" style="padding:20px; overflow-y:auto; overflow-x:hidden;">
          <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error"></b-alert>
          <form style="overflow:hidden auto; max-height: 70vh">
            <div class="form-group row">
              <label
                for="nome"
                class="col-sm-3 col-3 col-form-label"
                style="text-align: end;padding:0"
              >Nome</label>
              <div
                class="col-lg-8 col-md-9 col-sm-9 col-9"
                style="margin-top:auto;margin-bottom:auto;"
              >
                <input
                  type="text"
                  class="form-control col-lg-12 col-md-12 col-sm-12"
                  id="nome"
                  v-model="docenteForm.nome"
                />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="apelido"
                class="col-sm-3 col-3 col-form-label"
                style="text-align: end; padding:0"
              >Apelido</label>
              <div
                class="col-lg-8 col-md-9 col-sm-9 col-9"
                style="margin-top:auto;margin-bottom:auto;"
              >
                <input
                  type="text"
                  class="form-control col-lg-12 col-md-12 col-sm-12"
                  id="apelido"
                  v-model="docenteForm.apelido"
                />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="perfis"
                class="col-sm-3 col-3 col-form-label"
                style="text-align: end;padding:0"
              >Perfis</label>
              <template v-if="docenteForm.id!=undefined">
                <div class="col-sm-9" id="perfis">
                  <b-form-checkbox-group stacked v-model="perfisAssociados">
                    <b-form-checkbox
                      v-for="perfil in Perfis"
                      :key="perfil.id+'ID'+perfil.nome+'nome'"
                      :value="perfil.id"
                      v-on:change="managePerfil(perfil.id)"
                    >{{perfil.nome}}</b-form-checkbox>
                  </b-form-checkbox-group>
                </div>
              </template>
            </div>
            <div class="form-group row">
              <div class="col-sm-12" style="padding-left:45px;">
                <label for="ativo" class="col-form-label">
                  <div class="row">
                    <div class="col" style="padding-right: 0;">
                      <input type="checkbox" id="ativo" value="1" v-model="docenteForm.ativo" />
                    </div>
                    <div class="col" style="padding-left: 5px; padding-top: 3px">Ativo</div>
                  </div>
                </label>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-10">
                <template v-if="isEdit">
                  <button
                    type="button"
                    class="btn btn-success m-2 botao-estilo"
                    v-on:click.prevent="editDocente"
                    :key="1"
                  >Editar</button>
                  <button
                    type="button"
                    class="btn btn-danger m-2"
                    v-on:click.prevent="deleteDocente"
                    :key="3"
                  >Excluir</button>
                  <button
                    type="button"
                    class="btn btn-secondary m-2"
                    v-on:click.prevent="cleanDocente"
                    :key="2"
                  >Cancelar</button>
                </template>
                <template v-else>
                  <button
                    type="button"
                    class="btn btn-success m-2"
                    v-on:click.prevent="addDocente"
                    :key="1"
                  >Adicionar</button>
                  <button
                    type="button"
                    class="btn btn-secondary m-2"
                    v-on:click.prevent="cleanDocente"
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
import docenteService from "../../common/services/docente";
import docentePerfilService from "../../common/services/docentePerfil";

const emptyDocente = {
  id: undefined,
  nome: undefined,
  apelido: undefined,
  creditos: 0,
  ativo: 1
};

const emptyPerfil = {
  Doncente: undefined,
  Perfil: undefined
};

export default {
  name: "DashboardDocente",

  data() {
    return {
      docenteForm: _.clone(emptyDocente),
      perfisAssociados: [],
      error: undefined,
      docentePerfil: _.clone(emptyPerfil),
      docenteClickado: ""
    };
  },

  methods: {
    addDocente() {
      docenteService
        .create(this.docenteForm)
        .then(response => {
          this.cleanDocente();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Docente ${response.Docente.nome} foi criada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao criar Docente</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    editDocente() {
      docenteService
        .update(this.docenteForm.id, this.docenteForm)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Docente ${response.Docente.nome} foi atualizada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Docente</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    deleteDocente() {
      docenteService
        .delete(this.docenteForm.id, this.docenteForm)
        .then(response => {
          this.cleanDocente();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Docente ${response.Docente.nome} foi excluída!`,
            type: "success"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Docente</b>";
        });
    },

    cleanDocente() {
      this.docenteForm = _.clone(emptyDocente);
      this.error = undefined;
    },

    showDocentes(docente, docentes) {
      this.docenteClickado = docente.nome;
      this.cleanDocente();
      this.docenteForm = _.clone(docente);
      this.perfisAssociados = [];
      console.log(docentes);
      for (var i = 0; i < docentes.length; i++) {
        console.log(docentes[i]);
        if (docentes[i].DocenteId === docente.id) {
          console.log("ack");
          this.perfisAssociados.push(docentes[i].Perfil);
        }
      }
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
    },

    addPerfil(perfil) {
      this.docentePerfil.Docente = this.docenteForm.id;
      this.docentePerfil.Perfil = perfil;
      docentePerfilService
        .create(this.docentePerfil)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${response.Perfil} foi associado ao Docente ${this.docenteForm.apelido}!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao associar Perfil</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    deletePerfil(perfil) {
      docentePerfilService
        .delete(this.docenteForm.id, perfil)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O Perfil ${response.Perfil} foi exluído do Docente ${this.docenteForm.apelido}!`,
            type: "success"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Perfil</b>";
        });
    },

    managePerfil(perfil) {
      if (_.indexOf(this.perfisAssociados, perfil) === -1) {
        this.addPerfil(perfil);
      } else {
        this.deletePerfil(perfil);
      }
    }
  },

  computed: {
    Docentes() {
      return _.orderBy(this.$store.state.docente.Docentes, "nome");
    },

    Perfis() {
      return this.$store.state.perfil.Perfis;
    },

    DocentePerfis() {
      return this.$store.state.docentePerfil.DocentePerfis;
    },

    isEdit() {
      return this.docenteForm.id !== undefined;
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
.DashboardDocentes {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
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
  overflow-y: scroll;
  height: -webkit-calc(100vh - 100px);
  height: -moz-calc(100vh - 100px);
  height: calc(100vh - 100px);
  font-size: 11px;
  background-color: #f5f5f5;
  margin: 0;
}
tbody {
  /*top: 23px;*/
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
table tbody tr div {
  height: 22px !important;
}
table input {
  height: 11px !important;
  text-align: center !important;
}
input[type="text"] {
  height: 25px !important;
  font-size: 11px;
}
input[type="checkbox"] {
  margin-left: 0 !important;
}
.sticky {
  display: block !important;
  overflow: hidden !important;
  height: 20px !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
  z-index: 3 !important;
}
/* Fim Tabela Lucas */

label {
  font-size: 12px !important;
}
.card-title {
  font-size: 16px !important;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.cartao {
  width: 330px !important;
  height: auto !important;
  top: -20px !important;
  padding: 0;
}
.cartao-inteiro {
  padding-right: 15px;
}
.custom-control {
  font-size: 11px;
}
.custom-control-inline {
  margin-right: 0 !important;
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
  -webkit-box-shadow: 0 0 0 0.2rem rgba(194, 146, 84, 0.5) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(194, 146, 84, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(194, 146, 84, 0.5) !important;
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
.form-group {
  margin-bottom: 13px !important;
}
.col-form-label {
  padding-top: 0;
  padding-bottom: 0;
}
.bg-custom {
  background-color: #c8c8c8;
}
.noHover {
  pointer-events: none;
}
@media screen and (max-width: 767px) {
  .cartao {
    margin-right: auto !important;
    top: 0 !important;
  }
}
</style>