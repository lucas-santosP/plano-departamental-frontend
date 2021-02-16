<template>
  <div class="page-content">
    <div class="fex flex-column flex-grow-1">
      <NavTab
        :currentTab="currentTab"
        :allTabs="['DCC', 'Outros']"
        @change-tab="$emit('change-tab', $event)"
      />

      <div class="div-table">
        <BaseTable styles="height:max-content">
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoCursos"
              align="start"
              orderToCheck="nome"
              width="220"
            >
              Cursos
            </v-th-ordination>
            <v-th width="100">Grades</v-th>
          </template>

          <template #tbody>
            <template v-for="curso in CursosComGradesOrdered">
              <tr :key="curso.id" class="bg-custom">
                <v-td width="220" align="start" :title="curso.nome">{{ curso.nome }}</v-td>
                <v-td width="100" />
              </tr>
              <tr
                v-for="grade in curso.grades"
                :key="grade.id + grade.nome + curso.id"
                :class="['clickable', { 'bg-selected': gradeSelected === grade.id }]"
                @click="showGrade(grade)"
              >
                <v-td width="220" />
                <v-td width="100">{{ grade.nome }}</v-td>
              </tr>
            </template>
            <tr v-if="!CursosComGradesOrdered.length">
              <v-td width="320" colspan="2">Nenhuma grade encontrada</v-td>
            </tr>
          </template>
        </BaseTable>
      </div>
    </div>

    <Card
      title="Curso"
      width="420"
      :toggleFooter="isEditing"
      @btn-salvar="handleEditGrade"
      @btn-delete="$refs.modalDelete.open()"
      @btn-add="handleCreateGrade"
      @btn-clean="cleanGrade"
    >
      <template #body>
        <div class="row mb-2 mx-0">
          <div class="form-group col-8 m-0 px-0">
            <label required for="gradeNome" class="col-form-label">Nome</label>
            <input
              type="text"
              class="form-control form-control-sm"
              id="gradeNome"
              @change="gradeForm.nome = normalizeInputText($event)"
              :value="gradeForm.nome"
            />
          </div>

          <div class="form-group col-4 m-0 px-0">
            <label required for="periodoInicio" class="col-form-label">Período de Início</label>
            <input
              type="text"
              id="periodoInicio"
              class="form-control form-control-sm"
              v-model="gradeForm.periodoInicio"
            />
          </div>
        </div>

        <div class="row mb-2 mx-0">
          <div class="form-group col-8 m-0 px-0">
            <label required for="gradeCurso" class="col-form-label">Curso</label>
            <select
              id="gradeCurso"
              class="form-control form-control-sm"
              :title="getCursoNome(gradeForm.Curso)"
              v-model.number="gradeForm.Curso"
            >
              <option v-for="curso in CursosOptions" :key="curso.id + curso.nome" :value="curso.id">
                {{ curso.nome }}
              </option>
            </select>
          </div>

          <div class="form-group col-4 m-0 px-0">
            <label required for="gradeCursoCodigo" class="col-form-label">Código</label>
            <select
              id="gradeCursoCodigo"
              class="form-control form-control-sm"
              v-model.number="gradeForm.Curso"
            >
              <option
                v-for="curso in CursosOptions"
                :key="curso.id + curso.codigo"
                :value="curso.id"
              >
                {{ curso.codigo }}
              </option>
            </select>
          </div>
        </div>
      </template>
    </Card>

    <ModalDelete ref="modalDelete" :isDeleting="isEditing" @btn-deletar="handleDeleteGrade">
      <li v-if="isEditing" class="list-group-item">
        <span>
          Tem certeza que deseja excluír a grade
          <b>{{ gradeForm.periodoInicio }} - {{ gradeForm.nome }}</b>
          ?
        </span>
      </li>
      <li v-else class="list-group-item">Nenhuma grade selecionada.</li>
    </ModalDelete>
  </div>
</template>

<script>
import { clone, orderBy } from "lodash-es";
import { normalizeInputText } from "@/common/mixins";
import { ModalDelete } from "@/components/modals";
import { Card, NavTab } from "@/components/ui";

const emptyGrade = {
  id: null,
  periodoInicio: null,
  Curso: null,
  nome: null,
};

export default {
  name: "GradesCursosContent",
  mixins: [normalizeInputText],
  components: { Card, ModalDelete, NavTab },
  props: {
    currentTab: { type: String, required: true },
    arraysData: {
      type: Object,
      required: true,
      validator: (value) => {
        return "Grades" in value && "Cursos" in value;
      },
    },
    gradeService: {
      type: Object,
      required: true,
      validator: (value) => {
        return "create" in value && "update" in value && "delete" in value;
      },
    },
  },
  data() {
    return {
      gradeForm: clone(emptyGrade),
      gradeSelected: null,
      ordenacaoCursos: { order: "nome", type: "asc" },
    };
  },

  methods: {
    cleanGrade() {
      this.gradeForm = clone(emptyGrade);
      this.gradeSelected = null;
    },
    showGrade(grade) {
      this.cleanGrade();
      this.gradeSelected = grade.id;
      this.gradeForm = clone(grade);
    },
    getCursoNome(cursoId) {
      if (!cursoId) return "";

      const cursoFound = this.arraysData.Cursos.find((curso) => curso.id === cursoId);
      return cursoFound ? cursoFound.nome : "";
    },
    async handleCreateGrade() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.gradeService.create(this.gradeForm);
        this.cleanGrade();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao criar nova grade!",
          text: error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleEditGrade() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.gradeService.update(this.gradeForm);
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar grade!",
          text: error.message,
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async handleDeleteGrade() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.gradeService.delete(this.gradeForm);
        this.cleanGrade();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao excluir grade!",
          text: error.response
            ? "Grade não pode possuir disciplinas cadastradas para ser excluída"
            : "",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
  },

  computed: {
    CursosComGradesOrdered() {
      const { order, type } = this.ordenacaoCursos;
      return orderBy(this.CursosComGrades, order, type);
    },
    CursosComGrades() {
      const cursosResult = [];
      this.arraysData.Cursos.forEach((curso) => {
        const gradesFound = this.arraysData.Grades.filter((grade) => grade.Curso === curso.id);
        if (gradesFound.length) {
          cursosResult.push({
            ...curso,
            grades: orderBy(gradesFound, ["nome", "periodoInicio"], ["asc", "desc"]),
          });
        }
      });

      return cursosResult;
    },
    CursosOptions() {
      return orderBy(this.arraysData.Cursos, ["nome"]);
    },
    isEditing() {
      return this.gradeSelected != null;
    },
  },
};
</script>
