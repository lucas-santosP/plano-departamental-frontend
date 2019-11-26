<template>
  <div class="CargaPos row pr-2" style="font-size:11px;">
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap pt-0 pb-0 pr-0 pl-0 mb-0"
    >
      <div class="form-inline col-12 pl-0 mb-2 pr-1">
        <h1 class="titulo col-xl-2 col-md-3 col-sm-4 col-4">Carga Pos</h1>

        <div
          class="form-group col-xl-10 col-md-9 col-sm-8 col-8 mb-0 pr-0"
          style="justify-content: flex-end;"
        >
          <div class="input-group mr-0 ml-auto mb-0 mt-0">
            <select class="form-control form-control-sm mt-1" v-model="periodos">
              <option value="1">Primeiro</option>
              <option value="2">Segundo</option>
              <option value="3">Ambos</option>
            </select>
            <div class="input-group-append mt-1 mr-4">
              <div class="input-group-append">
                <label class="input-group-text">Semestre</label>
              </div>
            </div>

            <template v-if="isAdd">
              <button
                type="button"
                class="btn btn-sm mt-1 mr-2 btn-success botao-estilo"
                v-on:click.prevent="addCarga"
              >Confirmar</button>
              <button
                type="button"
                class="btn btn-sm mt-1 btn-danger"
                v-on:click.prevent="toggleAdd"
              >Cancelar</button>
            </template>

            <template v-else>
              <button
                type="button"
                class="btn btn-sm mt-1 mr-2 btn-success"
                v-on:click.prevent="toggleAdd"
              >Adicionar</button>
              <button
                type="button"
                class="btn btn-sm mt-1 btn-danger botao-estilo2"
                v-b-modal.modalConfirma
              >Deletar</button>

              <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
                <p class="my-4">Tem certeza que deseja deletar as cargas selecionadas?</p>
                <template v-for="carga in Deletar">
                  <template v-for="docente in Docentes">
                    <template v-if="docente.id===carga.Docente">
                      <p :key="'carga'+carga.id+'docente'+docente.id" style="width:80px">
                        Docente:{{docente.apelido}}
                        <br />
                        Programa:{{carga.programa}}
                      </p>
                    </template>
                  </template>
                </template>
              </b-modal>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <div id="loading" v-if="isLoading">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>
<!-- Inicio Tabela 1 -->
    
      <div class="row">
        <div class="col">
          <div class="pl-0 divTable" v-if="!isLoading">
            <table class="table table-hover table-bordered table-sm">
              <thead class="thead-light sticky">
                <tr>
                  <div style="display: block; width: 330px;" class="sticky">
                    <th scope="col">
                      <p class="p-header" style="width:24px!important;"></p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width:24px!important;">T.</p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width:135px!important;">Docente</p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width:100px!important;">Programa</p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width:40px!important;">C.</p>
                    </th>
                  </div>
                </tr>
              </thead>

              <tbody>
                <template v-if="isAdd">
                  <tr>
                    <div style="width: 330px;">
                      <td>
                        <div style="width:24px; height:40px"></div>
                      </td>

                      <td>
                        <div style="width:24px;">
                          <input
                            type="text"
                            style="width: 15px; text-align: center;"
                            id="trimestre"
                            v-model="cargaPosForm.trimestre"
                          />
                        </div>
                      </td>

                      <td>
                        <div style="width: 135px">
                          <select
                            type="text"
                            style="width:130px"
                            id="docente1"
                            v-model="cargaPosForm.Docente"
                          >
                            <option v-if="Docentes.length===0" type="text" value>Nenhum Docente Encontrado</option>
                            <option
                              v-for="docente in Docentes"
                              :key="docente.id"
                              :value="docente.id"
                            >{{docente.apelido}}</option>
                          </select>
                        </div>
                      </td>

                      <td>
                        <div style="width: 100px">
                          <input
                            type="text"
                            style="width: 80px"
                            id="programa"
                            v-model="cargaPosForm.programa"
                          />
                        </div>
                      </td>

                      <td>
                        <div style="width: 40px">
                          <input
                            type="text"
                            style="width: 25px"
                            id="creditos"
                            v-model="cargaPosForm.creditos"
                          />
                        </div>
                      </td>
                    </div>
                  </tr>
                </template>
                <!-- LINHAS -->
                <template v-if="CargasPGMC.length>0">
                  <template v-for="t in [1,  2, 3, 4]">
                    <template v-for="docente in Docentes">
                      <tr
                        v-for="carga in CargasPGMC"
                        :key="'docente'+docente.id+'carga'+carga.id"
                        v-if="(carga.Docente === docente.id) && (carga.trimestre == (t))"
                      >
                        <template
                          v-if="((carga.trimestre == 1 || carga.trimestre == 2) && (periodos == 1 || periodos == 3))"
                        >
                          <cargadata :key="'1docente'+docente.id+'carga'+carga.id" v-bind:carga="carga"></cargadata>
                        </template>
                        <template
                          v-if="((carga.trimestre == 3 || carga.trimestre == 4) && (periodos == 2 || periodos == 3))"
                        >
                          <cargadata :key="'2docente'+docente.id+'carga'+carga.id" v-bind:carga="carga"></cargadata>
                        </template>
                      </tr>
                    </template>
                  </template>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col">
          <div class="pl-0 divTable" v-if="!isLoading">
            <table class="table table-hover table-bordered table-sm">
              <thead class="thead-light sticky">
                <tr>
                  <div style="display: block; width: 330px;" class="sticky">
                    <th scope="col">
                      <p class="p-header" style="width:24px!important;"></p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width:24px!important;">T.</p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width:135px!important;">Docente</p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width:100px!important;">Programa</p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width:40px!important;">C.</p>
                    </th>
                  </div>
                </tr>
              </thead>

              <tbody>
                <template v-if="isAdd">
                  <tr>
                    <div style="width: 330px;">
                      <td>
                        <div style="width:24px; height:40px"></div>
                      </td>

                      <td>
                        <div style="width:24px;">
                          <input
                            type="text"
                            style="width: 15px; text-align: center;"
                            id="trimestre"
                            v-model="cargaPosForm.trimestre"
                          />
                        </div>
                      </td>

                      <td>
                        <div style="width: 135px">
                          <select
                            type="text"
                            style="width:130px"
                            id="docente1"
                            v-model="cargaPosForm.Docente"
                          >
                            <option v-if="Docentes.length===0" type="text" value>Nenhum Docente Encontrado</option>
                            <option
                              v-for="docente in Docentes"
                              :key="docente.id"
                              :value="docente.id"
                            >{{docente.apelido}}</option>
                          </select>
                        </div>
                      </td>

                      <td>
                        <div style="width: 100px">
                          <input
                            type="text"
                            style="width: 80px"
                            id="programa"
                            v-model="cargaPosForm.programa"
                          />
                        </div>
                      </td>

                      <td>
                        <div style="width: 40px">
                          <input
                            type="text"
                            style="width: 25px"
                            id="creditos"
                            v-model="cargaPosForm.creditos"
                          />
                        </div>
                      </td>
                    </div>
                  </tr>
                </template>
                <!-- LINHAS -->
                <template v-if="CargasPGCC.length>0">
                  <template v-for="t in [1,  2, 3, 4]">
                    <template v-for="docente in Docentes">
                      <tr
                        v-for="carga in CargasPGCC"
                        :key="'docente'+docente.id+'carga'+carga.id"
                        v-if="(carga.Docente === docente.id) && (carga.trimestre == (t))"
                      >
                        <template
                          v-if="((carga.trimestre == 1 || carga.trimestre == 2) && (periodos == 1 || periodos == 3))"
                        >
                          <cargadata :key="'1docente'+docente.id+'carga'+carga.id" v-bind:carga="carga"></cargadata>
                        </template>
                        <template
                          v-if="((carga.trimestre == 3 || carga.trimestre == 4) && (periodos == 2 || periodos == 3))"
                        >
                          <cargadata :key="'2docente'+docente.id+'carga'+carga.id" v-bind:carga="carga"></cargadata>
                        </template>
                      </tr>
                    </template>
                  </template>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col">
          <div class="pl-0 divTable" v-if="!isLoading">
            <table class="table table-hover table-bordered table-sm">
              <thead class="thead-light sticky">
                <tr>
                  <div style="display: block; width: 330px;" class="sticky">
                    <th scope="col">
                      <p class="p-header" style="width:24px!important;"></p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width:24px!important;">T.</p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width:135px!important;">Docente</p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width:100px!important;">Programa</p>
                    </th>
                    <th scope="col">
                      <p class="p-header" style="width:40px!important;">C.</p>
                    </th>
                  </div>
                </tr>
              </thead>

              <tbody>
                <template v-if="isAdd">
                  <tr>
                    <div style="width: 330px;">
                      <td>
                        <div style="width:24px; height:40px"></div>
                      </td>

                      <td>
                        <div style="width:24px;">
                          <input
                            type="text"
                            style="width: 15px; text-align: center;"
                            id="trimestre"
                            v-model="cargaPosForm.trimestre"
                          />
                        </div>
                      </td>

                      <td>
                        <div style="width: 135px">
                          <select
                            type="text"
                            style="width:130px"
                            id="docente1"
                            v-model="cargaPosForm.Docente"
                          >
                            <option v-if="Docentes.length===0" type="text" value>Nenhum Docente Encontrado</option>
                            <option
                              v-for="docente in Docentes"
                              :key="docente.id"
                              :value="docente.id"
                            >{{docente.apelido}}</option>
                          </select>
                        </div>
                      </td>

                      <td>
                        <div style="width: 100px">
                          <input
                            type="text"
                            style="width: 80px"
                            id="programa"
                            v-model="cargaPosForm.programa"
                          />
                        </div>
                      </td>

                      <td>
                        <div style="width: 40px">
                          <input
                            type="text"
                            style="width: 25px"
                            id="creditos"
                            v-model="cargaPosForm.creditos"
                          />
                        </div>
                      </td>
                    </div>
                  </tr>
                </template>
                <!-- LINHAS -->
                <template v-if="CargasPGEM.length>0">
                  <template v-for="t in [1,  2, 3, 4]">
                    <template v-for="docente in Docentes">
                      <tr
                        v-for="carga in CargasPGEM"
                        :key="'docente'+docente.id+'carga'+carga.id"
                        v-if="(carga.Docente === docente.id) && (carga.trimestre == (t))"
                      >
                        <template
                          v-if="((carga.trimestre == 1 || carga.trimestre == 2) && (periodos == 1 || periodos == 3))"
                        >
                          <cargadata :key="'1docente'+docente.id+'carga'+carga.id" v-bind:carga="carga"></cargadata>
                        </template>
                        <template
                          v-if="((carga.trimestre == 3 || carga.trimestre == 4) && (periodos == 2 || periodos == 3))"
                        >
                          <cargadata :key="'2docente'+docente.id+'carga'+carga.id" v-bind:carga="carga"></cargadata>
                        </template>
                      </tr>
                    </template>
                  </template>
                </template>
              </tbody>
            </table>
          </div>
        </div>
    </div>
  </div>
</template>



<script>
import _ from "lodash";
import cargaPosService from "../../common/services/cargaPos";
import cargadata from "./CargaPosRow.vue";

const emptyCarga = {
  id: undefined,
  trimestre: undefined,
  Docente: undefined,
  programa: undefined,
  creditos: undefined
};

export default {
  name: "DashboardCargaPos",

  data() {
    return {
      cargaPosForm: _.clone(emptyCarga),
      error: undefined,
      isAdd: false,
      atual: undefined,
      trimestre: 1,
      programa: "PGCC",
      periodos: 3
    };
  },

  components: {
    cargadata
  },
  /*
        mounted () {
            this.$store.commit('emptyDelete')
            console.log(this.$store.state.turma.Deletar)
            this.$store.commit(COMPONENT_LOADED)
        },
        */

  methods: {
    deleteCarga(carga) {
      cargaPosService
        .delete(carga.id)
        .then(response => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Carga ${response.CargaPos.programa} foi excluída!`,
            type: "success"
          });
        })
        .catch(() => {
          this.error = "<b>Erro ao excluir Carga</b>";
        });
    },

    deleteSelected: function() {
      var cargas = this.$store.state.cargaPos.Deletar;
      for (var i = 0; i < cargas.length; i++) {
        this.deleteCarga(cargas[i]);
      }
      this.$store.commit("emptyDeleteCarga");
    },

    addCarga() {
      cargaPosService
        .create(this.cargaPosForm)
        .then(response => {
          console.log(response.CargaPos);
          console.log(this.$store.state.cargaPos.Cargas);
          this.trimestre = response.CargaPos.trimestre;
          this.programa = response.CargaPos.programa;
          this.cleanCarga();
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `A Carga ${response.CargaPos.programa} foi criada!`,
            type: "success"
          });
        })
        .catch(error => {
          this.error = "<b>Erro ao criar Carga</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    cleanCarga() {
      this.cargaPosForm = _.clone(emptyCarga);
      this.cargaPosForm.trimestre = this.trimestre;
      this.cargaPosForm.programa = this.programa;
      this.error = undefined;
    },

    toggleAdd() {
      this.cleanCarga();
      this.isAdd = !this.isAdd;
    }
  },

  computed: {
    Docentes() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "apelido"
      );
    },

    Deletar() {
      return this.$store.state.cargaPos.Deletar;
    },

    CargasPos() {
      return _.orderBy(this.$store.state.cargaPos.Cargas, "trimestre");
    },

    CargasPGCC() {
      return _.orderBy(_.filter(this.$store.state.cargaPos.Cargas,['programa', 'PGCC']), "trimestre");
    },
   
    CargasPGMC() {
      return _.orderBy(_.filter(this.$store.state.cargaPos.Cargas, ['programa', 'PGMC']), "trimestre");
    },
   
    CargasPGEM() {
      return _.orderBy(_.filter(this.$store.state.cargaPos.Cargas, ['programa', 'PGEM']), "trimestre");
    },

    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>
<style scoped>
.CargaPos {
  max-width: 100%;
  /* overflow: hidden; */
  margin: 0;
}
.p-header {
  padding: 0px 0 0px 0;
  margin: 0;
  font-size: 11px;
  text-align: center;
  height: 18px;
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
  background-color: #f51616 !important;
  border-color: #f51616 !important;
}

.botao-estilo2:hover {
  background-color: #c91212 !important;
  border-color: #c91212 !important;
}

.botao-estilo2:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(250, 110, 110, 0.5) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(250, 110, 110, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(250, 110, 110, 0.5) !important;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
}
.form-control {
  height: 25px !important;
  font-size: 12px !important;
  padding: 0px 0px 0px 5px !important;
  min-width: 85px;
  max-width: 85px;
  text-align: center;
}
.input-group-text {
  max-width: 70px;
  min-width: 70px;
  height: 25px !important;
  margin-left: -5px;
  padding-left: 15px;
  font-size: 12px !important;
}
.divTable {
  /* overflow: hidden; */
  height: calc(100vh - 90px);
  border: #808080 solid 2px;
  width: max-content;
}
table {
  display: block;
  overflow-y: scroll;
  height: -webkit-calc(100vh - 90px);
  height: -moz-calc(100vh - 90px);
  height: calc(100vh - 90px);
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
table select {
  height: 15px !important;
  text-align: left;
}
table input {
  height: 18px !important;
  text-align: center !important;
}

/* APENAS NO FIREFOX */
@-moz-document url-prefix() {
  select {
    height: 15px !important;
    text-align: left;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(133, 133, 133);
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
  input {
    height: 18px !important;
    text-align: center;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(92, 92, 92);
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
}
.sticky {
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  z-index: 10;
}
.cube1,
.cube2 {
  background-color: #333;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: cubemove 1.8s infinite ease-in-out;
  animation: cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes cubemove {
  25% {
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -webkit-transform: rotate(-360deg);
  }
}

@keyframes cubemove {
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
</style>
