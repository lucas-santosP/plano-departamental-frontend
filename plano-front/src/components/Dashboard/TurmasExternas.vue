<template>
    <div class="TurmasExternas row" style="height: 100%; max-width:100%;" v-if="Admin">
        <div class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <div class="form-inline col">
                <h1 class="h2 col-1">Plano</h1>

                <div class="form-group col-lg-5 col-md-6 col-sm-6 col-12" style="margin-left: auto;">
                    <b-form-select v-model="periodos" class="formSelect col-lg-4 col-md-4 col-sm-8 col-10" style="margin-right:15px">
                        <option value = "1">Primeiro</option>
                        <option value = "2">Segundo</option>
                        <option value = "3">Ambos</option>
                    </b-form-select>
                    <template v-if="isAdd">
                        <button type="button" class="btn btn-sm btn-success col-1 botao-estilo" style="margin-left:0" v-on:click.prevent="addTurma" > Confirmar </button>
                        <button type="button" class="btn btn-sm btn-success col-1 botao-estilo2" v-on:click.prevent="toggleAdd"> Cancelar </button>
                    </template>
                    <template v-else>
                        <button type="button" class="btn btn-sm btn-success col-1" style="margin-left:0" v-on:click.prevent="toggleAdd">Adicionar </button>
                        <button type="button" class="btn btn-sm btn-success col-1 botao-estilo2" style="" v-b-modal.modalConfirma> Deletar </button>

                        <b-modal id="modalConfirma" title="Confirmar Seleção" @ok="deleteSelected">
                            <p class="my-4">Tem certeza que deseja deletar as turmas selecionadas?</p>
                            <template v-for="turma in Deletar">
                                <template v-for="disciplina in Disciplinas">
                                    <template v-if="disciplina.id===turma.Disciplina">
                                        <p :key="'disciplina'+disciplina.id+'tirma'+turma.id" style="width:80px">Disciplina:{{disciplina.codigo}}<br>Turma:{{turma.letra}}</p>
                                    </template>
                                </template>
                            </template>

                        </b-modal>
                    </template>
                </div>
            </div>
        </div>
        <div class="w-100"></div>
        <div id="loading" v-if="isLoading">
            <div class="cube1"></div>
            <div class="cube2"></div>
        </div>

        <div class="pl-4 scroll-estilizado" style="overflow-y: scroll;" v-if="!isLoading">

            <table class="table table-hover table-bordered table-sm scroll-estilizado mr-1" style="height:calc(100vh - 190px);font-size:13px;">
                <thead class="thead-light sticky">
                <tr>
                    <div style="display: block; overflow: hidden;" class="sticky">
                        <th scope="col"> <p class="p-header" style="width:32px !important;">S.</p> </th>
                        <th scope="col"> <p class="p-header" style="width:70px !important;">Cod</p> </th>
                        <th scope="col"> <p class="p-header" style="width:300px !important">Disciplina</p> </th>
                        <th scope="col"> <p class="p-header" style="width:25px !important;">C.</p> </th>
                        <th scope="col"> <p class="p-header" style="width:50px !important;">Turma</p> </th>
                        <th scope="col"> <p class="p-header" style="width:90px !important;">Turno</p> </th>
                        <th scope="col"> <p class="p-header" style="width:100px !important;">Horário</p> </th>
                        <th scope="col"> <p class="p-header" style="width:95px !important;">Sala</p> </th>
                        <th scope="col"> <p class="p-header" style="width:40px !important;">Total</p> </th>
                        <template v-for="curso in Cursos">
                            <th scope="col" style="width:40px !important;"  :key="'curso'+curso.id" :id="'curso'+curso.id">{{curso.codigo}}</th>
                            <b-popover :key="curso.id" :target="'curso'+curso.id" placement="bottom" triggers="hover focus">
                                <p v-if="curso.semestreInicial==1 || curso.semestreInicial==3" class="p-header" >1º - {{curso.alunosEntrada}}</p>
                                <p v-if="curso.semestreInicial==2 || curso.semestreInicial==3" class="p-header" >2º - {{curso.alunosEntrada}}</p>
                            </b-popover>
                        </template>
                    </div>
                </tr>
                </thead>

                <tbody>
                <!-- Adição de turma-->
                    <template v-if="isAdd">
                        <tr>
                            <td>
                                <input type="text" style="width:25px; text-align:center;" id="periodo" v-model="turmaForm.periodo">
                            </td>

                            <td >
                                <select type="text" style="width:25px;" id="disciplina" v-model="turmaForm.Disciplina">
                                    <option v-if="DisciplinasCod.length===0" type="text" value="">Nenhuma Disciplina Encontrada</option>
                                    <option v-for="disciplina in DisciplinasCod" :key="disciplina.id" :value="disciplina.id">{{disciplina.codigo}}</option>
                                </select>
                            </td>

                            <td >
                                <select type="text" style="width:25px; text-align:center;"  id="disciplina" v-model="turmaForm.Disciplina">
                                    <option v-if="Disciplinas.length===0" type="text" value="">Nenhuma Disciplina Encontrada</option>
                                    <option v-for="disciplina in Disciplinas" :key="disciplina.id" :value="disciplina.id">{{disciplina.nome}}</option>
                                </select>
                            </td>
                            <td >
                                <p style="width:25px; text-align:center;" >
                                    <template v-for="disciplina in Disciplinas">
                                        <template v-if="disciplina.id===turmaForm.Disciplina">
                                            {{disciplina.cargaPratica + disciplina.cargaTeorica}}
                                        </template>
                                    </template>
                                </p>
                            </td>
                            <td>
                                <input type="text" style="width:25px; text-align:center;"  id="turma" v-model="turmaForm.letra">
                            </td>
                            <td>
                                <select type="text" style="width:25px; text-align:center;"  id="turno1" v-model="turmaForm.turno1" v-on:change="setEad">
                                    <option value="Diurno">Diurno</option>
                                    <option value="Noturno">Noturno</option>
                                    <option value="EAD">EAD</option>
                                </select>
                                <br/>
                            </td>
                            <td>
                                <select type="text" style="width:25px; text-align:center;"  id="horario1" v-model="turmaForm.Horario1" v-on:change="adjustTurno1">
                                    <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                                    <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
                                </select>
                                <br/>
                                <select type="text" style="width:25px; text-align:center;"  id="horario2" v-model="turmaForm.Horario2" v-on:change="adjustTurno2">
                                    <option v-if="Horarios.length===0" type="text" value="">Nenhum Horário Encontrado</option>
                                    <option v-for="horario in Horarios" :key="horario.id" :value="horario.id">{{horario.horario}}</option>
                                </select>
                            </td>
                            <td>
                                <select type="text" style="width:25px; text-align:center;"  id="sala1" v-model="turmaForm.Sala1">
                                    <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                                    <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
                                </select>
                                <br/>
                                <select type="text" style="width:25px; text-align:center;"  id="sala2" v-model="turmaForm.Sala2">
                                    <option v-if="Salas.length===0" type="text" value="">Nenhuma Sala Encontrada</option>
                                    <option v-for="sala in Salas" :key="sala.id" :value="sala.id">{{sala.nome}}</option>
                                </select>
                            </td>
                        </tr>
                    </template>

                    <!--FINAL ADIÇÃO DE TURMA-->
                    <template v-if="Turmas.length>0">
                        <template v-for="perfil in Perfis">
                            <tr v-for="turma in inPerfil(perfil, Turmas, Disciplinas)" v-if="turma.periodo==1 && (periodos == 1 || periodos==3)" :key="turma.id"  v-bind:class="{'basico':perfil.id==1,'avancado':perfil.id==2, 'arqso':perfil.id==3,
                    'bancosdedados':perfil.id==4, 'computacaografica':perfil.id==5, 'engenhariasoftware':perfil.id==6, 'iaic':perfil.id==7, 'numoc':perfil.id==8, 'redes':perfil.id==9, 'teoria':perfil.id==10,
                    'humempre':perfil.id==11, 'multi': perfil.id==12, 'ice':perfil.id==13}">
                                <turmadata v-bind:turma="turma" v-bind:perfil="perfil"></turmadata>
                            </tr>
                        </template>
                        <template v-for="perfil in Perfis">
                            <tr v-for="turma in inPerfil(perfil, Turmas, Disciplinas)" v-if="turma.periodo==3 && (periodos==2 || periodos==3)" :key="turma.id"  v-bind:class="{'basico':perfil.id==1,'avancado':perfil.id==2, 'arqso':perfil.id==3,
                    'bancosdedados':perfil.id==4, 'computacaografica':perfil.id==5, 'engenhariasoftware':perfil.id==6, 'iaic':perfil.id==7, 'numoc':perfil.id==8, 'redes':perfil.id==9, 'teoria':perfil.id==10,
                    'humempre':perfil.id==11, 'multi': perfil.id==12, 'ice':perfil.id==13}">
                                <turmadata v-bind:turma="turma" v-bind:perfil="perfil"></turmadata>
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
    import turmaExternaService from '../../common/services/turmaExterna'
    import pedidoExternoService from '../../common/services/pedidoExterno'
    import turmadata from './TurmaExternaRow.vue'
    const emptyTurma = {
        id:undefined,
        periodo:undefined,
        letra:undefined,
        turno1:undefined,
        turno2:undefined,
        Disciplina:undefined,
        Horario1:undefined,
        Horario2:undefined,
        Sala1:undefined,
        Sala2:undefined
    }
    const emptyPedido =  {
        vagasPeriodizadas: 0,
        vagasNaoPeriodizadas: 0,
        Curso: undefined,
        Turma: undefined,
    }
    export default {
        name: 'DashboardTurmasExternas',
        data () {
            return {
                turmaForm: _.clone(emptyTurma),
                error: undefined,
                isAdd:false,
                atual:undefined,
                semestre: 1,
                periodos: 3,
            }
        },
        components: {
            turmadata
        },
        /*
        mounted () {
            this.$store.commit('emptyDelete')
            console.log(this.$store.state.turma.Deletar)
            this.$store.commit(COMPONENT_LOADED)
        },
        */
        methods: {
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
            setEad: function() {
                if(this.turmaForm.turno1 === "EAD"){
                    this.turmaForm.Horario1 = 31
                    if(this.turmaForm.Horario2 > 0)
                        this.turmaForm.Horario2 = null
                }
            },
            deleteSelected: function() {
                var turmas = this.$store.state.turmaExterna.Deletar
                for (var i = 0; i< turmas.length;i++) {
                    this.deleteTurma(turmas[i])
                }
                this.$store.commit('emptyDeleteExterno')
            },
            inPerfil: function (perfil, turmas, disciplinas) {
                return turmas.filter(function (turma) {
                    var disciplina = _.find(disciplinas, function(disc) { return disc.id===turma.Disciplina})
                    return disciplina.Perfil===perfil.id
                })
            },
            addTurma() {
                turmaExternaService.create(this.turmaForm).then((response) => {
                    this.semestre = response.Turma.periodo
                    for (var i = 0; i< 4; i++){
                        var pedido = _.clone(emptyPedido)
                        pedido.Curso = this.$store.state.curso.Cursos[i].id
                        pedido.Turma = response.Turma.id
                        pedidoExternoService.create(pedido).then((response) => {
                            console.log(response.Pedido)
                        }).catch(error => {console.log("erro ao criar pedido: "+error)})
                    }
                    this.cleanTurma()
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Turma ${response.Turma.letra} foi criada!`,
                        type: 'success'
                    })
                }).
                catch(error => {
                    this.error = '<b>Erro ao criar Turma</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            },
            editTurma(turma) {
                turmaExternaService.update(turma.id, turma).then((response) => {
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
                turmaExternaService.delete(turma.id, turma).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `A Turma ${response.Turma.letra} foi excluída!`,
                        type: 'success'
                    })
                }).
                catch(() => {
                    this.error = '<b>Erro ao excluir Turma</b>'
                })
            },
            cleanTurma() {
                this.turmaForm = _.clone(emptyTurma)
                this.turmaForm.periodo = this.semestre
                this.turmaForm.letra = "A"
                this.error = undefined
            },
            toggleAdd() {
                this.cleanTurma()
                this.isAdd = !this.isAdd;
            },
        },
        computed: {
            Cursos () {
                return _.slice(this.$store.state.curso.Cursos, 0, 4)
            },
            Disciplinas () {
                return _.orderBy(_.filter(this.$store.state.disciplina.Disciplinas, function(d) {return d.Perfil==13}),'nome')
            },
            DisciplinasCod () {
                return _.orderBy(_.filter(this.$store.state.disciplina.Disciplinas, function(d) {return d.Perfil==13}),'codigo')
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
                return _.orderBy(_.orderBy(this.$store.state.turmaExterna.Turmas, 'letra'), 'Disciplina')
            },
            Deletar () {
                return this.$store.state.turmaExterna.Deletar
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
<style>
    .avancado {
        background-color: #7c997f !important;
    }
    .basico {
        background-color: #a76663 !important;
    }
    .arqso {
        background-color: #a4a75a !important;
    }
    .bancosdedados {
        background-color: #60a75a !important;
    }
    .computacaografica {
        background-color: #a75877 !important;
    }
    .engenhariasoftware {
        background-color: #34a9f6 !important;
    }
    .iaic {
        background-color: #a449f6 !important;
    }
    .numoc {
        background-color: #a7000c !important;
    }
    .redes {
        background-color: #0f0da7 !important;
    }
    .teoria {
        background-color: #0aa702 !important;
    }
    .humempre {
        background-color: #0e6ba7 !important;
    }
    .multi {
        background-color: #9100a7 !important;
    }
    .ice {
    }
</style>

<style scoped>

    .TurmasExternas{
        max-width: 100%;
        overflow: hidden;
    }
    .btn{
        margin-top: 7px;
        margin-bottom: 7px;
        margin-left:15px;
        min-width: max-content;
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

    .botao-estilo2{
        background-color: #f51616 !important;
        border-color: #f51616 !important;
    }

    .botao-estilo2:hover{
        background-color: #c91212  !important;
        border-color: #c91212 !important;
    }
    
    .botao-estilo2:focus{
        box-shadow: 0 0 0 0.2rem rgba(250, 110, 110, 0.5) !important;
    }
    .header {
        display: inline-block;
    }
    table{
        display: block;
        overflow-x: scroll;
        background-color: #F5F5F5;
        border: #808080 solid 2px;
    }

    tbody{
        top: 23px;
        display:block;
        max-height: 100%;
        width:100%;
    }
    tr thead {
        display:block;
    }
     tr thead p{
        margin-bottom: 0;
        text-align: center;
    }
    .sticky {
        position: sticky;
        position: -webkit-sticky;
        top: 0;
    }
    thead th{
        padding: 0!important;
        font-size: 14px;
        text-align: center;
        height: 25px !important;
    }
    .p-header{
        padding: 4px 0 4px 0;
        margin:0;
        font-size: 13px;
        text-align: center;
    }

    .scroll-estilizado::-webkit-scrollbar-track {
    background-color: #F4F4F4;
    }
    .scroll-estilizado::-webkit-scrollbar {
        width: 6px;
        background: #F4F4F4;
    }
    .scroll-estilizado::-webkit-scrollbar-thumb {
        background: #666;
    }
</style>