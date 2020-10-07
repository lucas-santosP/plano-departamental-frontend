export default {
  methods: {
    selectDisciplina(disciplina) {
      this.toggleItemInArray(disciplina, this.filtroDisciplinas.selecionados);
      this.conectaDisciplinasEmPerfis();
    },
    conectaDisciplinasEmPerfis() {
      this.filtroPerfis.selecionados = [];

      this.filtroPerfis.selecionados = this.$_.filter(this.PerfisOptions, (perfil) =>
        this.$_.some(this.filtroDisciplinas.selecionados, ["Perfil", perfil.id])
      );
    },

    selectPerfis(perfil) {
      const indexDoPerfil = this.$_.findIndex(this.filtroPerfis.selecionados, [
        "id",
        perfil.id,
      ]);

      perfil.halfChecked = false;

      if (indexDoPerfil === -1) this.filtroPerfis.selecionados.push(perfil);
      else this.filtroPerfis.selecionados.splice(indexDoPerfil, 1);

      this.conectaPerfisEmDisciplinas();
    },
    conectaPerfisEmDisciplinas() {
      //Se não tem nenhum perfil selecionado, zera disciplinas
      if (!this.filtroPerfis.selecionados.length) {
        this.filtroDisciplinas.selecionados = [];
        return;
      }

      this.$_.forEach(this.PerfisOptions, (perfil) => {
        const perfilFounded = this.$_.find(this.filtroPerfis.selecionados, [
          "id",
          perfil.id,
        ]);
        //Se o perfil esta selecionado
        if (perfilFounded) {
          //E se não esta half checked. Então adiciona todas disciplinas do perfil
          if (!perfilFounded.halfChecked) {
            const disciplinasDoPerfil = this.$_.filter(this.DisciplinasOptions, [
              "Perfil",
              perfilFounded.id,
            ]);

            this.filtroDisciplinas.selecionados = this.$_.union(
              disciplinasDoPerfil,
              this.filtroDisciplinas.selecionados
            );
          }
        } else {
          //Se o perfil não esta selecionado, remove todos as disciplinas desse perfil
          this.filtroDisciplinas.selecionados = this.$_.filter(
            this.filtroDisciplinas.selecionados,
            (disciplina) => disciplina.Perfil !== perfil.id
          );
        }
      });
    },
  },
};
