<template>
  <div class="DashboardHorarios row pr-2" v-if="Admin">
    <!-- Titulo -->
    <div
      class="div-titulo col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="titulo col-xl-2 col-md-2 col-sm-2 col-4 px-0 pr-1">Horários</h1>

        <div
          class="form-group col-xl-10 col-md-10 col-sm-10 col-8 mb-0 p-0"
          style="justify-content: flex-end!important;"
        >
          <div class="input-group mr-3 ml-auto mb-0 mt-0 p-0">
            <select
              class="form-control form-control-sm"
              v-model="periodo"
              v-on:change="createHorarios"
            >
              <option value="1">Primeiro</option>
              <option value="2">Segundo</option>
              <option value="3">Ambos</option>
            </select>
            <div class="input-group-append">
              <label class="input-group-text">Semestre</label>
            </div>
          </div>
          <div class="d-flex">
            <b-button v-b-modal.modalCursos title="Cursos" class="cancelbtn">
              <i class="fas fa-graduation-cap"></i>
            </b-button>

            <!-- v-on:click.prevent="pdf" -->
            <button type="button" class="relatbtn" title="Relatório">
              <i class="far fa-file-alt"></i>
            </button>

            <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn">
              <i class="fas fa-question"></i>
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <div class="p-0 m-0 w-100">
      <div class="tabelas p-0" style="margin-right: -8px!important;">
        <!-- -------------------------------------------- 1º periodo ----------------------------------------- -->
        <template v-if="(criando) && periodo==1 || periodo==3">
          <h3
            class="title"
            style="font-weight: bold; font-size: 18px; text-align: center !important;"
          >1º SEMESTRE</h3>
          <!-- -------------------------------------------- CC Diurno ----------------------------------------- -->
          <template v-if="activeCCD">
            <!-- passar o nome do curso pra dentro da tabela -->
            <h4>Ciência da Computação Diurno</h4>
          </template>
          <curso-diurno :Curso="ativos1.CCD"></curso-diurno>
          <!-- -------------------------------------------- EC ----------------------------------------- -->
          <template v-if="activeEC">
            <h4>Engenharia Computacional</h4>
          </template>

          <curso-diurno :Curso="ativos1.EC"></curso-diurno>
          <!-- -------------------------------------------- CC Noturno ----------------------------------------- -->
          <template v-if="activeCCN">
            <h4>Ciência da Computação Noturno</h4>
          </template>

          <curso-noturno :Curso="ativos1.CCN"></curso-noturno>
          <!-- -------------------------------------------- SI ----------------------------------------- -->
          <template v-if="activeSI">
            <h4>Sistemas de Informação</h4>
          </template>

          <curso-noturno :Curso="ativos1.SI"></curso-noturno>

          <!-- -------------------------------------------- Eletivas ----------------------------------------- -->
          <template v-if="activeEletivas">
            <h4>Eletivas</h4>
          </template>
          <horario-eletivas :Eletivas="ativos1.Eletivas"></horario-eletivas>
        </template>

        <!-- -------------------------------------------- 2º periodo ----------------------------------------- -->
        <template v-if="(criando) && periodo==2 || periodo==3">
          <h3
            class="title"
            style="font-weight: bold; font-size: 18px; text-align: center !important;"
          >2º SEMESTRE</h3>
          <!-- -------------------------------------------- CC Diurno ----------------------------------------- -->
          <template v-if="activeCCD">
            <h4>Ciência da Computação Diurno</h4>
          </template>

          <curso-diurno :Curso="ativos2.CCD"></curso-diurno>
          <!-- -------------------------------------------- EC ----------------------------------------- -->
          <template v-if="activeEC">
            <h4>Engenharia Computacional</h4>
          </template>

          <curso-diurno :Curso="ativos2.EC"></curso-diurno>
          <!-- -------------------------------------------- CC Noturno ----------------------------------------- -->
          <template v-if="activeCCN">
            <h4>Ciência da Computação Noturno</h4>
          </template>

          <curso-noturno :Curso="ativos2.CCN"></curso-noturno>
          <!-- -------------------------------------------- SI ----------------------------------------- -->
          <template v-if="activeSI">
            <h4>Sistemas de Informação</h4>
          </template>

          <curso-noturno :Curso="ativos2.SI"></curso-noturno>

          <!-- -------------------------------------------- Eletivas ----------------------------------------- -->
          <template v-if="activeEletivas">
            <h4>Eletivas</h4>
          </template>
          <horario-eletivas :Eletivas="ativos2.Eletivas"></horario-eletivas>
        </template>
        <!-- ----------------------------------------------------------------------------------------------- -->
      </div>
    </div>

    <!-- Grid Direito -->
    <!-- <div class="div-card p-0 mt-0 mb-2 col-lg-6 col-md-6 col-sm-12 col-12">
      <div class="card ml-auto mr-3">
        <div class="card-header">
          <h1 class="card-title">Definir Grades</h1>
        </div>
        <div class="card-body">
          <form>
            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <div class="input-group mr-0 ml-auto mb-0 mt-0 p-0">
                  <select class="form-control form-control-sm" v-model="periodo">
                    <option value="1">Primeiro</option>
                    <option value="2">Segundo</option>
                    <option value="3">Ambos</option>
                  </select>
                  <div class="input-group-append">
                    <label class="input-group-text">Semestre</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mb-2 mx-0">
              <div class="form-group col m-0 px-0">
                <div
                  class="form-group col m-0 px-0 border rounded-top"
                  style="border-color: rgba(0,0,0,0.125);"
                >
                  <table class="table table-sm">
                    <tr class="thead-light">
                      <div class="sticky border" style="width:max-contet;">
                        <th scope="col" class="border-0 p-header" style="width:25px">
                          <input type="checkbox" v-model="selectAll" v-on:change="toggleAll" />
                        </th>
                        <th
                          scope="col"
                          class="border-0 p-header"
                          style="width:140px; text-align:start!important"
                        >Cursos</th>
                      </div>
                    </tr>

                    <tbody>
                      <tr
                        v-for="curso in options"
                        :key="'curso-id-'+curso.id+curso.nome+'-'+curso.value"
                      >
                        <div style="width: max-contet">
                          <td style="padding:0;broder:0;margin:0!important">
                            <div style="width:25px;">
                              <input
                                type="checkbox"
                                :value="curso.value"
                                v-on:change.capture="defineSelectAll"
                                v-model="cursos"
                                class="form-check-input position-static m-0"
                              />
                            </div>
                          </td>
                          <td>
                            <p style="width:140px; text-align:start">{{curso.text}}</p>
                          </td>
                        </div>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <div style="display: flex; margin-right: 0; margin-left: auto">
                <button v-on:click="createHorarios" title="Confirmar" type="button" class="addbtn">
                  <i class="fas fa-check"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>-->

    <b-modal id="modalCursos" 
            class="mw-100"
            style="width: max-content" 
            ref="modalCursos" 
            scrollable title="Selecione os Cursos"
            :size="'sm'"
            >
      <div
        class="col m-0 p-0 border"
        style="width:max-content; border-color: rgba(0,0,0,0.125);"
        
      >
        <table class="table table-sm modal-table">
          <tr>
            <div style="font-size: 11px!important">
              <th class="border-0">
                <p style="width:20px" class="p-header"></p>
              </th>
              <th class="border-0">
                <p style="width:40px" class="p-header">Cód.</p>
              </th>
              <th class="border-0">
                <p class="p-header" style="width: 200px; text-align:start">Nome</p>
              </th>
            </div>
          </tr>
          <tbody>
            <!-- v-for em tr -->
            <tr v-for="curso in options_Cursos" :key="'curso-id-'+curso.value">
              <div style="width: max-content">
                <td>
                  <div style="width:20px;">
                    <input
                      type="checkbox"
                      :value="curso.value"
                      v-on:change.capture="defineSelectAll"
                      v-model="cursos"
                      class="form-check-input position-static m-0"
                    />
                  </div>
                </td>
                <td>
                  <p style="width:40px; text-align:center">{{curso.codigo.toUpperCase()}}</p>
                </td>
                <td>
                  <p style="width:200px; text-align:start">{{curso.nome}}</p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="modal-footer" class="w-100 m-0" style="display: flex">
        <div class="row ml-2 w-100">
          <b-button
            class="btn-azul btn-df mr-2"
            variant="success"
            @click="toggleAll()"
          >Selecionar Todos</b-button>
          <b-button
            class="btn-cinza btn-df mr-2"
            variant="secondary"
            @click="distoggleAll()"
          >Desmarcar Todos</b-button>
        </div>
        <b-button
          variant="success"
          v-on:click="createHorarios()"
          class="btn-verde btn-df mr-2"
          style="padding-right:15px!important; padding-left:15px!important;"
        >OK</b-button>
      </div>
    </b-modal>

    <!-- MODAL AJUDA -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para exibir conteúdo na tela:</strong> No cartão à direita, selecione o(s) semestre(s), em
            seguida o(s) curso(s) que deseja ver e clique em Confirmar
            <i
              class="fas fa-check addbtn px-1"
              style="font-size:12px"
            ></i>
            .
          </li>
        </ul>
      </div>

      <div slot="modal-footer" style="display: none"></div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import cursoDiurno from "./HorarioCursoDiurno.vue";
import cursoNoturno from "./HorarioCursoNoturno.vue";
import horarioEletivas from "./HorarioEletivas.vue";

export default {
  name: "DashboardHorarios",

  data() {
    return {
      cursos: [],
      error: undefined,
      options_Cursos: [
        { nome: "CIÊNCIA DA COMPUTAÇÃO DIURNO", value: 1, codigo: "65C" },
        { nome: "ENGENHARIA DA COMPUTAÇÃO", value: 4, codigo: "65B" },
        { nome: "CIÊNCIA DA COMPUTAÇÃO NOTURNO", value: 2, codigo: "35A" },
        { nome: "SISTEMAS DE INFORMAÇÃO", value: 3, codigo: "76A" },
        { nome: "ELETIVAS", value: 5, codigo: "-" }
      ],
      evenCCN: "false",
      evenCCD: "false",
      evenEC: "false",
      evenSI: "false",

      ativos1: {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: []
      },

      ativos2: {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: []
      },
      selectAll: false,
      periodo: 1,
      criando: false
    };
  },

  components: {
    cursoDiurno,
    cursoNoturno,
    horarioEletivas
  },

  methods: {
    defineSelectAll() {
      if (this.cursos.length === 5) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },

    distoggleAll() {
      if (this.cursos.length !== 0) {
        this.cursos = [];
      }
    },
    toggleAll() {
      if (this.cursos.length !== 5) this.cursos = [1, 2, 3, 4, 5];
    },
    isEven(number) {
      if (number % 2 === 0) return "true";
      else return "false";
    },

    emptyTurmas() {
      this.ativos1 = {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: []
      };

      this.ativos2 = {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: []
      };
    },

    filterTurmas: function(t) {
      var check = false;
      for (var turma in this.ativos1.CCN) {
        if (turma.id === t.id) check = true;
      }
      return check;
    },

    checkTurmaHorario(turma, horario) {
      if (turma.Horario1 == horario || turma.Horario2 == horario) {
        return true;
      } else return false;
    },
    createHorarios: function() {
      this.criando = true;
      var periodoSelecionado = parseInt(this.periodo, 10);
      this.emptyTurmas();
      if (periodoSelecionado === 1) {
        this.createHorarios1();
      } else if (periodoSelecionado === 2) {
        this.createHorarios2();
      } else {
        this.createHorarios1();
        this.createHorarios2();
      }
      this.$refs.modalCursos.hide();
    },

    createHorarios1: function() {
      var grade;
      var grades;
      var inicio = 1;
      var fim;
      var pedidos;
      var pedidosExternos;
      var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades;
      var turmas = _.filter(this.$store.state.turma.Turmas, ["periodo", 1]);
      var turmasExternas = this.$store.state.turmaExterna.Turmas;
      var anoAtual = this.$store.state.plano.Plano[0].ano;
      var semestreAtual = 1;

      if (this.$store.state.curso.Cursos[0].semestreInicial == 1) {
        this.evenCCN = "false";
      } else if (this.$store.state.curso.Cursos[0].semestreInicial == 2) {
        this.evenCCN = "true";
      }

      if (this.$store.state.curso.Cursos[1].semestreInicial == 1) {
        this.evenEC = "false";
      } else if (this.$store.state.curso.Cursos[1].semestreInicial == 2) {
        this.evenEC = "true";
      }

      if (this.$store.state.curso.Cursos[2].semestreInicial == 1) {
        this.evenSI = "false";
      } else if (this.$store.state.curso.Cursos[2].semestreInicial == 2) {
        this.evenSI = "true";
      }

      if (this.$store.state.curso.Cursos[3].semestreInicial == 1) {
        this.evenCCD = "false";
      } else if (this.$store.state.curso.Cursos[3].semestreInicial == 2) {
        this.evenCCD = "true";
      }

      //CC Diurno está selecionado
      if (_.indexOf(this.cursos, 1) > -1) {
        grades = _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
        grades = _.orderBy(grades, "periodoInicio", "desc");
        pedidos = [];
        for (var t in this.$store.state.pedido.Pedidos) {
          for (var pedido in this.$store.state.pedido.Pedidos[t]) {
            if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 4) {
              pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
            }
          }
        }
        pedidosExternos = [];
        for (let t in this.$store.state.pedidoExterno.Pedidos) {
          for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
            if (
              this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 4
            ) {
              pedidosExternos.push(
                this.$store.state.pedidoExterno.Pedidos[t][pedido]
              );
            }
          }
        }

        for (var i = 0; i < grades.length && inicio <= 10; i++) {
          //grade
          grade = grades[i].id;
          //inicio
          if (i === 0) inicio = 1;
          else inicio = fim + 1;
          //fim
          if (i + 1 === grades.length) fim = 10;
          else if (i == 0)
            fim =
              1 +
              2 *
                (parseInt(anoAtual, 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(semestreAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          else
            fim =
              inicio -
              1 +
              2 *
                (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          for (var k = 0; k < disciplinaGrades.length; k++) {
            if (
              disciplinaGrades[k].Grade == grade &&
              this.isEven(disciplinaGrades[k].periodo) == this.evenCCD &&
              disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
              disciplinaGrades[k].periodo <= parseInt(fim, 10)
            ) {
              for (var j = 0; j < turmas.length; j++) {
                if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                  for (var p = 0; p < pedidos.length; p++) {
                    if (
                      pedidos[p].vagasPeriodizadas > 0 &&
                      pedidos[p].Turma == turmas[j].id
                    ) {
                      this.ativos1.CCD[disciplinaGrades[k].periodo - 1].push(
                        turmas[j]
                      );
                    }
                  }
                }
              }
              for (var j = 0; j < turmasExternas.length; j++) {
                if (
                  turmasExternas[j].periodo == 1 &&
                  turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
                ) {
                  for (var p = 0; p < pedidosExternos.length; p++) {
                    if (
                      pedidosExternos[p].vagasPeriodizadas > 0 &&
                      pedidosExternos[p].Turma == turmasExternas[j].id
                    ) {
                      this.ativos1.CCD[disciplinaGrades[k].periodo - 1].push(
                        turmasExternas[j]
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }

      //CC Noturno está selecionado
      if (_.indexOf(this.cursos, 2) > -1) {
        grades = _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
        grades = _.orderBy(grades, "periodoInicio", "desc");
        pedidos = [];
        for (var t in this.$store.state.pedido.Pedidos) {
          for (var pedido in this.$store.state.pedido.Pedidos[t]) {
            if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 1) {
              pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
            }
          }
        }
        pedidosExternos = [];
        for (let t in this.$store.state.pedidoExterno.Pedidos) {
          for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
            if (
              this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 1
            ) {
              pedidosExternos.push(
                this.$store.state.pedidoExterno.Pedidos[t][pedido]
              );
            }
          }
        }
        for (var i = 0; i < grades.length && inicio <= 10; i++) {
          //grade
          grade = grades[i].id;
          //inicio
          if (i === 0) inicio = 1;
          else inicio = fim + 1;
          //fim
          if (i + 1 === grades.length) fim = 10;
          else if (i == 0)
            fim =
              1 +
              2 *
                (parseInt(anoAtual, 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(semestreAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          else
            fim =
              inicio -
              1 +
              2 *
                (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          for (var k = 0; k < disciplinaGrades.length; k++) {
            if (
              disciplinaGrades[k].Grade == grade &&
              this.isEven(disciplinaGrades[k].periodo) == this.evenCCN &&
              disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
              disciplinaGrades[k].periodo <= parseInt(fim, 10)
            ) {
              for (var j = 0; j < turmas.length; j++) {
                if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                  for (var p = 0; p < pedidos.length; p++) {
                    if (
                      pedidos[p].vagasPeriodizadas > 0 &&
                      pedidos[p].Turma == turmas[j].id
                    ) {
                      this.ativos1.CCN[disciplinaGrades[k].periodo - 1].push(
                        turmas[j]
                      );
                    }
                  }
                }
              }
              for (var j = 0; j < turmasExternas.length; j++) {
                if (
                  turmasExternas[j].periodo == 1 &&
                  turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
                ) {
                  for (var p = 0; p < pedidosExternos.length; p++) {
                    if (
                      pedidosExternos[p].vagasPeriodizadas > 0 &&
                      pedidosExternos[p].Turma == turmasExternas[j].id
                    ) {
                      this.ativos1.CCN[disciplinaGrades[k].periodo - 1].push(
                        turmasExternas[j]
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }

      //SI está selecionado
      if (_.indexOf(this.cursos, 3) > -1) {
        grades = _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
        grades = _.orderBy(grades, "periodoInicio", "desc");
        pedidos = [];
        for (var t in this.$store.state.pedido.Pedidos) {
          for (var pedido in this.$store.state.pedido.Pedidos[t]) {
            if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 3) {
              pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
            }
          }
        }
        pedidosExternos = [];
        for (let t in this.$store.state.pedidoExterno.Pedidos) {
          for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
            if (
              this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 3
            ) {
              pedidosExternos.push(
                this.$store.state.pedidoExterno.Pedidos[t][pedido]
              );
            }
          }
        }
        for (var i = 0; i < grades.length && inicio <= 10; i++) {
          //grade
          grade = grades[i].id;
          //inicio
          if (i === 0) inicio = 1;
          else inicio = fim + 1;
          //fim
          if (i + 1 === grades.length) fim = 10;
          else if (i == 0)
            fim =
              1 +
              2 *
                (parseInt(anoAtual, 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(semestreAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          else
            fim =
              inicio -
              1 +
              2 *
                (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          for (var k = 0; k < disciplinaGrades.length; k++) {
            if (
              disciplinaGrades[k].Grade == grade &&
              this.isEven(disciplinaGrades[k].periodo) == this.evenSI &&
              disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
              disciplinaGrades[k].periodo <= parseInt(fim, 10)
            ) {
              for (var j = 0; j < turmas.length; j++) {
                if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                  for (var p = 0; p < pedidos.length; p++) {
                    if (
                      pedidos[p].vagasPeriodizadas > 0 &&
                      pedidos[p].Turma == turmas[j].id
                    ) {
                      this.ativos1.SI[disciplinaGrades[k].periodo - 1].push(
                        turmas[j]
                      );
                    }
                  }
                }
              }
              for (var j = 0; j < turmasExternas.length; j++) {
                if (
                  turmasExternas[j].periodo == 1 &&
                  turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
                ) {
                  for (var p = 0; p < pedidosExternos.length; p++) {
                    if (
                      pedidosExternos[p].vagasPeriodizadas > 0 &&
                      pedidosExternos[p].Turma == turmasExternas[j].id
                    ) {
                      this.ativos1.SI[disciplinaGrades[k].periodo - 1].push(
                        turmasExternas[j]
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }

      //Engenharia Computacional está selecionado
      if (_.indexOf(this.cursos, 4) > -1) {
        grades = _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
        grades = _.orderBy(grades, "periodoInicio", "desc");
        pedidos = [];
        for (var t in this.$store.state.pedido.Pedidos) {
          for (var pedido in this.$store.state.pedido.Pedidos[t]) {
            if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 2) {
              pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
            }
          }
        }
        pedidosExternos = [];
        for (let t in this.$store.state.pedidoExterno.Pedidos) {
          for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
            if (
              this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 2
            ) {
              pedidosExternos.push(
                this.$store.state.pedidoExterno.Pedidos[t][pedido]
              );
            }
          }
        }
        for (var i = 0; i < grades.length && inicio <= 10; i++) {
          //grade
          grade = grades[i].id;
          //inicio
          if (i === 0) inicio = 1;
          else inicio = fim + 1;
          //fim
          if (i + 1 === grades.length) fim = 10;
          else if (i == 0)
            fim =
              1 +
              2 *
                (parseInt(anoAtual, 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(semestreAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          else
            fim =
              inicio -
              1 +
              2 *
                (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          for (var k = 0; k < disciplinaGrades.length; k++) {
            if (
              disciplinaGrades[k].Grade == grade &&
              this.isEven(disciplinaGrades[k].periodo) == this.evenEC &&
              disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
              disciplinaGrades[k].periodo <= parseInt(fim, 10)
            ) {
              for (var j = 0; j < turmas.length; j++) {
                if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                  for (var p = 0; p < pedidos.length; p++) {
                    if (
                      pedidos[p].vagasPeriodizadas > 0 &&
                      pedidos[p].Turma == turmas[j].id
                    ) {
                      this.ativos1.EC[disciplinaGrades[k].periodo - 1].push(
                        turmas[j]
                      );
                    }
                  }
                }
              }
              for (var j = 0; j < turmasExternas.length; j++) {
                if (
                  turmasExternas[j].periodo == 1 &&
                  turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
                ) {
                  for (var p = 0; p < pedidosExternos.length; p++) {
                    if (
                      pedidosExternos[p].vagasPeriodizadas > 0 &&
                      pedidosExternos[p].Turma == turmasExternas[j].id
                    ) {
                      this.ativos1.EC[disciplinaGrades[k].periodo - 1].push(
                        turmasExternas[j]
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }
      //Eletivas está selecionado:
      var eletiva = true;
      if (_.indexOf(this.cursos, 5) > -1) {
        for (var t = 0; t < turmas.length; t++) {
          for (var d = 0; d < disciplinaGrades.length; d++) {
            if (turmas[t].Disciplina === disciplinaGrades[d].Disciplina) {
              eletiva = false;
            }
          }
          if (eletiva) {
            this.ativos1.Eletivas.push(turmas[t]);
          } else {
            eletiva = true;
          }
        }
      }

      this.$store.commit("redefinirAtivas1", { Ativas: this.ativos1 });
    },

    createHorarios2: function() {
      var grade;
      var grades;
      var inicio = 1;
      var fim;
      var pedidos;
      var pedidosExternos;
      var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades;
      var turmas = _.filter(this.$store.state.turma.Turmas, ["periodo", 3]);
      var turmasExternas = this.$store.state.turmaExterna.Turmas;
      var anoAtual = this.$store.state.plano.Plano[0].ano;
      var semestreAtual = 1;

      if (this.$store.state.curso.Cursos[0].semestreInicial == 1) {
        this.evenCCN = "true";
      } else if (this.$store.state.curso.Cursos[0].semestreInicial == 2) {
        this.evenCCN = "false";
      }

      if (this.$store.state.curso.Cursos[1].semestreInicial == 1) {
        this.evenEC = "true";
      } else if (this.$store.state.curso.Cursos[1].semestreInicial == 2) {
        this.evenEC = "false";
      }

      if (this.$store.state.curso.Cursos[2].semestreInicial == 1) {
        this.evenSI = "true";
      } else if (this.$store.state.curso.Cursos[2].semestreInicial == 2) {
        this.evenSI = "false";
      }

      if (this.$store.state.curso.Cursos[3].semestreInicial == 1) {
        this.evenCCD = "true";
      } else if (this.$store.state.curso.Cursos[3].semestreInicial == 2) {
        this.evenCCD = "false";
      }

      //CC Diurno está selecionado
      if (_.indexOf(this.cursos, 1) > -1) {
        grades = _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
        grades = _.orderBy(grades, "periodoInicio", "desc");
        pedidos = [];
        for (var t in this.$store.state.pedido.Pedidos) {
          for (var pedido in this.$store.state.pedido.Pedidos[t]) {
            if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 4) {
              pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
            }
          }
        }
        pedidosExternos = [];
        for (let t in this.$store.state.pedidoExterno.Pedidos) {
          for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
            if (
              this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 4
            ) {
              pedidosExternos.push(
                this.$store.state.pedidoExterno.Pedidos[t][pedido]
              );
            }
          }
        }
        for (var i = 0; i < grades.length && inicio <= 10; i++) {
          //grade
          grade = grades[i].id;
          //inicio
          if (i === 0) inicio = 1;
          else inicio = fim + 1;
          //fim
          if (i + 1 === grades.length) fim = 10;
          else if (i == 0)
            fim =
              1 +
              2 *
                (parseInt(anoAtual, 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(semestreAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          else
            fim =
              inicio -
              1 +
              2 *
                (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          for (var k = 0; k < disciplinaGrades.length; k++) {
            if (
              disciplinaGrades[k].Grade == grade &&
              this.isEven(disciplinaGrades[k].periodo) == this.evenCCD &&
              disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
              disciplinaGrades[k].periodo <= parseInt(fim, 10)
            ) {
              for (var j = 0; j < turmas.length; j++) {
                if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                  for (var p = 0; p < pedidos.length; p++) {
                    if (
                      pedidos[p].vagasPeriodizadas > 0 &&
                      pedidos[p].Turma == turmas[j].id
                    ) {
                      this.ativos2.CCD[disciplinaGrades[k].periodo - 1].push(
                        turmas[j]
                      );
                    }
                  }
                }
              }
              for (var j = 0; j < turmasExternas.length; j++) {
                if (
                  turmasExternas[j].periodo == 3 &&
                  turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
                ) {
                  for (var p = 0; p < pedidosExternos.length; p++) {
                    if (
                      pedidosExternos[p].vagasPeriodizadas > 0 &&
                      pedidosExternos[p].Turma == turmasExternas[j].id
                    ) {
                      this.ativos2.CCD[disciplinaGrades[k].periodo - 1].push(
                        turmasExternas[j]
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }

      //CC Noturno está selecionado
      if (_.indexOf(this.cursos, 2) > -1) {
        grades = _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
        grades = _.orderBy(grades, "periodoInicio", "desc");
        pedidos = [];
        for (var t in this.$store.state.pedido.Pedidos) {
          for (var pedido in this.$store.state.pedido.Pedidos[t]) {
            if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 1) {
              pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
            }
          }
        }
        pedidosExternos = [];
        for (let t in this.$store.state.pedidoExterno.Pedidos) {
          for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
            if (
              this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 1
            ) {
              pedidosExternos.push(
                this.$store.state.pedidoExterno.Pedidos[t][pedido]
              );
            }
          }
        }
        for (var i = 0; i < grades.length && inicio <= 10; i++) {
          //grade
          grade = grades[i].id;
          //inicio
          if (i === 0) inicio = 1;
          else inicio = fim + 1;
          //fim
          if (i + 1 === grades.length) fim = 10;
          else if (i == 0)
            fim =
              1 +
              2 *
                (parseInt(anoAtual, 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(semestreAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          else
            fim =
              inicio -
              1 +
              2 *
                (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          for (var k = 0; k < disciplinaGrades.length; k++) {
            if (
              disciplinaGrades[k].Grade == grade &&
              this.isEven(disciplinaGrades[k].periodo) == this.evenCCN &&
              disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
              disciplinaGrades[k].periodo <= parseInt(fim, 10)
            ) {
              for (var j = 0; j < turmas.length; j++) {
                if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                  for (var p = 0; p < pedidos.length; p++) {
                    if (
                      pedidos[p].vagasPeriodizadas > 0 &&
                      pedidos[p].Turma == turmas[j].id
                    ) {
                      this.ativos2.CCN[disciplinaGrades[k].periodo - 1].push(
                        turmas[j]
                      );
                    }
                  }
                }
              }
              for (var j = 0; j < turmasExternas.length; j++) {
                if (
                  turmasExternas[j].periodo == 3 &&
                  turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
                ) {
                  for (var p = 0; p < pedidosExternos.length; p++) {
                    if (
                      pedidosExternos[p].vagasPeriodizadas > 0 &&
                      pedidosExternos[p].Turma == turmasExternas[j].id
                    ) {
                      this.ativos2.CCN[disciplinaGrades[k].periodo - 1].push(
                        turmasExternas[j]
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }

      //SI está selecionado
      if (_.indexOf(this.cursos, 3) > -1) {
        grades = _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
        grades = _.orderBy(grades, "periodoInicio", "desc");
        pedidos = [];
        for (var t in this.$store.state.pedido.Pedidos) {
          for (var pedido in this.$store.state.pedido.Pedidos[t]) {
            if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 3) {
              pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
            }
          }
        }
        pedidosExternos = [];
        for (let t in this.$store.state.pedidoExterno.Pedidos) {
          for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
            if (
              this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 3
            ) {
              pedidosExternos.push(
                this.$store.state.pedidoExterno.Pedidos[t][pedido]
              );
            }
          }
        }
        for (var i = 0; i < grades.length && inicio <= 10; i++) {
          //grade
          grade = grades[i].id;
          //inicio
          if (i === 0) inicio = 1;
          else inicio = fim + 1;
          //fim
          if (i + 1 === grades.length) fim = 10;
          else if (i == 0)
            fim =
              1 +
              2 *
                (parseInt(anoAtual, 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(semestreAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          else
            fim =
              inicio -
              1 +
              2 *
                (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          for (var k = 0; k < disciplinaGrades.length; k++) {
            if (
              disciplinaGrades[k].Grade == grade &&
              this.isEven(disciplinaGrades[k].periodo) == this.evenSI &&
              disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
              disciplinaGrades[k].periodo <= parseInt(fim, 10)
            ) {
              for (var j = 0; j < turmas.length; j++) {
                if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                  for (var p = 0; p < pedidos.length; p++) {
                    if (
                      pedidos[p].vagasPeriodizadas > 0 &&
                      pedidos[p].Turma == turmas[j].id
                    ) {
                      this.ativos2.SI[disciplinaGrades[k].periodo - 1].push(
                        turmas[j]
                      );
                    }
                  }
                }
              }
              for (var j = 0; j < turmasExternas.length; j++) {
                if (
                  turmasExternas[j].periodo == 3 &&
                  turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
                ) {
                  for (var p = 0; p < pedidosExternos.length; p++) {
                    if (
                      pedidosExternos[p].vagasPeriodizadas > 0 &&
                      pedidosExternos[p].Turma == turmasExternas[j].id
                    ) {
                      this.ativos2.SI[disciplinaGrades[k].periodo - 1].push(
                        turmasExternas[j]
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }

      //Engenharia Computacional está selecionado
      if (_.indexOf(this.cursos, 4) > -1) {
        grades = _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
        grades = _.orderBy(grades, "periodoInicio", "desc");
        pedidos = [];
        for (var t in this.$store.state.pedido.Pedidos) {
          for (var pedido in this.$store.state.pedido.Pedidos[t]) {
            if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 2) {
              pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
            }
          }
        }
        pedidosExternos = [];
        for (let t in this.$store.state.pedidoExterno.Pedidos) {
          for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
            if (
              this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 2
            ) {
              pedidosExternos.push(
                this.$store.state.pedidoExterno.Pedidos[t][pedido]
              );
            }
          }
        }
        for (var i = 0; i < grades.length && inicio <= 10; i++) {
          //grade
          grade = grades[i].id;
          //inicio
          if (i === 0) inicio = 1;
          else inicio = fim + 1;
          //fim
          if (i + 1 === grades.length) fim = 10;
          else if (i == 0)
            fim =
              1 +
              2 *
                (parseInt(anoAtual, 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(semestreAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          else
            fim =
              inicio -
              1 +
              2 *
                (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                  parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
              (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
                parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
                2;
          for (var k = 0; k < disciplinaGrades.length; k++) {
            if (
              disciplinaGrades[k].Grade == grade &&
              this.isEven(disciplinaGrades[k].periodo) == this.evenEC &&
              disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
              disciplinaGrades[k].periodo <= parseInt(fim, 10)
            ) {
              for (var j = 0; j < turmas.length; j++) {
                if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                  for (var p = 0; p < pedidos.length; p++) {
                    if (
                      pedidos[p].vagasPeriodizadas > 0 &&
                      pedidos[p].Turma == turmas[j].id
                    ) {
                      this.ativos2.EC[disciplinaGrades[k].periodo - 1].push(
                        turmas[j]
                      );
                    }
                  }
                }
              }
              for (var j = 0; j < turmasExternas.length; j++) {
                if (
                  turmasExternas[j].periodo == 3 &&
                  turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
                ) {
                  for (var p = 0; p < pedidosExternos.length; p++) {
                    if (
                      pedidosExternos[p].vagasPeriodizadas > 0 &&
                      pedidosExternos[p].Turma == turmasExternas[j].id
                    ) {
                      this.ativos2.EC[disciplinaGrades[k].periodo - 1].push(
                        turmasExternas[j]
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }
      //Eletivas está selecionado:
      var eletiva = true;
      if (_.indexOf(this.cursos, 5) > -1) {
        for (var t = 0; t < turmas.length; t++) {
          for (var d = 0; d < disciplinaGrades.length; d++) {
            if (turmas[t].Disciplina === disciplinaGrades[d].Disciplina) {
              eletiva = false;
            }
          }
          if (eletiva) {
            this.ativos2.Eletivas.push(turmas[t]);
          } else {
            eletiva = true;
          }
        }
      }

      this.$store.commit("redefinirAtivas2", { Ativas: this.ativos2 });
    },

    horarioVazio(curso) {
      if (curso.length != 0) return true;
      else return false;
    },

    checkPeriodo(turma, periodo) {
      for (
        var g = 0;
        g < this.$store.state.disciplinaGrade.DisciplinaGrades.length;
        g++
      ) {
        if (
          this.$store.state.disciplinaGrade.DisciplinaGrades[g].Disciplina ==
            turma &&
          this.$store.state.disciplinaGrade.DisciplinaGrades[g].periodo ==
            periodo
        ) {
          return true;
        }
      }
    },

    updateHorarios() {
      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < this.ativos1.CCD[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos1.CCD[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos1.CCD[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (var j = 0; j < this.ativos1.CCN[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos1.CCN[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos1.CCN[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (var j = 0; j < this.ativos1.EC[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos1.EC[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos1.EC[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (var j = 0; j < this.ativos1.SI[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos1.SI[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos1.SI[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
      }

      this.$store.commit("redefinirAtivas1", { Ativas: this.ativos1 });

      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < this.ativos2.CCD[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos2.CCD[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos2.CCD[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (var j = 0; j < this.ativos2.CCN[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos2.CCN[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos2.CCN[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (var j = 0; j < this.ativos2.EC[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos2.EC[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos2.EC[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (var j = 0; j < this.ativos2.SI[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos2.SI[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos2.SI[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
      }

      this.$store.commit("redefinirAtivas1", { Ativas2: this.ativos2 });

      this.$store.commit("redefinirAtivas2", { Ativas: this.ativos2 });
    }
  },

  computed: {
    Grades() {
      return this.$store.state.grade.Grades;
    },

    Cursos() {
      return this.$store.state.curso.Cursos;
    },

    Turmas() {
      return this.$store.state.turma.Turmas;
    },

    Disciplinas() {
      return this.$store.state.disciplina.Disciplinas;
    },

    DisciplinaGrades() {
      return this.$store.state.disciplinaGrade.DisciplinaGrades;
    },

    GradesCCD() {
      return _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
    },

    GradesCCN() {
      return _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
    },
    GradesSI() {
      return _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
    },

    GradesEC() {
      return _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
    },

    activeCCD() {
      return _.indexOf(this.cursos, 1) > -1;
    },

    activeCCN() {
      return _.indexOf(this.cursos, 2) > -1;
    },

    activeSI() {
      return _.indexOf(this.cursos, 3) > -1;
    },

    activeEC() {
      return _.indexOf(this.cursos, 4) > -1;
    },

    activeEletivas() {
      return _.indexOf(this.cursos, 5) > -1;
    },

    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    },

    CursosSelecionados() {
      return this.cursos.length;
    }
  },

  watch: {
    Turmas(newTurmas, oldTurmas) {
      this.updateHorarios();
    },

    CursosSelecionados: function() {
      if (this.cursos.length === 5) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    }
  }
};
</script>

<style scoped>
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

.DashboardHorarios {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}
h4 {
  text-align: start !important;
  font-size: 12px !important;
  font-weight: bold !important;
}
.title {
  clear: both;
  display: block;
  padding-top: 0px;
  text-align: start !important;
}

h3 {
  font-weight: bold;
  font-size: 20px;
  text-align: center !important;
}
h4 {
  font-size: 12px !important;
  font-weight: bold !important;
}
h5 {
  font-size: 12px;
  font-weight: normal;
}

.input-group-text {
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
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  justify-content: center;
  margin-bottom: 0;
  /*===*/
  max-width: 70px;
  min-width: 70px;
  height: 25px !important;
  margin-left: -5px;
  padding-left: 15px;
  font-size: 12px !important;
}
.form-control {
  height: 25px !important;
  font-size: 12px !important;
  padding: 0px 0px 0px 5px !important;
  min-width: 100px;
  max-width: 100px;
  text-align: start;
}
.form-inline .input-group,
.form-inline {
  width: auto;
}
.tabelas {
  overflow-y: auto;
  overflow-x: hidden;
  height: -webkit-calc(100vh - 85px);
  height: -moz-calc(100vh - 85px);
  height: calc(100vh - 85px);
}

.listas {
  line-height: 30px;
  font-size: 12px;
  text-align: justify;
  line-height: inherit;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
}
strong {
  color: #007bff;
}
i.fas,
i.far {
  font-size: 25px;
}

.relatbtn {
  background-color: white;
  color: #9ab3ff !important;
  float: right;
}
.relatbtn:hover {
  color: #82a0ff !important;
  background-color: white;
}
.relatbtn:focus {
  color: #82a0ff;
  background-color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #698dff;
}

.addbtn {
  background-color: white;
  color: #a0e7a0;
}
.addbtn:hover {
  background-color: white;
  color: #77dd77;
}
.addbtn:focus {
  color: #77dd77;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #2fbf53;
}

.cancelbtn {
  background-color: white;
  color: #cfcfc4;
}
.cancelbtn:hover {
  background-color: white;
  color: #b8b4a8;
}

.cancelbtn:focus {
  background-color: white;
  color: #b8b8a8;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ada89a;
}
button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  margin-right: 15px;
  margin-top: 5px;
  margin-bottom: 0px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
}

.modal-table {
  display: block !important;
  overflow: auto !important;
  font-size: 11px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
}
tbody {
  max-height: 100%;
  width: 100%;
}
table td {
  text-align: center;
  vertical-align: middle !important;
  padding: 0 !important;
  font-size: 10px !important;
}
tr thead {
  display: block;
}
th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center !important;
  height: 18px !important;
}
.p-header {
  padding: 0 5px 0 5px !important;
  margin: 0 !important;
  font-size: 11px !important;
  text-align: center;
  height: 18px;
}
table p {
  margin-bottom: 0 !important;
  text-align: center;
  padding-right: 5px !important;
  padding-left: 5px !important;
  font-size: 10px !important;
}
table input[type="checkbox"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
}

.clickable-header {
  cursor: pointer;
  padding-left: 5px;
}

.form-control {
  height: 25px !important;
  font-size: 12px !important;
  padding: 2px 5px 0px 5px !important;
  min-width: 80px;
  max-width: 80px;
  text-align: start;
}
.form-group {
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 0;
}
.form-inline .input-group,
.form-inline {
  width: auto;
}

/* BOTOÕES MODALS */

.btn-df {
  font-size: 12px;
  height: 25px;
  min-width: -webkit-max-content;
  min-width: -moz-max-content;
  min-width: max-content;
  max-width: -webkit-max-content;
  max-width: -moz-max-content;
  max-width: max-content;
  padding: 0 5px 0 5px;
}
.btn-azul {
  background-color: #718de0 !important;
  border-color: #9ab3ff !important;
}
.btn-azul:hover {
  background-color: rgb(74, 101, 190) !important;
  border-color: #82a0ff !important;
}

.btn-azul:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(122, 128, 124, 0.5) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
}

.btn-cinza {
  background-color: #999999 !important;
  border-color: #c3c3c3 !important;
}
.btn-cinza:hover {
  background-color: #747474 !important;
  border-color: #aaaaaa !important;
}

.btn-cinza:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
  box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
}
.btn-verde {
  background-color: #70b670 !important;
  border-color: #a0e7a0 !important;
}
.btn-verde:hover {
  background-color: #4c8a4c !important;
  border-color: #77dd77 !important;
}

.btn-verde:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
}
/*  */

@media screen and (max-width: 430px) {
  .div-titulo {
    height: 70px !important;
  }
}
</style>