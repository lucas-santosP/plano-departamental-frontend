<template>
  <div class="DashboardSalas row" v-if="Admin">
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap pt-0 pb-0 pr-0 pl-0 mb-0"
    >
      <div class="form-inline col-12 pl-0 mb-2 pr-1">
        <h1 class="titulo">Lista Salas</h1>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <div class="divTable">
      <!-- Inicio da Tabela -->
      <table class="table table-hover table-sm table-bordered">
        <thead class="thead-light" style="z-index: 3;">
          <tr>
            <div style="display: block; overflow: hidden; width: 157px;" class="sticky">
              <th scope="col">
                <p class="p-header" style="width: 82px">Nome</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 72px">Laboratório</p>
              </th>
            </div>
          </tr>
        </thead>
        <tbody>
          <template v-if="Salas.length > 0">
            <tr
              v-for="sala in Salas"
              :key="sala.id"
              v-on:click.prevent="showSala(sala)"
              style="cursor:pointer"
            >
              <div style="width: 157px">
                <td>
                  <p style="width: 82px">{{sala.nome}}</p>
                </td>
                <td>
                    <div style="width: 72px">
                      <input
                        class="form-check-input position-static"
                        disabled
                        type="checkbox"
                        v-model="sala.laboratorio"
                        value
                      />
                      <!--<b-form-checkbox style="margin-left:5px; display:block" disabled v-model="docente.ativo"></b-form-checkbox>-->
                    </div>
                </td>
              </div>
            </tr>
          </template>
          <template v-else>
            <tr>
              <div style="width: 139px">
                <td colspan="2" class="text-center">
                  <i class="fas fa-exclamation-triangle"></i> Nenhuma sala encontrada!
                </td>
              </div>
            </tr>
          </template>
        </tbody>
      </table>
      <!-- Fim da Tabela -->
    </div>

    <!-- Grid Direito -->
    <div class="col-lg-5 col-md-5 col-sm-5 col-6">
      <div class="card ml-0 cartao">
        <div class="card-header">
          <template v-if="isEdit">
            <h1 class="card-title">Editar Sala</h1>
          </template>
          <template v-else>
            <h1 class="card-title">Adicionar Sala</h1>
          </template>
        </div>

        <div class="card-body">
          <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error"></b-alert>

          <form>
            <div class="row mb-2 mx-0">
              <div class="form-group m-0 px-0">
                <label for="nome" class="col-form-label py-0">Nome</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="nome"
                  v-model="salaForm.nome"
                />
              </div>
            </div>

            <div class="row mb-2 mx-0">
              <div class="form-group m-0 px-0">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    id="laboratorio"
                    class="custom-control-input"
                    value="1"
                    v-model="salaForm.laboratorio"
                  />
                  <label
                    class="custom-control-label"
                    for="laboratorio"
                    style="padding-top:4px!important"
                  >Laboratório</label>
                </div>
              </div>
            </div>

            <div class="row mb-1 mt-1 mx-0">
              <div class="form-group m-0 px-0">
                <template v-if="isEdit">
                  <div style="display: flex">
                    <button
                      type="button"
                      class="btn-sm btn btn-success mr-2 mb-2 botao-estilo"
                      v-on:click.prevent="editSala"
                      :key="1"
                    >Editar</button>
                    <button
                      type="button"
                      class="btn-sm btn btn-danger mr-2 mb-2"
                      v-on:click.prevent="deleteSala"
                      :key="3"
                    >Excluir</button>
                    <button
                      type="button"
                      class="btn-sm btn btn-secondary mb-2"
                      v-on:click.prevent="cleanSala"
                      :key="2"
                    >Cancelar</button>
                  </div>
                </template>
                <template v-else>
                  <div style="display: flex">
                    <button
                      type="button"
                      class="btn-sm btn btn-success mr-2 mb-2"
                      v-on:click.prevent="addSala"
                      :key="1"
                    >Adicionar</button>
                    <button
                      type="button"
                      class="btn-sm btn btn-secondary mb-2"
                      v-on:click.prevent="cleanSala"
                      :key="2"
                    >Resetar</button>
                  </div>
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
import salaService from "../../common/services/sala";

const emptySala = {
  id: undefined,
  nome: undefined,
  laboratorio: undefined
};

export default {
  name: "DashboardSalas",

  data() {
    return {
      salaForm: _.clone(emptySala),
      error: undefined
    };
  },

  methods: {
    addSala() {
      salaService
        .create(this.salaForm)
        .then(response => {
          this.cleanSala();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Sala ${response.Sala.nome} foi criada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao criar Sala</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    editSala() {
      salaService
        .update(this.salaForm.id, this.salaForm)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Sala ${response.Sala.nome} foi atualizada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao atualizar Sala</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    deleteSala() {
      salaService
        .delete(this.salaForm.id, this.salaForm)
        .then(response => {
          this.cleanSala();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Sala ${response.Sala.nome} foi excluída!`,
            type: "success"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Sala</b>";
        });
    },

    cleanSala() {
      this.salaForm = _.clone(emptySala);
      this.error = undefined;
    },

    showSala(sala) {
      this.cleanSala();
      this.salaForm = _.clone(sala);
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
    Salas() {
      return this.$store.state.sala.Salas;
    },

    isEdit() {
      return this.salaForm.id !== undefined;
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
.DashboardSalas {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.btn {
  height: 25px;
  min-width: -webkit-max-content;
  min-width: -moz-max-content;
  min-width: max-content;
  max-width: -webkit-max-content;
  max-width: -moz-max-content;
  max-width: max-content;
  font-size: 12px;
  padding: 0 5px 0 5px;
}
.botao-estilo {
  background-color: #0079fa !important;
  border-color: #0079fa !important;
}
.botao-estilo:hover {
  background-color: #0055af !important;
  border-color: #0055af !important;
}
.botao-estilo:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(108, 136, 166, 0.5) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(108, 136, 166, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(108, 136, 166, 0.5) !important;
}
.botao-estilo2 {
  background-color: #f0852e !important;
  border-color: #f0852e !important;
  color: white;
}
.botao-estilo2:hover {
  background-color: #e86c07 !important;
  border-color: #e86c07 !important;
}
.botao-estilo2:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(194, 146, 84, 0.5) !important;
     -moz-box-shadow: 0 0 0 0.2rem rgba(194, 146, 84, 0.5) !important;
          box-shadow: 0 0 0 0.2rem rgba(194, 146, 84, 0.5) !important;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
}
.card-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.card {
  width: 190px;
}
.card-body {
  font-size: 12px;
  padding-top: 15px;
  padding-left: 14px !important;
}
input {
  height: 25px !important;
  padding: 0px 0px 0px 5px !important;
  font-size: 11px !important;
  text-align: left;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
}
.custom-select {
  height: 26px !important;
  font-size: 12px !important;
  padding: 0px 0px 0px 10px !important;
  min-width: 85px;
  max-width: 85px;
  text-align: center;
}
.input-group-text {
  max-width: 70px;
  min-width: 70px;
  height: 26px !important;
  margin-left: -5px;
  padding-left: 15px;
  font-size: 12px !important;
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
table input {
  height: 11px !important;
  text-align: center !important;
}
input[type="text"]{
  height: 25px;
  font-size: 11px;
}
input[type="checkbox"]{
  margin-left: 0!important;
}
table tbody tr div{
  height:22px!important;
}
.sticky {
  display: block !important;
  overflow: hidden !important;
  height: 20px !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
}
/* APENAS NO FIREFOX */
@-moz-document url-prefix() {
   input {
    height: 25px !important;
    text-align: start;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(92, 92, 92);
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
}
@media screen and (max-width: 991px) {
  .cartao {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>