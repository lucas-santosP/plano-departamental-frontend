<template>
  <div class="DashboardSalas row" v-if="Admin">
    
      <div class="col-12">
     <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Lista Salas</h1>
      </div>
    
    </div>
    <div class="col">
      <div
        style="overflow-y: auto; height: 75vh; width: 280px; margin-left: 30%; margin-right: auto;"
      >
        <!-- Inicio da Tabela -->
        <table class="table table-hover table-sm table-bordered">
          <thead class="thead-light">
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Laboratório</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="Salas.length > 0">
              <tr v-for="sala in Salas" :key="sala.id" v-on:click.prevent="showSala(sala)">
                <td>{{sala.nome}}</td>
                <td>
                  <b-form-checkbox disabled v-model="sala.laboratorio"></b-form-checkbox>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="2" class="text-center">
                  <i class="fas fa-exclamation-triangle"></i> Nenhuma sala encontrada!
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <!-- Fim da Tabela -->
      </div>
    </div>
    <!-- Grid Direito -->
    <div class="col-lg-5 col-md-10 col-sm-12 col-12 mt-3 ml-auto mr-auto pl-0">
      <div class="col card cartao" style="top: 0px; width: 90%; max-width: 500px;">
        <div class="card-body" style="padding:25px;">
          <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
          >
            <template v-if="isEdit">
              <h1 class="h2">Editar Sala</h1>
            </template>
            <template v-else>
              <h1 class="h2">Adicionar Sala</h1>
            </template>
          </div>
          <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error"></b-alert>
          <form>
            <div class="form-group row">
              <label for="nome" class="col-sm-2 col-form-label texto-caixa" style="text-align: end; padding-left:0; padding-right:0; padding-top:2px;">Nome</label>
              <div class="col-sm-10">
                <input type="text" class="form-control form-control-sm col-lg-11 col-md-11 col-sm-12" id="nome" v-model="salaForm.nome" />
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-12">
                <label for="laboratorio" class="col-form-label lab">
                  <input type="checkbox" id="laboratorio" value="1" v-model="salaForm.laboratorio" />
                  Laboratório
                </label>
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-10 botoes">
                <template v-if="isEdit">
                  <button
                    type="button"
                    class="col-2 btn-sm btn btn-success m-2 botao-estilo"
                    v-on:click.prevent="editSala"
                    :key="1"
                  >Editar</button>
                  <button
                    type="button"
                    class="col-2 btn-sm btn btn-danger m-2"
                    v-on:click.prevent="deleteSala"
                    :key="3"
                  >Excluir</button>
                  <button
                    type="button"
                    class="col-2 btn-sm btn btn-secondary m-2"
                    v-on:click.prevent="cleanSala"
                    :key="2"
                  >Cancelar</button>
                </template>
                <template v-else>
                  <button
                    type="button"
                    class="col-2 btn-sm btn btn-success m-2"
                    v-on:click.prevent="addSala"
                    :key="1"
                  >Adicionar</button>
                  <button
                    type="button"
                    class="col-2 btn-sm btn btn-secondary m-2"
                    v-on:click.prevent="cleanSala"
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
table th{
      position:-webkit-sticky;
      position: sticky;
      top: 0;
}
.botao-estilo {
  background-color: #f0852e !important;
  border-color: #f0852e !important;
  color: white;
}

.botao-estilo:hover {
  background-color: #e86c07 !important;
  border-color: #e86c07 !important;
}

.botao-estilo:focus {
  box-shadow: 0 0 0 0.2rem rgba(194, 146, 84, 0.5) !important;
}

th {
  text-align: center;
}
td {
  text-align: center;
}
.col-form-label{
  padding-top:0;
  padding-bottom:0;
}
.btn{
  height:31px;
  margin-bottom: 7px;
  margin-left:15px;
  min-width: max-content;
}

@media screen and (max-width: 991px) {
    .cartao{
        margin-left:auto;
        margin-right:auto;
    }
    .lab{
        margin-left:0;
    }
    .texto-caixa{
        text-align: start !important;
        padding-left: 14px !important;
    }
}
</style>