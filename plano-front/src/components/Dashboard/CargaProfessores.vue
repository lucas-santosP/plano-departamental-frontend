<template>
  <div class="DashboardCargaProfessores row pr-2" style="overflow-y:auto">
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap pt-0 pb-0 pr-0 pl-0 mb-0"
    >
      <div class="form-inline col-12 pl-0 mb-2 pr-1">
        <h1 class="titulo">Carga Professores</h1>
        <button
          type="button"
          class="btn btn-sm ml-auto btn-success col-sm-1 botao-estilo"
          v-on:click.prevent="pdf"
        >Relatório</button>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <div class="divTable pl-0" ref="carga">
      <table class="table table-hover table-sm table-bordered">
        <thead class="thead-light sticky">
          <tr>
            <div
              style="display: block; overflow: hidden; width: 645px; height:20px !important"
              class="sticky"
            >
              <th scope="col">
                <p class="p-header" style="width: 130px">Nome</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 24px">S.</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 80px">Cod</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 150px">Disciplina</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 24px">T.</p>
              </th>
              <th scope="col">
                <p class="p-header" style="width: 120px">Horário</p>
              </th>
              <th scope="col" id="creditos1">
                <p class="p-header" style="width: 32px">CS1</p>
                <b-popover :target="'creditos1'" placement="bottom" triggers="hover focus">
                  <p>Somatório dos créditos no 1º semestre</p>
                </b-popover>
              </th>
              <th scope="col" id="creditos2">
                <p class="p-header" style="width: 32px">CS2</p>
                <b-popover :target="'creditos2'" placement="bottom" triggers="hover focus">
                  <p>Somatório dos créditos no 2º semestre</p>
                </b-popover>
              </th>
              <th scope="col" id="creditostotal">
                <p class="p-header" style="width: 42px">CTotal</p>
                <b-popover :target="'creditostotal'" placement="bottom" triggers="hover focus">
                  <p>Somatório total dos créditos</p>
                </b-popover>
              </th>
            </div>
          </tr>
        </thead>
        <tbody>
          <template v-if="Professores.length > 0">
            <template v-for="professor in Professores">
              <template v-if="turmas(professor).length > 0">
                <div style="width: 645px;" :key="professor.apelido">
                  <td style="background-color: #c7c8c9; font-weight: bold; border: none; color: black; ">
                    <div style="width: 130px">{{professor.apelido}}</div>
                  </td>
                  <td style="background-color: #c7c8c9; font-weight: bold; border: none; color: black; ">
                    <div style="width: 24px"></div>
                  </td>
                  <td style="background-color: #c7c8c9; font-weight: bold; border: none; color: black; ">
                    <div style="width: 80px"></div>
                  </td>
                  <td style="background-color: #c7c8c9; font-weight: bold; border: none; color: black; ">
                    <div style="width: 150px; height: 20px;"></div>
                  </td>
                  <td style="background-color: #c7c8c9; font-weight: bold; border: none; color: black; ">
                    <div style="width: 24px"></div>
                  </td>
                  <td style="background-color: #c7c8c9; font-weight: bold; border: none; color: black; ">
                    <div style="width: 120px"></div>
                  </td>
                  <td style="background-color: #c7c8c9; font-weight: bold; border: none; color: black; ">
                    <div style="width: 32px">{{creditos1(professor)}}</div>
                  </td>
                  <td style="background-color: #c7c8c9; font-weight: bold; border: none; color: black; ">
                    <div style="width: 32px">{{creditos2(professor)}}</div>
                  </td>
                  <td style="background-color: #c7c8c9; font-weight: bold; border: none; color: black; ">
                    <div style="width: 42px">{{creditos(professor)}}</div>
                  </td>
                </div>
              </template>

              <template v-for="turma in turmas(professor)">
                <tr
                  v-for="disciplina in Disciplinas"
                  :key="'turma'+turma.id+'disciplina'+disciplina.id+'professor'+professor.id"
                >
                  <template
                    v-if="turma.Disciplina===disciplina.id && (turma.Docente1===professor.id || turma.Docente2===professor.id)"
                  >
                    <div style="width: 645px;">
                      <td>
                        <div style="width: 130px"></div>
                      </td>
                      <td>
                        <div style="width: 24px">{{turma.periodo}}</div>
                      </td>
                      <td>
                        <div style="width: 80px">{{disciplina.codigo}}</div>
                      </td>
                      <td>
                        <div style="width: 150px; text-algin:center">
                          <p style="width: 150px;">{{disciplina.nome}}</p>
                        </div>
                      </td>
                      <td>
                        <div style="width: 24px">{{turma.letra}}</div>
                      </td>
                      <td>
                        <div style="width: 120px">
                          <template v-for="horario in Horarios">
                            <p
                              :key="horario.id"
                              v-if="horario.id===turma.Horario1"
                            >{{horario.horario}}</p>
                          </template>
                          <template v-for="horario in Horarios">
                            <p
                              :key="horario.id"
                              v-if="horario.id===turma.Horario2"
                            >{{horario.horario}}</p>
                          </template>
                        </div>
                      </td>

                      <td v-if="turma.periodo===1">
                        <div style="width: 32px">
                          <p
                            v-if="(turma.Docente1 > 0) && (turma.Docente2 > 0)"
                          >{{(disciplina.cargaTeorica + disciplina.cargaPratica)/2}}</p>
                          <p v-else>{{disciplina.cargaTeorica + disciplina.cargaPratica}}</p>
                        </div>
                      </td>
                      <td v-else>
                        <div style="width: 32px">-</div>
                      </td>

                      <td v-if="turma.periodo===3">
                        <div style="width: 32px">
                          <p
                            v-if="(turma.Docente1 > 0) && (turma.Docente2 > 0)"
                          >{{(disciplina.cargaTeorica + disciplina.cargaPratica)/2}}</p>
                          <p v-else>{{disciplina.cargaTeorica + disciplina.cargaPratica}}</p>
                        </div>
                      </td>
                      <td v-else>
                        <div style="width: 32px">-</div>
                      </td>

                      <td></td>
                    </div>
                  </template>
                </tr>
              </template>

              <template v-for="carga in CargasPos">
                <template v-if="carga.Docente===professor.id">
                  <tr :key="'cargaPos'+carga.id+'professor'+professor.id">
                    <div style="width: 645px;">
                      <td>
                        <div style="width: 130px"></div>
                      </td>
                      <td>
                        <div style="width: 24px">{{carga.trimestre}}</div>
                      </td>
                      <td>
                        <div style="width: 80px"></div>
                      </td>
                      <td>
                        <div style="width: 150px">Disciplina do {{carga.programa}}</div>
                      </td>
                      <td>
                        <div style="width: 24px"></div>
                      </td>
                      <td>
                        <div style="width: 120px"></div>
                      </td>

                      <td v-if="carga.trimestre==1 || carga.trimestre==2">
                        <div style="width: 32px">{{carga.creditos}}</div>
                      </td>
                      <td v-else>
                        <div style="width: 32px">-</div>
                      </td>

                      <td v-if="carga.trimestre==3 || carga.trimestre==4">
                        <div style="width: 32px">{{carga.creditos}}</div>
                      </td>
                      <td v-else>
                        <div style="width: 32px">-</div>
                      </td>

                      <td></td>
                    </div>
                  </tr>
                </template>
              </template>
            </template>
          </template>
          <template v-else>
            <tr>
              <td colspan="2" class="text-center">
                <i class="fas fa-exclamation-triangle"></i> Nenhum curso encontrado!
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import jsPDF from "jspdf";
import pdfs from "../../common/services/pdfs";
import html2canvas from "html2canvas";
export default {
  name: "DashboardCargaProfessores",

  methods: {
    pdf() {
      pdfs.pdfCargaProfessores();
    },

    turmas(professor) {
      return _.orderBy(
        _.filter(this.$store.state.turma.Turmas, turma => {
          return (
            turma.Docente1 === professor.id || turma.Docente2 === professor.id
          );
        }),
        "periodo"
      );
    },

    pos(professor) {
      return _.filter(this.$store.state.cargaPos.Cargas, turma => {
        return turma.Docente === professor.id;
      });
    },

    creditos1(professor) {
      var c = 0;
      for (var t = 0; t < this.$store.state.turma.Turmas.length; t++) {
        if (
          this.$store.state.turma.Turmas[t].periodo === 1 &&
          (this.$store.state.turma.Turmas[t].Docente1 === professor.id ||
            this.$store.state.turma.Turmas[t].Docente2 === professor.id)
        ) {
          for (
            var d = 0;
            d < this.$store.state.disciplina.Disciplinas.length;
            d++
          ) {
            if (
              this.$store.state.disciplina.Disciplinas[d].id ===
              this.$store.state.turma.Turmas[t].Disciplina
            ) {
              c += parseInt(
                this.$store.state.disciplina.Disciplinas[d].cargaPratica,
                10
              );
              c += parseInt(
                this.$store.state.disciplina.Disciplinas[d].cargaTeorica,
                10
              );
            }
          }
        }
      }
      for (var t = 0; t < this.$store.state.cargaPos.Cargas.length; t++) {
        if (this.$store.state.cargaPos.Cargas[t].Docente === professor.id) {
          if (
            this.$store.state.cargaPos.Cargas[t].trimestre == 1 ||
            this.$store.state.cargaPos.Cargas[t].trimestre == 2
          ) {
            c += parseInt(this.$store.state.cargaPos.Cargas[t].creditos, 10);
          }
        }
      }
      return c;
    },

    creditos2(professor) {
      var c = 0;
      for (var t = 0; t < this.$store.state.turma.Turmas.length; t++) {
        if (
          this.$store.state.turma.Turmas[t].periodo === 3 &&
          (this.$store.state.turma.Turmas[t].Docente1 === professor.id ||
            this.$store.state.turma.Turmas[t].Docente2 === professor.id)
        ) {
          for (
            var d = 0;
            d < this.$store.state.disciplina.Disciplinas.length;
            d++
          ) {
            if (
              this.$store.state.disciplina.Disciplinas[d].id ===
              this.$store.state.turma.Turmas[t].Disciplina
            ) {
              c += parseInt(
                this.$store.state.disciplina.Disciplinas[d].cargaPratica,
                10
              );
              c += parseInt(
                this.$store.state.disciplina.Disciplinas[d].cargaTeorica,
                10
              );
            }
          }
        }
      }
      for (var t = 0; t < this.$store.state.cargaPos.Cargas.length; t++) {
        if (this.$store.state.cargaPos.Cargas[t].Docente === professor.id) {
          if (this.$store.state.cargaPos.Cargas[t].trimestre == 3) {
            c += parseInt(this.$store.state.cargaPos.Cargas[t].creditos, 10);
          }
        }
      }
      return c;
    },

    creditos(professor) {
      var c = 0;
      for (var t = 0; t < this.$store.state.turma.Turmas.length; t++) {
        if (
          this.$store.state.turma.Turmas[t].Docente1 === professor.id ||
          this.$store.state.turma.Turmas[t].Docente2 === professor.id
        ) {
          for (
            var d = 0;
            d < this.$store.state.disciplina.Disciplinas.length;
            d++
          ) {
            if (
              this.$store.state.disciplina.Disciplinas[d].id ===
              this.$store.state.turma.Turmas[t].Disciplina
            ) {
              c += parseInt(
                this.$store.state.disciplina.Disciplinas[d].cargaPratica,
                10
              );
              c += parseInt(
                this.$store.state.disciplina.Disciplinas[d].cargaTeorica,
                10
              );
            }
          }
        }
      }
      for (var t = 0; t < this.$store.state.cargaPos.Cargas.length; t++) {
        if (this.$store.state.cargaPos.Cargas[t].Docente === professor.id) {
          c += parseInt(this.$store.state.cargaPos.Cargas[t].creditos, 10);
        }
      }
      return c;
    }
  },

  computed: {
    CargasPos() {
      return _.orderBy(this.$store.state.cargaPos.Cargas, "trimestre");
    },

    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },
    Horarios() {
      return this.$store.state.horario.Horarios;
    },
    Professores() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "apelido"
      );
    }
  }
};
</script>

<style scoped>
.DashboardCargaProfessores {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
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
  height: max-content;
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
  padding-left: 2px;
  padding-right: 2px;
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
  table select {
    height: 15px !important;
    text-align: left;
    box-sizing: border-box;

    line-height: 8px;
    border: 0.5px solid rgb(133, 133, 133);
    border-radius: 2px;
    background-color: rgb(245, 245, 245);
  }
  table input {
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
  top: 0;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
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
  box-shadow: 0 0 0 0.2rem rgba(108, 166, 116, 0.5) !important;
}
</style>