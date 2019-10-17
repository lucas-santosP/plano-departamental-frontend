<template>
    <div class="DashboardDisciplinas row" v-if="Admin">
        <div class="col">
            <div
                    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-3 mb-3 border-bottom">
                <h1 class="h3">Lista Disciplinas</h1>
            </div>
            <table class="table table-hover table-sm">
                <thead class="thead-light">
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Código</th>
                    <th scope="col">Carga Teórica</th>
                    <th scope="col">Carga Prática</th>
                    <th scope="col">Perfil</th>
                    <th scope="col">EAD</th>
                </tr>
                </thead>
                <tbody>
                <template v-if="Disciplinas.length > 0">
                    <tr v-for="disciplina in Disciplinas" :key="disciplina.id" v-on:click.prevent="showDisciplina(disciplina)">
                        <td>{{disciplina.nome}}</td>
                        <td>{{disciplina.codigo}}</td>
                        <td>{{disciplina.cargaTeorica}}</td>
                        <td>{{disciplina.cargaPratica}}</td>
                        <template v-for="perfil in Perfis">
                            <td v-if="perfil.id===disciplina.Perfil" :key="perfil.id">{{perfil.nome}}</td>
                        </template>
                        <td><b-form-checkbox disabled v-model="disciplina.ead"></b-form-checkbox></td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="3" class="text-center"><i class="fas fa-exclamation-triangle"></i> Nenhuma disciplina encontrada!
                        </td>
                    </tr>
                </template>
                </tbody>
            </table>
        </div>
        <div class="col-sm-4">
            <div
                    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-3 mb-3 border-bottom">
                <template v-if="isEdit">
                    <h1 class="h3">Editar Disciplina</h1>
                </template>
                <template v-else>
                    <h1 class="h3">Adicionar Disciplina</h1>
                </template>
            </div>
            <b-alert :show="Boolean(error)" variant="danger" dismissible v-html="error">
            </b-alert>
            <form>
                <div class="form-group row">
                    <label for="nome" class="col col-form-label" style="text-align: end;">Nome</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="nome" v-model="disciplinaForm.nome">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="codigo" class="col col-form-label" style="text-align: end;">Código</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="codigo" v-model="disciplinaForm.codigo">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="cargaTeorica" class="col col-form-label" style="text-align: end;">Carga Teórica</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="cargaTeorica" v-model="disciplinaForm.cargaTeorica">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="cargaPratica" class="col col-form-label" style="text-align: end;">Carga Prática</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="cargaPratica" v-model="disciplinaForm.cargaPratica">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="perfil" class="col col-form-label" style="text-align: end;">Perfil</label>
                    <div class="col-sm-8">
                        <select type="text" class="form-control" id="perfil" v-model="disciplinaForm.Perfil">
                            <option v-if="Perfis.length===0" type="text" value="">Nenhum Perfil Encontrado</option>
                            <option v-for="perfil in Perfis" :key="perfil.id" :value="perfil.id">{{perfil.nome}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col" style="margin-left: -35px;">
                        <label for="ead" class="col-sm-5 col-form-label" style="text-align: end;">
                            <input type="checkbox" id="ead" value="1" v-model="disciplinaForm.ead">
                            EAD</label>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-8">
                        <template v-if="isEdit">
                            <button type="button" class="btn btn-success m-3 botao-estilo" v-on:click.prevent="editDisciplina" :key="1">Editar</button>
                            <button type="button" class="btn btn-danger m-3" v-on:click.prevent="deleteDisciplina" :key="3">Excluir
                            </button>
                            <button type="button" class="btn btn-secondary m-3" v-on:click.prevent="cleanDisciplina" :key="3">Cancelar
                            </button>
                        </template>
                        <template v-else>
                            <button type="button" class="btn btn-success m-3" v-on:click.prevent="addDisciplina" :key="1">Adicionar
                            </button>
                            <button type="button" class="btn btn-secondary m-3" v-on:click.prevent="cleanDisciplina" :key="3">Resetar
                            </button>
                        </template>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import disciplinaService from '../../common/services/disciplina'

    const emptyDisciplina = {
        id:undefined,
        nome:undefined,
        codigo:undefined,
        cargaTeorica:undefined,
        cargaPratica:undefined,
        Perfil:undefined,
        ead:undefined
    }

    export default {
        name: 'DashboardDisciplina',

        data () {
            return {
                disciplinaForm: _.clone(emptyDisciplina),
                error: undefined
            }
        },

        methods: {
            addDisciplina() {
                disciplinaService.create(this.disciplinaForm).then((response) => {
                    this.cleanDisciplina()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Disciplina ${response.Disciplina.nome} foi criada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao criar Disciplina</b>'
                    console.log(error.response)
                    if (error.response.data.fullMessage) {
                        for (var e = 0; e < error.response.data.errors.length; e++){
                            if(error.response.data.errors[e].message.search("null") !== -1)
                                this.error += '<br/>' + error.response.data.errors[e].field + ' não pode ser vazio'
                            else if((error.response.data.errors[e].message.search("unique")!==-1) && (error.response.data.errors[e].field.search("codigo")!==-1))
                                this.error += '<br/>Disciplina já existe'
                        }
                    }
                })
            },

            editDisciplina() {
                disciplinaService.update(this.disciplinaForm.id, this.disciplinaForm).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Disciplina ${response.Disciplina.nome} foi atualizada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao atualizar Disciplina</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            deleteDisciplina() {
                disciplinaService.delete(this.disciplinaForm.id, this.disciplinaForm).then((response) => {
                    this.cleanDisciplina()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Disciplina ${response.Disciplina.nome} foi excluída!`,
                        type: 'success'
                    })
                }).
                catch(() => {
                    this.error = '<b>Erro ao excluir Disciplina</b>'
                })
            },

            cleanDisciplina() {
                this.disciplinaForm = _.clone(emptyDisciplina)
                this.error = undefined
            },

            showDisciplina(disciplina) {
                this.cleanDisciplina()
                this.disciplinaForm = _.clone(disciplina);
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
            Disciplinas () {
                return _.orderBy(this.$store.state.disciplina.Disciplinas, 'codigo')
            },

            Perfis () {
                return this.$store.state.perfil.Perfis
            },

            isEdit () {
                return this.disciplinaForm.id !== undefined
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
    .botao-estilo{
    background-color: #f0852e !important;
    border-color: #f0852e !important;
    color: white;
    }

    .botao-estilo:hover{
    background-color: #e86c07 !important;
    border-color: #e86c07 !important;
    }
   
    .botao-estilo:focus{
        box-shadow: 0 0 0 0.2rem rgba(194, 146, 84, 0.5) !important;
    }
</style>