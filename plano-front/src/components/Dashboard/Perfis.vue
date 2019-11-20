<template>
  <div class="DashboardPerfis row" v-if="Admin">
    <!-- Grid Esquerdo -->
    <div class="col-12">
      <!-- Titulo -->
      <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" style="height: 45px">
        <h1>Lista Perfis</h1>
      </div>
    </div>
      <div class="col">
      <!-- Inicio da Tabela -->
      <div style="overflow: auto; position:relative; height: 82vh; max-width: 500px;">
      <table class="table table-hover table-sm">
        <thead class="thead-light">
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Abreviação</th>
          <th scope="col">Cor</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="Perfis.length > 0">
          <tr v-for="perfil in Perfis" :key="perfil.id" v-on:click.prevent="showPerfil(perfil)">
            <td style="width: 350px">{{perfil.nome}}</td>
            <td>{{perfil.abreviacao}}</td>
            <input type="color" style="width: 30px;padding:0;vertical-align:middle" v-model="perfil.cor">
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="2" class="text-center"><i class="fas fa-exclamation-triangle"></i> Nenhum perfil encontrado!
            </td>
          </tr>
        </template>
        </tbody>
      </table>
      </div>
      <!-- Fim da Tabela -->
    </div>
    <!-- Fim do Grid Esquerdo -->
    <!-- Grid Direito -->
     <div class="cartao-inteiro col-lg-5 col-md-12 col-sm-12 col-12 mt-3 pl-0 ml-auto">
      <div class="col card cartao ml-auto" style="margin-right:20px; max-width: 350px;">
         <div class="card-body"style="padding:20px;">
      <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 mb-3 border-bottom">
        <template v-if="isEdit">
          <h2>Editar Perfil</h2>
        </template>
        <template v-else>
          <h2>Adicionar Perfil</h2>
        </template>
      </div>
      <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error">
      </b-alert>
      <form>
        <div class="form-group row">
          <label for="nome" class="col-sm-3 col-3 col-form-label texto-cartao" style="text-align: end;">Nome</label>
          <div class="col-lg-8 col-md-9 col-sm-9 col-9">
            <input type="text" class="form-control" id="nome" v-model="perfilForm.nome">
          </div>
        </div>
        <div class="form-group row">
          <label for="abreviacao" class="col-sm-3 col-3 col-form-label texto-cartao" style="text-align: end;">Abreviação</label>
          <div class="col-lg-8 col-md-9 col-sm-9 col-9">
            <input type="text" class="form-control" id="abreviacao" v-model="perfilForm.abreviacao">
          </div>
        </div>
        <div class="form-group row">
          <label for="cor" class="col-sm-3 col-3 col-form-label texto-cartao" style="text-align: end;">Cor</label>
          <div class="col-lg-8 col-md-9 col-sm-9 col-9">
            <input type="color" class="form-control" style="height:25px !important; padding:2px;" id="cor" v-model="perfilForm.cor">
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <template v-if="isEdit">
              <button type="button" class="btn btn-success m-2 botao-estilo" v-on:click.prevent="editPerfil" :key="1">Editar</button>
              <button type="button" class="btn btn-danger m-2" v-on:click.prevent="deletePerfil" :key="3">Excluir
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanPerfil" :key="2">Cancelar
              </button>
            </template>
            <template v-else>
              <button type="button" class="btn btn-success m-2" v-on:click.prevent="addPerfil" :key="1">Adicionar
              </button>
              <button type="button" class="btn btn-secondary m-2" v-on:click.prevent="cleanPerfil" :key="2">Resetar
              </button>
            </template>
          </div>
        </div>
      </form>
         </div>
       </div>
    </div>
    <!-- Fim do Grid Direito -->
  </div>
</template>

<script>
import _ from 'lodash'
import perfilService from '../../common/services/perfil'

const emptyPerfil = {
  id: undefined,
  nome: undefined,
  abreviacao: undefined,
  cor: '#ff0000'
}

export default {
  name: 'DashboardPerfis',

  data () {
    return {
      perfilForm: _.clone(emptyPerfil),
      error: undefined
    }
  },

  methods: {
    addPerfil () {
      perfilService.create(this.perfilForm).then((response) => {
        this.cleanPerfil()
        this.$notify({
          group: 'general',
          title: `Sucesso!`,
          text: `O Perfil ${response.Perfil.nome} foi criado!`,
          type: 'success'
        })
      }).catch(error => {
        this.error = '<b>Erro ao criar Perfil</b>'
        if (error.response.data.fullMessage) {
          this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
        }
      })
    },

    editPerfil () {
      perfilService.update(this.perfilForm.id, this.perfilForm).then((response) => {
        this.$notify({
          group: 'general',
          title: `Sucesso!`,
          text: `O Perfil ${response.Perfil.nome} foi atualizado!`,
          type: 'success'
        })
      }).catch(error => {
        this.error = '<b>Erro ao atualizar Perfil</b>'
        if (error.response.data.fullMessage) {
          this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
        }
      })
    },

    deletePerfil () {
      perfilService.delete(this.perfilForm.id, this.perfilForm).then((response) => {
        this.cleanPerfil()
        this.$notify({
          group: 'general',
          title: `Sucesso!`,
          text: `O Perfil ${response.Perfil.nome} foi excluído!`,
          type: 'success'
        })
      }).catch(() => {
        this.error = '<b>Erro ao excluir Perfil</b>'
      })
    },

    cleanPerfil () {
      console.log(this.perfilForm.cor)
      this.perfilForm = _.clone(emptyPerfil)
      this.error = undefined
    },

    showPerfil (perfil) {
      this.cleanPerfil()
      this.perfilForm = _.clone(perfil);
      (function smoothscroll(){
          var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
              window.requestAnimationFrame(smoothscroll);
              window.scrollTo (0,currentScroll - (currentScroll/5));
          }
      })();
    }
  },

  computed: {
    Perfis () {
      return this.$store.state.perfil.Perfis
    },

    isEdit () {
      return this.perfilForm.id !== undefined
    },

    Admin () {
      if(this.$store.state.auth.Usuario.admin===1){
        return true
      }else{
        return false
      }
    }
  }
}
</script>

<style scoped>
  table{height:80vh; width:500px !important;}
  table th{
    position:-webkit-sticky;
    position: sticky;
    top: 0;
    font-size: 11px;
  }
  td{font-size:11px;}
  h1{font-size:25px;}
  h2{font-size:14px; font-weight:bold;padding-left: 10px;}
  .custom-control{font-size: 11px;}
  .texto-cartao{
    font-size:12px;
    padding:0;
  }
  input[type="text"]{height:25px !important;font-size:11px;}
  .cartao{
      width: 330px !important;
      height:auto !important;
      top: -20px !important;
      padding: 0 0 0 5px;
  } 
  .cartao-inteiro{
      padding-right:15px;
  }
  .btn {
      height:25px;
      min-width: -webkit-max-content;
      min-width: -moz-max-content;
      min-width: max-content;
      font-size:12px;
      padding: 0 5px 0 5px;
      max-width:65px;
  }
  .botao-estilo{
      background-color: #faca4d !important;
      border-color: #faca4d !important;
      color: white;
  }

  .botao-estilo:hover{
      background-color: #f8ac51 !important;
      border-color: #f8ac51 !important;
  }
  
  .botao-estilo:focus{
      box-shadow: 0 0 0 0.2rem rgba(194, 146, 84, 0.5) !important;
  }
  @media screen and (max-width: 992px) {
    .cartao{
      margin-left:auto !important;
      margin-right:auto !important;
    }
  }
</style>