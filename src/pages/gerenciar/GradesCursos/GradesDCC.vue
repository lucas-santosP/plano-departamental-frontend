<template>
  <div class="div-table">
    <BaseTable :styles="'height:max-content'">
      <template #thead>
        <v-th width="220">Cursos</v-th>
        <v-th width="100">Grades</v-th>
      </template>

      <template #tbody>
        <template v-for="curso in PrincipaisCursosDCCComGradeOrdered">
          <tr :key="curso.id" class="bg-custom">
            <v-td width="220" :title="curso.nome">{{ curso.nome }}</v-td>
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
      </template>
    </BaseTable>

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

    <portal to="page-content-gradesDCC">
      <Card
        :title="'Curso'"
        width="380"
        :toggleFooter="isEditing"
        @btn-salvar="handleEditGrade"
        @btn-delete="openModalDelete"
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
                <option
                  v-for="curso in PrincipaisCursosDCCOrdered"
                  :key="curso.id + curso.nome"
                  :value="curso.id"
                >
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
                  v-for="curso in PrincipaisCursosDCCOrdered"
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
    </portal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { clone, orderBy } from "lodash-es";
import { normalizeInputText } from "@/common/mixins";
import { ModalDelete } from "@/components/modals";
import { Card } from "@/components/ui";
const emptyGrade = {
  id: null,
  periodoInicio: null,
  Curso: null,
  nome: null,
};

export default {
  name: "GerenciarGradesCursosDCC",
  mixins: [normalizeInputText],
  components: { Card, ModalDelete },
  data() {
    return {
      gradeForm: clone(emptyGrade),
      gradeSelected: null,
    };
  },

  methods: {
    ...mapActions(["createGrade", "editGrade", "deleteGrade"]),

    openModalDelete() {
      this.$refs.modalDelete.open();
    },
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

      const cursoFound = this.PrincipaisCursosDCC.find((curso) => curso.id === cursoId);
      return cursoFound ? cursoFound.nome : "";
    },
    async handleCreateGrade() {
      try {
        this.setLoading({ type: "partial", value: true });
        await this.createGrade(this.gradeForm);
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
        await this.editGrade(this.gradeForm);
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
        await this.deleteGrade(this.gradeForm);
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
    ...mapGetters(["AllGrades", "PrincipaisCursosDCC"]),

    PrincipaisCursosDCCOrdered() {
      return orderBy(this.PrincipaisCursosDCC, ["nome"]);
    },
    PrincipaisCursosDCCComGradeOrdered() {
      return orderBy(this.PrincipaisCursosDCCComGrade, "nome");
    },
    PrincipaisCursosDCCComGrade() {
      return this.PrincipaisCursosDCC.map((curso) => {
        const gradesFound = this.AllGrades.filter((grade) => grade.Curso === curso.id);

        return {
          ...curso,
          grades: orderBy(gradesFound, ["nome", "periodoInicio"], ["asc", "desc"]),
        };
      });
    },
    isEditing() {
      return this.gradeSelected != null;
    },
  },
};
</script>
