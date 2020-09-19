<template>
  <div class="main-component row p-0">
    <PageHeader :title="'Carga Professores'">
      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAsideModal('filtros')"
      >
        <font-awesome-icon :icon="['fas', 'list-ul']" />
      </BaseButton>

      <BaseButton
        title="Relatório"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAsideModal('relatorio')"
      >
        <font-awesome-icon :icon="['fas', 'file-alt']" />
      </BaseButton>

      <BaseButton
        title="Ajuda"
        :type="'icon'"
        :color="'lightblue'"
        @click="toggleAsideModal('ajuda')"
      >
        <font-awesome-icon :icon="['fas', 'question']" />
      </BaseButton>
    </PageHeader>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <th
            @click="toggleOrder(orednacaoDocentesMain, 'apelido')"
            style="width: 130px"
            class="clickable t-start"
          >
            Docente
            <i :class="setIconByOrder(orednacaoDocentesMain, 'apelido')"></i>
          </th>
          <th style="width: 30px" class="p-0" title="Período ou Trimestre">
            P./T.
          </th>
          <th style="width: 80px">Código</th>
          <th style="width: 300px" class="t-start">Disciplina</th>
          <th style="width: 35px" class="less-padding" title="Turma">T.</th>
          <th style="width: 130px">Horários</th>
          <th
            v-if="filtroSemestresEstaAtivo.primeiro"
            style="width: 35px"
            class="p-0"
            title="Somatório dos créditos no 1º semestre"
          >
            CS1
          </th>
          <th
            v-if="filtroSemestresEstaAtivo.segundo"
            style="width: 35px"
            class="p-0"
            title="Somatório dos créditos no 2º semestre"
          >
            CS2
          </th>
          <th
            v-if="
              filtroSemestresEstaAtivo.primeiro &&
                filtroSemestresEstaAtivo.segundo
            "
            style="width: 50px"
            class="p-0"
            title="Somatório total de créditos"
          >
            CTotal
          </th>
        </template>
        <template #tbody>
          <template v-if="algumFiltroEstaAtivo">
            <template v-for="docente in DocentesComTurmasECargasOrdered">
              <DocenteRow
                :key="docente.id + docente.nome"
                :docente="docente"
                :semestresAtivados="filtroSemestresEstaAtivo"
              />
              <DocenteTurmaRow
                v-for="turma in docente.turmas"
                :key="turma.id + turma.letra + docente.id"
                :turma="turma"
                :semestresAtivados="filtroSemestresEstaAtivo"
              />
              <DocenteCargaPosRow
                v-for="carga in docente.cargasPos"
                :key="carga.id + carga.programa + docente.id"
                :carga="carga"
                :semestresAtivados="filtroSemestresEstaAtivo"
              />
            </template>

            <template v-if="filtroDocenteSemAlocacaoEstaAtivo">
              <DocenteRow
                :docente="DocenteSemAlocacaoComTurmas"
                :semestresAtivados="filtroSemestresEstaAtivo"
              />
              <DocenteTurmaRow
                v-for="turma in DocenteSemAlocacaoComTurmas.turmas"
                :key="turma.id + turma.letra + turma.periodo"
                :turma="turma"
                :semestresAtivados="filtroSemestresEstaAtivo"
              />
            </template>
          </template>

          <tr v-show="!algumFiltroEstaAtivo">
            <td :style="`width:${emptyRowWidth}px`">
              <b>Nenhum docente encontrado.</b> Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
              para selecioná-los.
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <BaseTable
        v-show="modalFiltrosTabs.current === 'Docentes'"
        :type="'modal'"
        :hasSearchBar="true"
      >
        <template #thead-search>
          <InputSearch
            v-model="searchDocentes"
            placeholder="Pesquise pelo apelido de um docente..."
          />
        </template>
        <template #thead>
          <th style="width: 25px"></th>
          <th
            class="clickable t-start"
            style="width: 425px"
            @click="toggleOrder(ordenacaoDocentesModal, 'apelido')"
          >
            Nome
            <i :class="setIconByOrder(ordenacaoDocentesModal, 'apelido')"></i>
          </th>
        </template>
        <template #tbody>
          <tr
            v-for="docente in DocentesOptionsModalOrdered"
            :key="docente.id + docente.apelido"
            @click="toggleItemInArray(docente, filtroDocentes.selecionados)"
          >
            <td style="width: 25px;">
              <input
                type="checkbox"
                v-model="filtroDocentes.selecionados"
                :value="docente"
                class="form-check-input position-static m-0"
              />
            </td>
            <td style="width: 425px;" class="t-start">
              {{ docente.apelido }}
            </td>
          </tr>
          <tr
            @click="
              filtroDocenteSemAlocacao.selecionado = !filtroDocenteSemAlocacao.selecionado
            "
          >
            <td style="width: 25px;">
              <input
                type="checkbox"
                v-model="filtroDocenteSemAlocacao.selecionado"
                class="form-check-input position-static m-0"
              />
            </td>
            <td style="width: 425px;" class="t-start">SEM ALOCAÇÃO</td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Períodos'">
        <template #thead>
          <th style="width: 25px"></th>
          <th style="width: 425px" class="t-start">Periodos Letivo</th>
        </template>
        <template #tbody>
          <tr
            v-for="periodo in PeriodosLetivos"
            :key="periodo.id + periodo.nome"
            @click="selecionaPeriodo(periodo, filtroPeriodos.selecionados)"
          >
            <td style="width: 25px">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                :value="periodo"
                v-model="filtroPeriodos.selecionados"
                @click.stop="selecionaPeriodo(periodo)"
              />
            </td>
            <td style="width: 425px" class="t-start upper-case">
              {{ periodo.nome }}
            </td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable
        v-show="modalFiltrosTabs.current === 'Semestres'"
        :type="'modal'"
      >
        <template #thead>
          <th style="width: 25px"></th>
          <th class="t-start" style="width: 425px">
            Semestre Letivo
          </th>
        </template>
        <template #tbody>
          <tr
            v-for="semestre in SemestresLetivos"
            :key="semestre.id + semestre.nome"
            @click="selecionaSemestre(semestre)"
          >
            <td style="width: 25px">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                :value="semestre"
                v-model="filtroSemestres.selecionados"
                @click.stop="selecionaSemestre(semestre)"
              />
            </td>
            <td style="width: 425px" class="t-start upper-case">
              {{ semestre.nome }}
            </td>
          </tr>
        </template>
      </BaseTable>
    </ModalFiltros>

    <ModalRelatorio ref="modalRelatorio" @selection-option="pdf($event)" />

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar carga por professor:</b>
        Clique no ícone filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />. Em
        seguida, utilize as abas para navegar entre os filtros. Selecione as
        informações que deseja visualizar e clique em OK.
      </li>
      <li class="list-group-item">
        <b>Relatório:</b>
        Clique no ícone relatório
        <font-awesome-icon :icon="['fas', 'file-alt']" class="icon-gray" />. Em
        seguida, indique se deseja gerar o relatório completo com a distribuição
        das disciplinas para todos os professores ou o relatório parcial com as
        informações exibidas na tela.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pdfs from "@/common/services/pdfs";
import { normalizeText } from "@/common/utils";
import {
  toggleOrdination,
  toggleItemInArray,
  toggleAsideModal,
  conectaFiltrosSemestresEPeriodos,
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalAjuda, ModalRelatorio, ModalFiltros } from "@/components/modals";
import DocenteRow from "./DocenteRow";
import DocenteTurmaRow from "./DocenteTurmaRow";
import DocenteCargaPosRow from "./DocenteCargaPosRow";

export default {
  name: "DashboardCargaProfessores",
  mixins: [
    toggleOrdination,
    toggleItemInArray,
    toggleAsideModal,
    conectaFiltrosSemestresEPeriodos,
  ],
  components: {
    ModalRelatorio,
    ModalAjuda,
    ModalFiltros,
    InputSearch,
    DocenteTurmaRow,
    DocenteCargaPosRow,
    DocenteRow,
  },
  data() {
    return {
      searchDocentes: "",
      asideModalsRefs: ["modalFiltros", "modalAjuda", "modalRelatorio"],
      orednacaoDocentesMain: { order: "apelido", type: "asc" },
      ordenacaoDocentesModal: { order: "apelido", type: "asc" },
      filtroDocentes: {
        ativados: [],
        selecionados: [],
      },
      filtroDocenteSemAlocacao: {
        ativado: true,
        selecionado: true,
      },
      filtroSemestres: {
        ativados: [],
        selecionados: [],
      },
      filtroPeriodos: {
        ativados: [],
        selecionados: [],
      },
      modalFiltrosTabs: {
        current: "Docentes",
        array: ["Docentes", "Períodos", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Docentes: () => {
            this.filtroDocentes.selecionados = [...this.DocentesAtivos];
            this.filtroDocenteSemAlocacao.selecionado = true;
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [...this.PeriodosLetivos];
            this.conectaPeriodoEmSemestre();
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [...this.SemestresLetivos];
            this.conectaSemestreEmPeriodo();
          },
        },
        selectNone: {
          Docentes: () => {
            this.filtroDocentes.selecionados.length = 0;
            this.filtroDocenteSemAlocacao.selecionado = false;
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [];
            this.conectaPeriodoEmSemestre();
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [];
            this.conectaSemestreEmPeriodo();
          },
        },
        btnOk: () => {
          this.filtroPeriodos.ativados = [...this.filtroPeriodos.selecionados];
          this.filtroDocentes.ativados = [...this.filtroDocentes.selecionados];
          this.filtroDocenteSemAlocacao.ativado = this.filtroDocenteSemAlocacao.selecionado;
        },
      },
    };
  },

  beforeMount() {
    this.filtroPeriodos.selecionados = this.$_.filter(
      this.PeriodosLetivos,
      (periodo) => periodo.id === 1 || periodo.id === 3
    );
    this.modalFiltrosCallbacks.selectAll.Docentes();
    this.modalFiltrosCallbacks.btnOk();
  },

  methods: {
    pdf(completo) {
      let SemAlocacao;
      let Docentes;

      if (completo) {
        SemAlocacao = true;
        Docentes = this.DocentesAtivos;
      } else {
        SemAlocacao = this.filtroDocenteSemAlocacao.ativado;
        Docentes = this.filtroDocentes.ativados;
      }

      pdfs.pdfCargaProfessores({
        Docentes,
        SemAlocacao,
        plano: this.$_.find(this.allPlanos, ["id", this.currentPlanoId]),
      });
    },
    periodoEstaAtivo(periodoId) {
      return this.$_.some(this.filtroPeriodos.ativados, ["id", periodoId]);
    },
    calculaCreditosDaTurma(creditos, docente1Id, docente2Id) {
      if (docente1Id > 0 && docente2Id > 0 && docente1Id !== docente2Id) {
        return creditos / 2;
      }
      return creditos;
    },
    calculaTurmasDoDocente(docenteId) {
      const turmasFilteredByDocente = [];
      let creditos1Semestre = 0;
      let creditos2Semestre = 0;

      this.$_.forEach(this.TurmasComDocenteFilteredByPeriodo, (turma) => {
        if (turma.Docente1 === docenteId || turma.Docente2 === docenteId) {
          const creditosDaTurma = this.calculaCreditosDaTurma(
            turma.disciplina.creditoTotal,
            turma.Docente1,
            turma.Docente2
          );

          turmasFilteredByDocente.push({ ...turma, creditosDaTurma });

          if (turma.periodo === 1 || turma.periodo === 2) {
            creditos1Semestre += creditosDaTurma;
          } else {
            creditos2Semestre += creditosDaTurma;
          }
        }
      });

      return {
        turmas: turmasFilteredByDocente,
        creditos1Semestre,
        creditos2Semestre,
      };
    },
    calculaCargasPosDoDocente(docenteId) {
      const cargasPosFilteredByDocente = [];
      let creditos1Semestre = 0;
      let creditos2Semestre = 0;

      this.$_.forEach(this.CargasPosFilteredByPeriodo, (carga) => {
        if (carga.Docente === docenteId) {
          cargasPosFilteredByDocente.push({ ...carga });

          const creditosDaCarga = parseFloat(carga.creditos) || 0;

          if (carga.trimestre === 1 || carga.trimestre === 2) {
            creditos1Semestre += creditosDaCarga;
          } else {
            creditos2Semestre += creditosDaCarga;
          }
        }
      });

      return {
        cargasPos: cargasPosFilteredByDocente,
        creditos1Semestre,
        creditos2Semestre,
      };
    },
  },

  computed: {
    ...mapGetters([
      "DocentesAtivos",
      "TurmasInDisciplinasPerfis",
      "PeriodosLetivos",
      "AllCargasPos",
      "allPlanos",
      "currentPlanoId",
      "SemestresLetivos",
    ]),

    DocentesComTurmasECargasOrdered() {
      return this.$_.orderBy(
        this.DocentesComTurmasECargasFilteredByDocente,
        this.orednacaoDocentesMain.order,
        this.orednacaoDocentesMain.type
      );
    },
    DocentesComTurmasECargasFilteredByDocente() {
      return this.$_.filter(this.DocentesComTurmasECargas, (docente) =>
        this.$_.some(this.filtroDocentes.ativados, ["id", docente.id])
      );
    },
    DocentesComTurmasECargas() {
      return this.DocentesAtivos.map((docente) => {
        const turmasDoDocente = this.calculaTurmasDoDocente(docente.id);
        const cargasPosDoDocente = this.calculaCargasPosDoDocente(docente.id);

        const creditos1Semestre =
          turmasDoDocente.creditos1Semestre +
          cargasPosDoDocente.creditos1Semestre;

        const creditos2Semestre =
          turmasDoDocente.creditos2Semestre +
          cargasPosDoDocente.creditos2Semestre;

        return {
          ...docente,
          creditos1Semestre,
          creditos2Semestre,
          turmas: turmasDoDocente.turmas,
          cargasPos: cargasPosDoDocente.cargasPos,
        };
      });
    },

    DocenteSemAlocacaoComTurmas() {
      let creditos1Semestre = 0;
      let creditos2Semestre = 0;

      const turmasSemDocente = this.$_.map(
        this.TurmasSemDocenteFilteredByPeriodo,
        (turma) => {
          if (turma.periodo === 1 || turma.periodo === 2) {
            creditos1Semestre += turma.disciplina.creditoTotal;
          } else {
            creditos2Semestre += turma.disciplina.creditoTotal;
          }
          return {
            ...turma,
            creditosDaTurma: turma.disciplina.creditoTotal,
          };
        }
      );

      return {
        apelido: "SEM ALOCAÇÃO",
        turmas: turmasSemDocente,
        creditos1Semestre,
        creditos2Semestre,
      };
    },

    TurmasSemDocenteFilteredByPeriodo() {
      const turmasSemDocente = this.$_.filter(
        this.TurmasInDisciplinasPerfis,
        (turma) =>
          turma.Docente1 == null &&
          turma.Docente2 == null &&
          turma.Disciplina != null
      );

      const turmasFilteredByPeriodo = this.$_.filter(
        turmasSemDocente,
        (turma) =>
          this.$_.some(this.filtroPeriodos.ativados, ["id", turma.periodo])
      );

      return this.$_.orderBy(turmasFilteredByPeriodo, [
        "periodo",
        "disciplina.nome",
        "letra",
      ]);
    },
    TurmasComDocenteFilteredByPeriodo() {
      const turmasComDocente = this.$_.filter(
        this.TurmasInDisciplinasPerfis,
        (turma) => turma.Docente1 != null || turma.Docente2 != null
      );

      const turmasFilteredByPeriodo = this.$_.filter(
        turmasComDocente,
        (turma) =>
          this.$_.some(this.filtroPeriodos.ativados, ["id", turma.periodo])
      );

      return this.$_.orderBy(turmasFilteredByPeriodo, [
        "periodo",
        "disciplina.nome",
        "letra",
      ]);
    },
    CargasPosFilteredByPeriodo() {
      return this.$_.filter(this.AllCargasPos, (carga) => {
        if (this.periodoEstaAtivo(1) && this.periodoEstaAtivo(3)) {
          return true;
        } else if (this.periodoEstaAtivo(1)) {
          return carga.trimestre === 1 || carga.trimestre === 2;
        } else if (this.periodoEstaAtivo(3)) {
          return carga.trimestre === 3 || carga.trimestre === 4;
        }
      });
    },

    DocentesOptionsModalOrdered() {
      return this.$_.orderBy(
        this.DocentesOptionsModalFiltered,
        this.ordenacaoDocentesModal.order,
        this.ordenacaoDocentesModal.type
      );
    },
    DocentesOptionsModalFiltered() {
      if (this.searchDocentes === "") return this.DocentesAtivos;

      const searchNormalized = normalizeText(this.searchDocentes);

      return this.DocentesAtivos.filter((docente) => {
        const docenteApelido = normalizeText(docente.apelido);

        return docenteApelido.match(searchNormalized);
      });
    },

    filtroDocenteSemAlocacaoEstaAtivo() {
      return (
        this.DocenteSemAlocacaoComTurmas.turmas.length &&
        this.filtroDocenteSemAlocacao.ativado
      );
    },
    filtroSemestresEstaAtivo() {
      return {
        primeiro: this.periodoEstaAtivo(1) || this.periodoEstaAtivo(2),
        segundo: this.periodoEstaAtivo(3) || this.periodoEstaAtivo(4),
      };
    },
    algumFiltroEstaAtivo() {
      return (
        (this.filtroDocentes.ativados.length &&
          this.filtroPeriodos.ativados.length) ||
        (this.filtroDocenteSemAlocacao.ativado &&
          this.filtroPeriodos.ativados.length)
      );
    },
    emptyRowWidth() {
      const { primeiro, segundo } = this.filtroSemestresEstaAtivo;
      let tdsWidth = 0;

      if (primeiro && segundo) tdsWidth = 120;
      else if (primeiro || segundo) tdsWidth = 35;

      return 705 + tdsWidth;
    },
  },
};
</script>
