<template>
  <BaseModal
    ref="baseModalImportPedidos"
    title="Importar pedidos"
    :hasOverlay="true"
    :hasFooter="true"
    classes="modal-import-pedidos"
  >
    <template #modal-body>
      <p class="alert alert-secondary">
        Selecione arquivos
        <b>.csv</b>
        para importar os pedidos oferecidos e ocupados de cada período no plano
        <b>{{ planoForm.nome }} - {{ planoForm.ano }}.</b>
        <br />
        Note que o formato do arquivo requerido é o relatório de plano departamental gerado pelo
        <a href="https://siga.ufjf.br" target="_blank">SIGA</a>
        na página:
        <b>Acadêmico > Consultas > Plano Departamental.</b>
        E você pode cancelar o processo durante a importação apertando a tecla esc.
      </p>

      <div class="row mb-2 mx-0">
        <div class="form-group col m-0 p-0">
          <label for="inputPedidos">Primeiro periodo:</label>
          <input
            id="inputPedidos"
            type="file"
            ref="input1periodo"
            class="w-100 form-control-file mt-1"
            accept=".csv"
          />
        </div>
      </div>
      <div class="row mb-2 mx-0">
        <div class="form-group col m-0 p-0">
          <label for="inputPedidos">Terceiro periodo:</label>
          <input
            id="inputPedidos"
            type="file"
            ref="input3periodo"
            class="w-100 form-control-file mt-1"
            accept=".csv"
          />
        </div>
      </div>
    </template>

    <template #modal-footer>
      <BaseButton
        text="Confirmar"
        color="blue"
        class="px-3 ml-auto"
        @click="handleImportPedidosOferecidos"
      />
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import turmaService from "@/services/turma";
import { parseCSVFileToArray } from "@/common/utils";
import {
  parseTurmaSIGAToPedido,
  getKeysTurmaSIGA,
  validateTurmasSIGA,
} from "@/common/utils/turmasSIGA";

export default {
  name: "ModalNovoPlano",
  props: {
    planoForm: { type: Object, required: true },
  },
  data() {
    return {
      abortImport: false,
    };
  },
  mounted() {
    document.addEventListener("keydown", this.onEscAbortImport);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.onEscAbortImport);
  },

  methods: {
    ...mapActions([
      "createPedidoOferecido",
      "updatePedidoOferecido",
      "initializeProgressBar",
      "updateProgressBar",
      "finishProgressBar",
    ]),

    open() {
      this.$refs.baseModalImportPedidos.open();
    },
    close() {
      this.$refs.baseModalImportPedidos.close();
    },
    onEscAbortImport(event) {
      event.stopPropagation();
      if (event.code === "Escape") this.abortImport = true;
    },
    async handleImportPedidosOferecidos() {
      const [file1Periodo] = this.$refs.input1periodo.files;
      const [file3Periodo] = this.$refs.input3periodo.files;
      if (!file1Periodo && !file3Periodo) {
        this.pushNotification({
          type: "error",
          text: "Nenhum arquivo selecionado",
        });
        return;
      }

      try {
        this.abortImport = false;
        const turmasFile1Periodo = await parseCSVFileToArray(file1Periodo);
        const turmasFile3Periodo = await parseCSVFileToArray(file3Periodo);
        validateTurmasSIGA(turmasFile1Periodo);
        validateTurmasSIGA(turmasFile3Periodo);

        this.initializeProgressBar({
          finalValue: turmasFile1Periodo.length + turmasFile3Periodo.length,
        });

        let turmasDoPlano;
        if (this.planoForm.id === this.currentPlano.id) {
          turmasDoPlano = [...this.AllTurmas];
        } else {
          const { Turmas = [] } = await turmaService.fetchAll(this.planoForm.id);
          turmasDoPlano = Turmas;
        }
        if (!turmasDoPlano.length) {
          this.pushNotification({
            type: "error",
            text: "Plano selecionado não possui turmas",
          });
          return;
        }

        const turmas1Periodo = turmasDoPlano.filter((turma) => turma.periodo === 1);
        const turmas3Periodo = turmasDoPlano.filter((turma) => turma.periodo === 3);
        await this.createPedidosFileSIGA(turmasFile1Periodo, turmas1Periodo, 1);
        await this.createPedidosFileSIGA(turmasFile3Periodo, turmas3Periodo, 3);

        if (!this.abortImport) {
          this.close();
          this.pushNotification({
            type: "success",
            text: `Pedidos importados para o plano ${this.currentPlano.nome}`,
          });
        } else {
          this.pushNotification({
            type: "warn",
            text: "Importação dos pedidos foi cancelada!",
          });
        }
      } catch (error) {
        console.log(error);
        this.pushNotification({
          type: "error",
          title: "Erro ao importar pedidos!",
        });
      } finally {
        await this.finishProgressBar();
      }
    },
    async createPedidosFileSIGA(turmasSIGA, turmasDoPlano, periodo) {
      if (!turmasSIGA.length || !turmasDoPlano.length) return;

      let currentPedido = {};
      const keysTurmaSIGA = getKeysTurmaSIGA(turmasSIGA[0]);

      for (const turmaSIGA of turmasSIGA) {
        if (this.abortImport) break;
        this.updateProgressBar();

        const disciplinaFound = this.AllDisciplinas.find(
          (disciplina) => disciplina.codigo === turmaSIGA[keysTurmaSIGA.disciplinaCod]
        );
        if (!disciplinaFound) continue;

        const turmaDoPlanoFound = turmasDoPlano.find((turma) => {
          return (
            turma.periodo === periodo &&
            turma.Disciplina === disciplinaFound.id &&
            turma.letra === turmaSIGA[keysTurmaSIGA.letra]
          );
        });
        if (!turmaDoPlanoFound) continue;

        const pedidoOferecido = parseTurmaSIGAToPedido(
          turmaSIGA,
          keysTurmaSIGA,
          turmaDoPlanoFound.id
        );
        // Se for igual ao currentPedido, não cria pois ja foi criado antes
        if (pedidoOferecido && !this.pedidosAreEqual(pedidoOferecido, currentPedido)) {
          const pedidoCreated = await this.handleCreatePedidoOferecido(pedidoOferecido);
          currentPedido = { ...pedidoCreated };
        }
      }
    },
    async handleCreatePedidoOferecido(pedidoOferecido) {
      try {
        return await this.createPedidoOferecido({ data: pedidoOferecido });
      } catch (error) {
        return await this.updatePedidoOferecido({ data: pedidoOferecido });
      }
    },
    pedidosAreEqual(pedido1, pedido2) {
      return pedido1.Curso === pedido2.Curso && pedido1.Turma === pedido2.Turma;
    },
  },

  computed: {
    ...mapGetters(["AllTurmas", "AllDisciplinas"]),
  },
};
</script>

<style lang="scss">
.modal-import-pedidos {
  font-size: 14px;

  .form-row {
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
  }

  .form-group {
    margin: 0;
    padding: 0;
  }

  .alert {
    width: 470px;
    margin-bottom: 1rem;
    padding: 8px 10px;
    padding-right: 20px;
    background-color: #e9ecef !important;
    font-size: 12px;
    word-break: break-word;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .form-control {
    width: 100%;
    height: 28px;
    font-size: 12px;
    padding: 0 5px;
    text-align: start;
  }
  label {
    margin: 0;
  }
}
</style>
