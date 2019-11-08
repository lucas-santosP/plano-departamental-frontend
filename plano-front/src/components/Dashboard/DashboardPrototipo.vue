<template>
    <div class="DashboardPrototipo row" style="height:100%;" v-if="Admin">
        <div class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap pt-0 pb-0 pr-0 pl-0 mb-0" style="overflow: auto; width: 100%">
            <div class="form-inline col-12 pl-0">
                <h1 class="h2 titulo col-2">Plano</h1>

                <div class="form-group col-12 pl-0 pr-0 mb-2">
                    <!-- 
                    <b-form-select v-model="periodos" size="sm" class="selectForm col-lg-2 col-md-2 mr-2 mt-1" style="max-width: 170px; min-width:170px">
                        <option value="" selected disabled>Selecione um Semestre</option>
                        <option value = "1">1º Semestre</option>
                        <option value = "2">2º Semestre</option>
                        <option value = "3">Ambos</option>
                    </b-form-select>
                    <b-button v-b-modal.modalPerfis class="btn mt-1 btn-sm col-1 mr-4 botao-perfis mt-1" style="max-width: 60px;" >Perfis</b-button> 
                    -->
                   <b-button v-b-modal.modalPerfis class="btn mt-1 btn-sm col-1 mr-2 botao-perfis" >Perfis</b-button>

                    <div class="input-group mt-1 mr-4">
                        <select class="custom-select custom-select-sm" style=" min-width:75px; text-align:center" v-model="periodos">
                            <option value = "1">1 º</option>
                            <option value = "2">2 º</option>
                            <option value = "3">Ambos</option>
                        </select>
                        <div class="input-group-append">
                            <div class="input-group-append">
                            <label class="input-group-text " >Semestre</label>
                        </div>
                        </div>
                    </div>
                             
                   
                    <template v-if="isAdd">
                        <button type="button" class="btn mt-1 btn-sm btn-danger col-1 mr-2 botao-estilo2" style="max-width:80px;" v-on:click.prevent="toggleAdd" >Cancelar </button>
                        <button type="button" class="btn mt-1 btn-sm btn-success col-1 mr-2 botao-estilo" style="max-width:80px;" v-on:click.prevent="addTurma" > Confirmar </button>
                    </template>

                    <template v-else>
                        <button type="button" class="btn mt-1 btn-sm btn-success col-1 mr-2" style="max-width:80px;" v-on:click.prevent="toggleAdd">Adicionar </button>
                        <button type="button" class="btn mt-1 btn-sm btn-danger col-1 mr-2 botao-estilo2" style="max-width:80px;" v-b-modal.modalConfirma>Deletar </button>
                        <button type="button" class="btn mt-1 btn-sm btn-info col-1 mr-2" style="max-width: 65px;"  v-on:click.prevent="xlsx(Pedidos)">XLSX </button>
                        <!-- Modals do deletar-->
                        <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
                            <p class="my-4">Tem certeza que deseja deletar as turmas selecionadas?</p>
                            <template v-if="Deletar.length > 0">
                                <template v-for="turma in Deletar">
                                    <template v-for="disciplina in Disciplinas">
                                        <template v-if="disciplina.id===turma.Disciplina">
                                            <p :key="'disciplina'+disciplina.id+'turma'+turma.id" style="width:80px">Disciplina:{{disciplina.codigo}}<br>Turma:{{turma.letra}}</p>
                                        </template>
                                    </template>
                                </template>
                            </template>
                        </b-modal>
                    </template> 

                    <!-- Modals do botão perfis-->
                    <b-modal  id="modalPerfis" scrollable title="Selecione os perfis">
                        <b-form-group style="font-size:14px;">
                       
                            <b-form-checkbox-group  id="checkboxGroupPerfis" v-model="PerfisAtivos" :options="options">
                                
                                <b-form-checkbox  v-for="perfil in Perfis" :key="'perfil'+perfil.id" :value="perfil" switch>
                                    {{perfil.nome}}
                                </b-form-checkbox>

                            </b-form-checkbox-group>
                    
                            <div slot="modal-footer">
                                <b-button class="botao-estilo" size="sm" variant="success" @click="selectAll()" style="margin-right: 20px">
                                    Selecionar Todos
                                </b-button>
                                <b-button size="sm" variant="secondary" @click="selectNone()">
                                    Desmarcar Todos
                                </b-button>
                            </div> 

                        </b-form-group>   
                    </b-modal>
                </div>
            </div>
        </div>

        <div class="w-100 mb-2 border-bottom"></div>
        
    <div id="loading" v-if="isLoading">
        <div class="cube1"></div>
        <div class="cube2"></div>
    </div>

    <div class="pl-0" style="overflow: hidden; height:auto; height: calc(100vh - 115px); border: #808080 solid 2px;" v-if="!isLoading" ref = "mainTable">
        <table class="table table-bordered table-hover table-sm">
            <thead class="thead-light sticky">
            <tr>
                <turmaheader></turmaheader>
            </tr>
            </thead>
            <tbody>

            <template v-if="isAdd">
                <tr>
                    <novaturma></novaturma>
                </tr>
            </template>

            <template v-if="Turmas.length>0">
            <template v-for="perfil in PerfisAtivos">
                <tr v-for="turma in inPerfil(perfil, Turmas, Disciplinas)" v-if="turma.periodo==1 && (periodos == 1 || periodos==3)" :key="turma.id" v-bind:style="{backgroundColor: perfil.cor}">
                    <turmadata ref="turma" v-bind:turma="turma" v-bind:perfil="perfil"></turmadata>
                </tr>
            </template>
            <template v-for="perfil in PerfisAtivos">
                <tr v-for="turma in inPerfil(perfil, Turmas, Disciplinas)" v-if="turma.periodo==3 && (periodos==2 || periodos==3)" :key="turma.id"  v-bind:style="{backgroundColor: perfil.cor}">
                    <turmadata ref="turma" v-bind:turma="turma" v-bind:perfil="perfil"></turmadata>
                </tr>
            </template>
            </template>
            </tbody>
        </table>
    </div>    
    </div>
</template>

<script>
    import _ from 'lodash'
    import turmaService from '../../common/services/turma'
    import pedidoService from '../../common/services/pedido'
    import turmadata from './TurmaRow.vue'
    import turmaheader from './TurmaHeader.vue'
    import novaturma from './NovaTurma.vue'
    import xlsx from '../../common/services/xlsx'
    import ls from 'local-storage'
    import { EventBus } from '../../event-bus.js'
    import {saveAs} from 'file-saver'

    const emptyTurma = {
        id:undefined,
        periodo:undefined,
        letra:undefined,
        turno1:undefined,
        turno2:undefined,
        Disciplina:undefined,
        Docente1:undefined,
        Docente2:undefined,
        Horario1:undefined,
        Horario2:undefined,
        Sala1:undefined,
        Sala2:undefined
    }

    export default {

        name: 'DashboardPrototipo',

        data () {
            return {
                turmaForm: _.clone(emptyTurma),
                error: undefined,
                isAdd:false,
                atual:undefined,
                semestre: 1,
                periodos: 3,
                PerfisAtivos: []
            }
        },

        components: {
            turmadata,
            turmaheader,
            novaturma
        },

        mounted: function () {
            ls.set('toggle', -1)
            ls.on('toggle', () => {
                var val =  ls.get('toggle')
                if(val === true){
                    this.$store.dispatch('toggleAllCursosTrue')
                } else{
                    this.$store.dispatch('toggleAllCursosFalse')
                }
                ls.set('toggle', -1)

            })
            for (var c = 0; c < this.$store.state.curso.Cursos.length; c++){
                let id = this.$store.state.curso.Cursos[c].id
                ls.on(`${id}`, () => {
                    this.$store.dispatch('toggleCurso', id)
                })
            }
        },

        beforeDestroy: function () {
            ls.off('toggle')
            for (var c = 0; c < this.$store.state.curso.Cursos.length; c++){
                let id = this.$store.state.curso.Cursos[c].id
                ls.off(`${id}`)
            }
        },

        methods: {
            selectAll(){
              if(this.PerfisAtivos != [])
                  this.PerfisAtivos = []
              for(var i = 0; i < this.$store.state.perfil.Perfis.length; i++)
                  this.PerfisAtivos.push(this.$store.state.perfil.Perfis[i])
            },

            selectNone(){
                this.PerfisAtivos = []
            },

            xlsx: function (pedidos) {
                xlsx.downloadTable({pedidos:pedidos}).then(() => {
                    console.log('done')
                    fetch("http://200.131.219.57:3000/api/xlsx/download", {method:'GET', headers:{'Authorization': `Bearer ${this.$store.state.auth.token}`}}).then(r => r.blob())
                        .then(blob => saveAs(blob, "tabela.xlsx"))
                }).catch(error => console.log(error))
            },

            adjustTurno1: function() {
                if(this.turmaForm.Horario1== 1 || this.turmaForm.Horario1== 2 || this.turmaForm.Horario1== 7 || this.turmaForm.Horario1== 8 || this.turmaForm.Horario1== 13 || this.turmaForm.Horario1== 14 || this.turmaForm.Horario1== 19 || this.turmaForm.Horario1== 20 || this.turmaForm.Horario1== 25 || this.turmaForm.Horario1== 26 || this.turmaForm.Horario1== 3 || this.turmaForm.Horario1== 4 || this.turmaForm.Horario1== 9 || this.turmaForm.Horario1== 10 || this.turmaForm.Horario1== 15 || this.turmaForm.Horario1== 16 || this.turmaForm.Horario1== 21 || this.turmaForm.Horario1== 22 || this.turmaForm.Horario1== 27 || this.turmaForm.Horario1== 28){
                    this.turmaForm.turno1 = "Diurno"
                }else if(this.turmaForm.Horario1==31){
                    this.turmaForm.turno1 = "EAD"
                }else {
                    this.turmaForm.turno1 = "Noturno"
                }
            },

            adjustTurno2: function() {
                if(this.turmaForm.Horario2== 1 || this.turmaForm.Horario2== 2 || this.turmaForm.Horario2== 7 || this.turmaForm.Horario2== 8 || this.turmaForm.Horario2== 13 || this.turmaForm.Horario2== 14 || this.turmaForm.Horario2== 19 || this.turmaForm.Horario2== 20 || this.turmaForm.Horario2== 25 || this.turmaForm.Horario2== 26 || this.turmaForm.Horario2== 3 || this.turmaForm.Horario2== 4 || this.turmaForm.Horario2== 9 || this.turmaForm.Horario2== 10 || this.turmaForm.Horario2== 15 || this.turmaForm.Horario2== 16 || this.turmaForm.Horario2== 21 || this.turmaForm.Horario2== 22 || this.turmaForm.Horario2== 27 || this.turmaForm.Horario2== 28){
                   this.turmaForm.turno1 = "Diurno"
                }else if(this.turmaForm.Horario2==31){
                   this.turmaForm.turno1 = "EAD"
                }else {
                   this.turmaForm.turno1 = "Noturno"
              }
            },

            deleteSelected: function() {
                var turmas = this.$store.state.turma.Deletar
                for (var i = 0; i< turmas.length;i++) {
                    this.deleteTurma(turmas[i])
                }
                this.$store.commit('emptyDelete')
            },

            inPerfil: function (perfil, turmas, disciplinas) {
                return turmas.filter(function (turma) {
                    if(_.isNull(turma.Disciplina))
                        return false
                    var disciplina = _.find(disciplinas, function(disc) { return disc.id===turma.Disciplina})
                    return disciplina.Perfil===perfil.id
                })

            },

            addTurma() {
                EventBus.$emit('addTurma');
            },

            editTurma(turma) {
                turmaService.update(turma.id, turma).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Turma ${response.Turma.letra} foi atualizada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao atualizar Turma</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },

            deleteTurma(turma) {
                turma.periodo = null
                turma.letra = null
                turma.turno1 = null
                turma.turno2 = null
                turma.Disciplina = null
                turma.Docente1 = null
                turma.Docente2 = null
                turma.Horario1 = null
                turma.Horario2 = null
                turma.Sala1 = null
                turma.Sala2 = null
                console.log(turma)

                this.editTurma(turma)

                var pedidos = this.$store.state.pedido.Pedidos[turma.id]
                for (var i = 0; i < pedidos.length; i++){
                    if(!(pedidos[i].vagasPeriodizadas === 0 && pedidos[i].vagasNaoPeriodizadas === 0)) {
                        pedidos[i].vagasPeriodizadas = 0
                        pedidos[i].vagasNaoPeriodizadas = 0
                        pedidoService.update(pedidos[i].Curso, pedidos[i].Turma, pedidos[i]).then(() => {
                            this.$notify({
                                group: 'general',
                                title: `Sucesso!`,
                                text: `O pedido foi atualizado!`,
                                type: 'success'
                            })
                        }).catch(error => {
                            this.error = '<b>Erro ao atualizar Pedido</b>'
                            if (error.response.data.fullMessage) {
                                this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                            }
                        })
                    }
                }

            },

            toggleAdd() {
                this.isAdd = !this.isAdd;
            },

        },


        computed: {
            Cursos () {
                return _.orderBy(this.$store.state.curso.Cursos, 'posicao')
            },

            CursosAtivos () {
                return this.$store.state.curso.Ativos
            },

            Disciplinas () {
                return _.orderBy(this.$store.state.disciplina.Disciplinas,'nome')
            },

            Docentes () {
                return _.orderBy(_.filter(this.$store.state.docente.Docentes, ['ativo', true]),'apelido')
            },

            Horarios () {
                return _.orderBy(this.$store.state.horario.Horarios,'horario')
            },

            Salas () {
                return _.orderBy(this.$store.state.sala.Salas,'nome')
            },

            Perfis () {
                return this.$store.state.perfil.Perfis
            },

            Turmas () {

               return _.orderBy(_.orderBy(this.$store.state.turma.Turmas, 'letra'), 'Disciplina')
            },

            Deletar () {
                return this.$store.state.turma.Deletar
            },

            Pedidos () {
                return this.$store.state.pedido.Pedidos
            },

            isLoading () {
                return this.$store.state.isLoading
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

    .btn {
        height:25px;
        min-width: -webkit-max-content;
        min-width: -moz-max-content;
        min-width: max-content;
        font-size: 12px;
        padding: 0 5px 0 5px;
    }
     .botao-estilo{
        background-color: #0079fa !important;
        border-color: #0079fa !important;
    }

    .botao-estilo:hover{
        background-color: #0055af !important;
        border-color: #0055af !important;
    }
    
    .botao-estilo:focus{
        box-shadow: 0 0 0 0.2rem rgba(108, 136, 166, 0.5) !important;
    }
    .botao-estilo2 {
        background-color: #f51616 !important;
        border-color: #f51616 !important;
    }

    .botao-estilo2:hover {
        background-color: #c91212 !important;
        border-color: #c91212 !important;
    }

    .botao-estilo2:focus {
        -webkit-box-shadow: 0 0 0 0.2rem rgba(250, 110, 110, 0.5) !important;
        -moz-box-shadow: 0 0 0 0.2rem rgba(250, 110, 110, 0.5) !important;
        box-shadow: 0 0 0 0.2rem rgba(250, 110, 110, 0.5) !important;
    }

    .botao-perfis{
        background-color: #0055af !important;
        border-color: #0055af !important;
        max-width: 60px;
    }

    .botao-perfis:hover{
        background-color: #0079fa  !important;
        border-color: #0079fa !important;
    }
    
    .botao-perfis:focus{
        box-shadow: 0 0 0 0.2rem rgba(108, 136, 166, 0.5) !important;
    }
    .titulo{
        font-size:14px;
        font-weight: bold;
        padding-left: 0;
        margin:0;
    }
    .selectForm{
    height:26px !important;
    font-size: 12px !important;
    padding:0px 0px 0px 5px !important;
    }

    .custom-select{
        height:26px !important;
        font-size: 12px !important;
        padding:0px 0px 0px 10px !important;
    }

    .input-group-text{
        max-width: 70px;
        height:26px!important; 
        margin-left:-5px; 
        padding-left:15px; 
        font-size: 12px !important;
    }
    
    .DashboardPrototipo{
        max-width: 100%;
        overflow: hidden;
        margin:0;
    }

    .sticky {
        position: sticky;
        position: -webkit-sticky;
        top: -1px;
    }

    .cursoGrande {
        font-size: 7px !important;
    }

    table {
        display: block;
        overflow-y: scroll;
        height: -webkit-calc(100vh - 120px);
        height: -moz-calc(100vh - 120px);
        height: calc(100vh - 120px);
        font-size: 11px;
        background-color: #f5f5f5;
        margin:0;
    }

    tbody {
    /*top: 23px;*/
    max-height: 100%;
    width: 100%;
    }
    table td {
    text-align: center;
    vertical-align: middle;
    padding: 0 !important;
    }
    table p {
    margin-bottom: 0;
    text-align: center;
    }
    tr thead {
    display: block;
    }
    thead th {
    padding: 0 !important;
    font-size: 14px;
    text-align: center;
    height: 18px !important;
    }
    table select {
    height: 15px!important;
    text-align:left;
    }
    table input{
    height: 18px!important;
    text-align:center!important;
    }

    .cube1, .cube2 {
        background-color: #333;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        left: 0;

        -webkit-animation: cubemove 1.8s infinite ease-in-out;
        animation: cubemove 1.8s infinite ease-in-out;
    }

    .cube2 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }

    @-webkit-keyframes cubemove {
        25% {
            -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5)
        }
        50% {
            -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg)
        }
        75% {
            -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5)
        }
        100% {
            -webkit-transform: rotate(-360deg)
        }
    }

    @keyframes cubemove {
        25% {
            transform: translateX(42px) rotate(-90deg) scale(0.5);
            -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
        }
        50% {
            transform: translateX(42px) translateY(42px) rotate(-179deg);
            -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
        }
        50.1% {
            transform: translateX(42px) translateY(42px) rotate(-180deg);
            -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
        }
        75% {
            transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
            -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
        }
        100% {
            transform: rotate(-360deg);
            -webkit-transform: rotate(-360deg);
        }
    }
</style>
