<template>
  <div class="main-component row p-0">
    <portal to="page-header">
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="relatorio" @click="toggleAsideModal('relatorio')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </portal>

    <div class="div-table">
      <BaseTable>
        <template #thead-root>
          <div class="sticky-row-top">
            <tr>
              <v-th colspan="9" />
              <template v-if="filtroPeriodos.ativados.length">
                <v-th width="78" paddingX="0" title="Vagas SIPlanWeb">V. SIPlanWeb</v-th>
                <v-th colspan="2" paddingX="0" title="Vagas SIGA">V. SIGA</v-th>
              </template>
            </tr>
            <tr>
              <v-th-ordination
                :currentOrder="ordenacaoMain.disciplinas"
                orderToCheck="codigo"
                width="80"
              >
                Código
              </v-th-ordination>
              <v-th-ordination
                :currentOrder="ordenacaoMain.disciplinas"
                orderToCheck="nome"
                width="350"
                align="start"
              >
                Nome
              </v-th-ordination>
              <v-th-ordination
                :currentOrder="ordenacaoMain.disciplinas"
                orderToCheck="perfil.abreviacao"
                width="80"
                align="center"
              >
                Perfil
              </v-th-ordination>
              <v-th width="30" title="Créditos">C.</v-th>
              <v-th width="30" title="Período letivo">P.</v-th>
              <v-th width="35" title="Turma">T.</v-th>
              <v-th width="150">Docentes</v-th>
              <v-th width="130">Horário</v-th>

              <template v-if="filtroPeriodos.ativados.length">
                <v-th width="65" paddingX="0" :title="theadTitle.creditos">T. Créditos</v-th>
                <v-th width="78" paddingX="0" :title="theadTitle.vagas">Grade+Extra</v-th>
                <v-th width="78" paddingX="0" :title="theadTitle.vagasOferecidas">Oferecidas</v-th>
                <v-th width="78" paddingX="0" :title="theadTitle.vagasOferecidas">Ocupadas</v-th>
              </template>
            </tr>
          </div>
        </template>

        <template #tbody>
          <template v-if="DisciplinasDataOrdered.length">
            <tr class="tr-totais">
              <v-td colspan="1" />
              <v-td width="350" align="start">TOTAIS</v-td>
              <v-td colspan="6" />
              <v-td width="65">{{ totalsSummation.creditos }}</v-td>
              <v-td width="78">{{ totalsSummation.vagas }}</v-td>
              <v-td width="78">{{ totalsSummation.vagasOferecidas }}</v-td>
              <v-td width="78">{{ totalsSummation.vagasOcupadas }}</v-td>
            </tr>

            <template v-for="disciplina in DisciplinasDataOrdered">
              <tr :key="disciplina.id + disciplina.codigo" class="bg-custom">
                <v-td width="80">{{ disciplina.codigo }}</v-td>
                <v-td width="350" align="start">{{ disciplina.nome }}</v-td>
                <v-td width="80">{{ disciplina.perfil.abreviacao }}</v-td>
                <v-td width="30">{{ disciplina.creditoTotal }}</v-td>
                <v-td colspan="4" />
                <v-td width="65">{{ disciplina.totalCreditos }}</v-td>
                <v-td width="78">{{ disciplina.totalVagas }}</v-td>
                <v-td width="78">{{ disciplina.totalVagasOferecidas }}</v-td>
                <v-td width="78">{{ disciplina.totalVagasOcupadas }}</v-td>
              </tr>

              <tr v-for="turma in disciplina.turmas" :key="turma.id + turma.letra">
                <v-td width="80" />
                <v-td width="350" />
                <v-td width="80" />
                <v-td width="30" />
                <v-td width="30">{{ turma.periodo }}</v-td>
                <v-td width="35" paddingX="0">{{ turma.letra }}</v-td>
                <v-td width="150" paddingX="0">
                  {{ generateDocentesText(turma.Docente1, turma.Docente2) }}
                </v-td>
                <v-td width="130" paddingX="0">
                  {{ generateHorariosText(turma.Horario1, turma.Horario2) }}
                </v-td>
                <v-td width="65" />

                <template v-if="filtroPeriodos.ativados.length">
                  <v-td
                    width="78"
                    class="td-vagas clickable"
                    @click="handleClickInTurmaVaga(turma)"
                  >
                    {{ turma.vagas }}
                  </v-td>
                  <v-td
                    width="78"
                    class="td-vagas clickable"
                    @click="handleClickInTurmaVaga(turma)"
                  >
                    {{ turma.vagasOferecidas }}
                  </v-td>
                  <v-td
                    width="78"
                    class="td-vagas clickable"
                    @click="handleClickInTurmaVaga(turma)"
                  >
                    {{ turma.vagasOcupadas }}
                  </v-td>
                </template>
              </tr>
            </template>
          </template>

          <tr v-else>
            <v-td :width="`${filtroPeriodos.ativados.length ? 1165 : 885}`" class="border-right-0">
              <b>Nenhuma disciplina encontrada.</b>
              Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
              para selecioná-las.
            </v-td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Perfis'">
        <template #thead>
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoModal.perfis"
            orderToCheck="nome"
            width="425"
            align="start"
          >
            Nome
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="perfil in PerfisOptionsOrdered"
            :key="perfil.id + perfil.nome"
            @click.stop="selectPerfis(perfil)"
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroPerfis.selecionados"
                :value="perfil"
                :indeterminate.prop="perfil.halfChecked"
                @click.stop="selectPerfis(perfil)"
              />
            </v-td>
            <v-td width="425" align="start">{{ perfil.nome }}</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable
        type="modal"
        v-show="modalFiltrosTabs.current === 'Disciplinas'"
        :hasSearchBar="true"
      >
        <template #thead-search>
          <InputSearch
            v-model="searchDisciplinas"
            placeholder="Pesquise nome ou codigo de uma disciplina..."
          />
        </template>
        <template #thead>
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="codigo"
            width="70"
            align="start"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="nome"
            width="270"
            align="start"
          >
            Nome
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="perfil.abreviacao"
            width="85"
            align="start"
          >
            Perfil
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="disciplina in DisciplinasOptionsOrdered"
            :key="disciplina.id + disciplina.nome"
            @click="selectDisciplina(disciplina)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroDisciplinas.selecionados"
                :value="disciplina"
                @click.stop="selectDisciplina(disciplina)"
              />
            </v-td>
            <v-td width="70" align="start">{{ disciplina.codigo }}</v-td>
            <v-td align="start" width="270">
              {{ disciplina.nome }}
            </v-td>
            <v-td width="85" align="start">{{ disciplina.perfil.abreviacao }}</v-td>
          </tr>

          <tr v-if="!DisciplinasOptionsOrdered.length">
            <v-td colspan="3" width="450">NENHUMA DISCIPLINA ENCONTRADA.</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Períodos'">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Periodos Letivo</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="periodo in PeriodosOptions"
            :key="periodo.id + periodo.nome"
            @click="selecionaPeriodo(periodo, filtroPeriodos.selecionados)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroPeriodos.selecionados"
                :value="periodo"
                @click.stop="selecionaPeriodo(periodo)"
              />
            </v-td>
            <v-td width="425" align="start">{{ periodo.nome }}</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Semestres'">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Semestre Letivo</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="semestre in SemestresOptions"
            :key="semestre.id + semestre.nome"
            @click="selecionaSemestre(semestre)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroSemestres.selecionados"
                :value="semestre"
                :indeterminate.prop="semestre.halfChecked"
                @click.stop="selecionaSemestre(semestre)"
              />
            </v-td>
            <v-td width="425" align="start">{{ semestre.nome }}</v-td>
          </tr>
        </template>
      </BaseTable>
    </ModalFiltros>

    <ModalVagas ref="modalVagas" :turma="turmaClicked" />

    <ModalRelatorio ref="modalRelatorio" @selection-option="generatePdf($event)" />

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar plano:</b>
        Clique no ícone filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
        . Em seguida, utilize as abas para navegar entre os filtros. Selecione as informações que
        deseja visualizar e clique em OK.
      </li>
      <li class="list-group-item">
        <b>Relatório :</b>
        Clique no ícone relatório
        <font-awesome-icon :icon="['fas', 'file-alt']" class="icon-gray" />
        . Em seguida, indique se deseja gerar o relatório completo com todas as disciplinas ou o
        relatório parcial com as disciplinas exibidas na tela.
      </li>
      <li class="list-group-item">
        <b>Visualizar vagas por turma:</b>
        Clique no número de vagas desta turma, na última coluna da tabela, na linha correspondente.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { union, difference, orderBy, filter, some } from "lodash-es";
import { normalizeText } from "@/common/utils";
import {
  generateHorariosText,
  generateDocentesText,
  toggleAsideModal,
  conectaFiltroPerfisEDisciplinas,
  conectaFiltrosSemestresEPeriodos,
  preventClickSelection,
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalRelatorio, ModalAjuda, ModalFiltros } from "@/components/modals";
import ModalVagas from "./ModalVagas";

export default {
  name: "PlanoDepartamental",
  mixins: [
    generateHorariosText,
    generateDocentesText,
    toggleAsideModal,
    conectaFiltroPerfisEDisciplinas,
    conectaFiltrosSemestresEPeriodos,
    preventClickSelection,
  ],
  components: {
    ModalRelatorio,
    ModalFiltros,
    ModalAjuda,
    InputSearch,
    ModalVagas,
  },
  data() {
    return {
      turmaClicked: null,
      searchDisciplinas: "",
      asideModalsRefs: ["modalFiltros", "modalAjuda", "modalRelatorio"],
      ordenacaoMain: {
        disciplinas: { order: "codigo", type: "asc" },
      },
      ordenacaoModal: {
        perfis: { order: "nome", type: "asc" },
        disciplinas: { order: "codigo", type: "asc" },
      },
      filtroDisciplinas: {
        ativados: [],
        selecionados: [],
      },
      filtroPerfis: {
        selecionados: [],
      },
      filtroPeriodos: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        selecionados: [],
      },
      modalFiltrosTabs: {
        current: "Perfis",
        array: ["Perfis", "Disciplinas", "Períodos", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Perfis: () => {
            this.filtroDisciplinas.selecionados = [...this.DisciplinasOptions];
            this.filtroPerfis.selecionados = [...this.PerfisOptions];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = union(
              this.DisciplinasOptionsFiltered,
              this.filtroDisciplinas.selecionados
            );
            this.conectaDisciplinasEmPerfis();
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [...this.PeriodosOptions];
            this.filtroSemestres.selecionados = [...this.SemestresOptions];
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [...this.SemestresOptions];
            this.filtroPeriodos.selecionados = [...this.PeriodosOptions];
          },
        },
        selectNone: {
          Perfis: () => {
            this.filtroPerfis.selecionados = [];
            this.filtroDisciplinas.selecionados = [];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = difference(
              this.filtroDisciplinas.selecionados,
              this.DisciplinasOptionsFiltered
            );
            this.conectaDisciplinasEmPerfis();
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [];
            this.filtroSemestres.selecionados = [];
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [];
            this.filtroPeriodos.selecionados = [];
          },
        },
        btnOk: () => {
          this.filtroPeriodos.ativados = orderBy(this.filtroPeriodos.selecionados, "id");

          this.filtroDisciplinas.ativados = [...this.filtroDisciplinas.selecionados];
        },
      },
    };
  },

  beforeMount() {
    this.modalFiltrosCallbacks.selectAll.Periodos();
    this.modalFiltrosCallbacks.selectAll.Perfis();
    this.modalFiltrosCallbacks.selectAll.Disciplinas();
    this.modalFiltrosCallbacks.btnOk();
  },

  methods: {
    handleClickInTurmaVaga(turma) {
      this.turmaClicked = turma;
      this.$refs.modalVagas.open();
    },
    getVagasDaTurma(turmaId) {
      let vagas = 0;
      let vagasOferecidas = 0;
      let vagasOcupadas = 0;

      const pedidosDaTurma = this.Pedidos[turmaId];
      if (pedidosDaTurma) {
        vagas = pedidosDaTurma.reduce(
          (sum, pedido) => sum + pedido.vagasPeriodizadas + pedido.vagasNaoPeriodizadas,
          0
        );
      }

      const pedidosSIGADaTurma = this.AllPedidosSIGA[turmaId];
      if (pedidosSIGADaTurma) {
        pedidosSIGADaTurma.forEach((pedido) => {
          vagasOferecidas += pedido.vagasOferecidas;
          vagasOcupadas += pedido.vagasOcupadas;
        });
      }
      return { vagas, vagasOferecidas, vagasOcupadas };
    },

    generatePdf(completo) {
      import("@/services/pdfs/planoDepartamental").then(({ pdfPlanoDepartamental }) => {
        let disciplinasInTurmas = [];
        let periodosAtivos = [];
        if (completo) {
          disciplinasInTurmas = this.DisciplinasData;
          periodosAtivos = this.PeriodosOptions;
        } else {
          disciplinasInTurmas = this.DisciplinasDataFiltered;
          periodosAtivos = this.filtroPeriodos.ativados;
        }

        pdfPlanoDepartamental({
          disciplinasInTurmas,
          periodosAtivos,
          plano: this.currentPlano,
        });
      });
    },
  },

  computed: {
    ...mapGetters(["AllTurmas", "DisciplinasDCC", "PerfisDCC", "Pedidos", "AllPedidosSIGA"]),

    DisciplinasDataOrdered() {
      return orderBy(
        this.DisciplinasDataSummated,
        ["periodo", this.ordenacaoMain.disciplinas.order],
        ["asc", this.ordenacaoMain.disciplinas.type]
      );
    },
    DisciplinasDataSummated() {
      return this.DisciplinasDataFiltered.map((disciplina) => {
        const turmas = [];
        let totalVagas = 0;
        let totalVagasOferecidas = 0;
        let totalVagasOcupadas = 0;
        let totalCreditos = 0;

        disciplina.turmas.forEach((turma) => {
          if (turma.Disciplina === disciplina.id) {
            const { vagas, vagasOferecidas, vagasOcupadas } = this.getVagasDaTurma(turma.id);
            totalVagas += vagas;
            totalVagasOferecidas += vagasOferecidas;
            totalVagasOcupadas += vagasOcupadas;
            totalCreditos += turma.disciplina.creditoTotal;

            turmas.push({
              ...turma,
              vagas,
              vagasOferecidas,
              vagasOcupadas,
            });
          }
        });

        return {
          ...disciplina,
          turmas,
          totalCreditos,
          totalVagas,
          totalVagasOferecidas,
          totalVagasOcupadas,
        };
      });
    },
    DisciplinasDataFiltered() {
      const disciplinasFilteredByDisciplinas = this.DisciplinasData.filter((disciplina) =>
        some(this.filtroDisciplinas.ativados, ["id", disciplina.id])
      );

      const disciplinasFilteredByPeriodos = [];
      disciplinasFilteredByDisciplinas.forEach((disciplina) => {
        const turmasDaDisciplina = disciplina.turmas.filter((turma) =>
          some(this.filtroPeriodos.ativados, ["id", turma.periodo])
        );

        if (turmasDaDisciplina.length) {
          disciplinasFilteredByPeriodos.push({ ...disciplina, turmas: turmasDaDisciplina });
        }
      });

      return disciplinasFilteredByPeriodos;
    },
    DisciplinasData() {
      const turmasOrdered = orderBy(this.AllTurmas, "periodo");

      return this.DisciplinasDCC.map((disciplina) => {
        const turmasDaDisciplina = filter(turmasOrdered, ["Disciplina", disciplina.id]);
        return { ...disciplina, turmas: turmasDaDisciplina };
      });
    },
    totalsSummation() {
      let vagas = 0;
      let vagasOferecidas = 0;
      let vagasOcupadas = 0;
      let creditos = 0;

      this.DisciplinasDataSummated.forEach((disciplina) => {
        vagas += disciplina.totalVagas;
        vagasOferecidas += disciplina.totalVagasOferecidas;
        vagasOcupadas += disciplina.totalVagasOcupadas;
        creditos += disciplina.totalCreditos;
      });

      return { creditos, vagas, vagasOferecidas, vagasOcupadas };
    },
    theadTitle() {
      const { ativados: periodosAtivados } = this.filtroPeriodos;
      if (!periodosAtivados.length) {
        return {
          creditos: "",
          vagas: "",
          vagasOferecidas: "",
        };
      }

      let periodosText = "";
      periodosAtivados.forEach((periodo, index) => {
        periodosText += `${periodo.id}º`;
        if (index !== periodosAtivados.length - 1) periodosText += ", ";
      });

      return {
        creditos: `Total de créditos no ${periodosText} período`,
        vagas: `Total de vagas SIPlanWeb grade+extra no ${periodosText} período`,
        vagasOferecidas: `Total de vagas SIGA oferecidas no ${periodosText} período`,
        vagasOcupadas: `Total de vagas SIGA ocupadas no ${periodosText} período`,
      };
    },
    //Modal Options
    PerfisOptionsOrdered() {
      return orderBy(
        this.PerfisOptions,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },
    PerfisOptions() {
      return this.PerfisDCC.map((perfil) => {
        const todasDisciplinasDoPerfil = filter(this.DisciplinasOptions, ["Perfil", perfil.id]);
        const disciplinasSelecionadas = filter(this.filtroDisciplinas.selecionados, [
          "Perfil",
          perfil.id,
        ]);

        let halfChecked = false;
        if (todasDisciplinasDoPerfil.length === disciplinasSelecionadas.length) {
          halfChecked = false;
        } else if (disciplinasSelecionadas.length > 0) {
          halfChecked = true;
        }

        return {
          ...perfil,
          halfChecked,
        };
      });
    },
    DisciplinasOptionsOrdered() {
      return orderBy(
        this.DisciplinasOptionsFiltered,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasOptionsFiltered() {
      if (this.searchDisciplinas === "") return this.DisciplinasOptions;

      const searchNormalized = normalizeText(this.searchDisciplinas);

      return filter(this.DisciplinasOptions, (disciplina) => {
        const nome = normalizeText(disciplina.nome);
        const codigo = normalizeText(disciplina.codigo);

        return nome.match(searchNormalized) || codigo.match(searchNormalized);
      });
    },
    DisciplinasOptions() {
      return this.DisciplinasDCC;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/theme.scss";

td.td-vagas:hover {
  color: $clr-lightblue;
  text-decoration: underline;
}

.tr-totais {
  background-color: #cecece;
  &:hover {
    background-color: #cecece !important;
  }
}
</style>
