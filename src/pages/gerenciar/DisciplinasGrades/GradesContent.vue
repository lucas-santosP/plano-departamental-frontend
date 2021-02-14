<template>
  <div class="page-content">
    <NavTab
      :currentTab="currentTab"
      :allTabs="['DCC', 'Outros']"
      @change-tab="$emit('change-tab', $event)"
    />

    <div class="div-table">
      <BaseTable styles="height:calc(100vh - 130px)">
        <template #thead>
          <v-th-ordination
            :currentOrder="ordenacaoDisciplinasMain"
            orderToCheck="periodo"
            width="35"
            title="Período"
          >
            P.
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDisciplinasMain"
            orderToCheck="disciplina.codigo"
            width="80"
            align="start"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDisciplinasMain"
            orderToCheck="disciplina.nome"
            width="400"
            align="start"
          >
            Disciplina
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="disciplinaGrade in DisciplinaGradesOrdered"
            @click="handleClickInDisciplina(disciplinaGrade)"
            :key="disciplinaGrade.Disciplina"
            :class="[
              'clickable',
              { 'bg-custom': isEven(disciplinaGrade.periodo) },
              { 'bg-selected': disciplinaSelectedId === disciplinaGrade.Disciplina },
            ]"
          >
            <v-td width="35">{{ disciplinaGrade.periodo }}</v-td>
            <v-td width="80" align="start">
              {{ disciplinaGrade.disciplina.codigo }}
            </v-td>
            <v-td width="400" align="start">
              {{ disciplinaGrade.disciplina.nome }}
            </v-td>
          </tr>

          <tr v-if="!hasGradeSelected">
            <v-td width="515" colspan="3">
              <b>Nenhuma disciplina encontrada</b>
              , selecione uma grade.
            </v-td>
          </tr>
          <tr v-else-if="!DisciplinaGradesOrdered.length">
            <v-td width="515" colspan="3">
              <b>Nenhuma disciplina encontrada</b>
              na grade selecionada.
            </v-td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <Card :title="'Disciplinas'" width="415">
      <template #body>
        <div class="row mb-2 mx-0">
          <div class="form-group col m-0 px-0 mr-3">
            <label for="cursoAtual" class="col-form-label">Curso</label>
            <select
              id="cursoAtual"
              v-model="currentCursoId"
              @change="changeCurso"
              class="form-control form-control-sm w-100"
            >
              <option v-for="curso in CursosOptions" :key="curso.nome + curso.id" :value="curso.id">
                {{ curso.nome }}
              </option>
            </select>
          </div>

          <div class="form-group m-0 px-0">
            <label for="gradeSelect" class="col-form-label">Grade</label>
            <select
              :disabled="!hasCursoSelected"
              id="gradeSelect"
              v-model="currentGradeId"
              @change="changeGrade"
              class="form-control form-control-sm input-sm"
            >
              <option
                v-for="grade in GradesOptionsFiltred"
                :key="grade.id + grade.nome"
                :value="grade.id"
              >
                {{ grade.nome }}
              </option>
            </select>
          </div>
        </div>

        <div class="w-100 border mt-3 mb-2"></div>

        <div class="row mb-2 mx-0">
          <div class="form-group m-0 col px-0">
            <label required for="disciplina" class="col-form-label">Disciplina</label>
            <select
              :disabled="!hasGradeSelected"
              type="text"
              id="disciplina"
              class="form-control form-control-sm w-100"
              v-model="disciplinaGradeForm.Disciplina"
              @change="clearClick(), updateDisciplinaForm()"
            >
              <option v-if="!DisciplinasOptions.length">Nenhuma Disciplina Encontrada</option>
              <option
                v-for="disciplina in DisciplinasOptions"
                :key="disciplina.id + disciplina.nome"
                :value="disciplina.id"
              >
                {{ disciplina.nome }}
              </option>
            </select>
          </div>
        </div>

        <div class="row mb-2 mx-0">
          <div class="form-group m-0 col px-0">
            <label required for="periodoDisciplina" class="col-form-label">Período</label>
            <div class="d-flex align-items-center">
              <input
                :disabled="!hasGradeSelected"
                type="number"
                id="periodoDisciplina"
                class="form-control form-control-sm input-sm mr-2"
                v-model="disciplinaGradeForm.periodo"
              />

              <BaseButton
                :disabled="!hasGradeSelected"
                template="salvar"
                title="Salvar período"
                @click="handleUpdateDisciplinaGrade"
              />
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <BaseButton
          v-show="!isEditDisciplina"
          template="adicionar"
          title="Adicionar à Grade"
          :disabled="!hasGradeSelected"
          @click="handleCreateDisciplinaGrade"
        />

        <BaseButton
          template="deletar"
          title="Deletar Disciplina"
          :disabled="!hasGradeSelected"
          @click="$refs.modalDelete.open()"
        />

        <BaseButton template="cancelar" :disabled="!hasGradeSelected" @click="clearDisciplina" />
      </template>
    </Card>

    <ModalDelete
      ref="modalDelete"
      :isDeleting="isEditDisciplina"
      @btn-deletar="handleDeleteDisciplinaGrade"
    >
      <li v-if="isEditDisciplina" class="list-group-item">
        <span>
          Tem certeza que deseja excluír a disciplina
          <b>{{ disciplinaGradeForm.disciplina.nome }}</b>
          ?
        </span>
      </li>
      <li v-else class="list-group-item">Nenhuma disciplina selecionada.</li>
    </ModalDelete>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { cloneDeep, orderBy } from "lodash-es";
import { ModalDelete } from "@/components/modals";
import { Card, NavTab } from "@/components/ui";

const emptyGrade = {
  id: null,
  periodoInicio: null,
  Curso: null,
  nome: null,
};
const emptyDisciplinaGrade = {
  periodo: 1,
  Disciplina: null,
  Grade: null,
  disciplina: null,
};

export default {
  name: "BaseDisciplinasGrades",
  components: { Card, ModalDelete, NavTab },
  props: {
    currentTab: { type: String, required: true },
    arraysData: {
      type: Object,
      required: true,
      validator: (value) => {
        return "DisciplinasGrades" in value && "Grades" in value && "Cursos" in value;
      },
    },
    disciplinaGradeServices: {
      type: Object,
      required: true,
      validator: (value) => {
        return "create" in value && "update" in value && "delete" in value;
      },
    },
  },
  data() {
    return {
      disciplinaGradeForm: cloneDeep(emptyDisciplinaGrade),
      gradeForm: cloneDeep(emptyGrade),
      currentGradeId: null,
      currentCursoId: null,
      disciplinaSelectedId: null,
      ordenacaoDisciplinasMain: { order: "periodo", type: "asc" },
    };
  },

  methods: {
    updateDisciplinaForm() {
      const disciplinaFound = this.AllDisciplinas.find(
        (disciplina) => disciplina.id === this.disciplinaGradeForm.Disciplina
      );
      this.disciplinaGradeForm.disciplina = { ...disciplinaFound };
    },
    handleClickInDisciplina(disciplinaGrade) {
      this.disciplinaSelectedId = disciplinaGrade.Disciplina;

      this.showDisciplina(disciplinaGrade);
      this.showGrade(this.currentGradeId);
    },
    clearClick() {
      this.disciplinaSelectedId = null;
    },
    clearGradeForm() {
      this.gradeForm = cloneDeep(emptyGrade);
    },
    clearDisciplina() {
      this.clearClick();
      this.disciplinaGradeForm = cloneDeep(emptyDisciplinaGrade);
    },
    clearAllForm() {
      this.clearDisciplina();
      this.clearGradeForm();
      this.currentGradeId = null;
      this.currentCursoId = null;
    },
    showGrade(gradeId) {
      this.clearGradeForm();
      const grade = this.arraysData.Grades.find((grade) => grade.id === gradeId);
      this.gradeForm = cloneDeep(grade);
      this.disciplinaGradeForm.Grade = this.gradeForm.id;
    },
    changeCurso() {
      ///Curso foi selecionado mas grade ainda não foi selecionada
      this.clearDisciplina();
      this.clearGradeForm();
      this.currentGradeId = null;
    },
    changeGrade() {
      this.clearDisciplina();
      if (this.currentGradeId) this.showGrade(this.currentGradeId);
    },
    showDisciplina(disciplinaGrade) {
      this.clearDisciplina;
      this.disciplinaGradeForm = cloneDeep(disciplinaGrade);
    },
    isEven(number) {
      return number % 2 === 0;
    },
    async handleCreateDisciplinaGrade() {
      try {
        const disciplinaGrade = { ...this.disciplinaGradeForm };
        await this.disciplinaGradeServices.create(disciplinaGrade);
        this.$notify({
          group: "general",
          title: "Sucesso!",
          text: `A disciplina <b>${disciplinaGrade.disciplina.nome}</b> foi adicionada à grade 
          <b>${this.gradeForm.nome}</b>`,
          type: "success",
        });
      } catch (error) {
        this.$notify({
          group: "general",
          title: "Erro!",
          text: "Erro ao incluir disciplina, verifique se a disciplina já não existe na grade",
          type: "error",
        });
      }
    },
    async handleUpdateDisciplinaGrade() {
      try {
        const disciplinaGrade = { ...this.disciplinaGradeForm };
        await this.disciplinaGradeServices.update(
          disciplinaGrade.Disciplina,
          disciplinaGrade.Grade,
          disciplinaGrade
        );
        this.$notify({
          group: "general",
          title: "Sucesso!",
          text: `A disciplina <b>${this.disciplinaGradeForm.disciplina.nome}</b> foi atualizada!`,
          type: "success",
        });
      } catch (error) {
        this.$notify({
          group: "general",
          title: "Erro!",
          text: "Erro ao atualizar disciplina",
          type: "error",
        });
      }
    },
    async handleDeleteDisciplinaGrade() {
      try {
        const disciplinaGrade = { ...this.disciplinaGradeForm };
        await this.disciplinaGradeServices.delete(
          disciplinaGrade.Disciplina,
          disciplinaGrade.Grade,
          disciplinaGrade
        );
        this.$notify({
          group: "general",
          title: "Sucesso!",
          text: `A disciplina <b>${disciplinaGrade.disciplina.nome}</b> foi excluída da grade
           <b>${this.gradeForm.nome}</b>`,
          type: "success",
        });
        this.clearClick();
      } catch (error) {
        this.$notify({
          group: "general",
          title: "Erro!",
          text: "Erro ao excluir disciplina",
          type: "error",
        });
      }
    },
  },

  computed: {
    ...mapGetters(["AllDisciplinas"]),

    hasCursoSelected() {
      return this.currentCursoId != null;
    },
    hasGradeSelected() {
      return this.currentGradeId != null;
    },
    isEditDisciplina() {
      return this.disciplinaSelectedId !== null;
    },
    DisciplinaGradesOrdered() {
      const { order, type } = this.ordenacaoDisciplinasMain;
      return orderBy(this.DisciplinaGradesFiltred, order, type);
    },
    DisciplinaGradesFiltred() {
      return this.arraysData.DisciplinasGrades.filter(
        (disciplinaGrade) => this.currentGradeId === disciplinaGrade.Grade
      );
    },
    GradesOptionsFiltred() {
      return this.arraysData.Grades.filter((grade) => grade.Curso == this.currentCursoId);
    },
    DisciplinasOptions() {
      return orderBy(this.AllDisciplinas, "nome");
    },
    CursosOptions() {
      return orderBy(this.arraysData.Cursos, "nome");
    },
  },
};
</script>
