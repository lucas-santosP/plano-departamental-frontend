<template>
    <div  style="display:block; overflow: hidden" class="sticky">
        <th scope="col"><p style="width:24px !important;">S.</p></th>
        <th scope="col"><p style="width:70px !important;">Cod</p></th>
        <th scope="col"><p style="width:330px !important;">Disciplina</p></th>
        <th scope="col"><p style="width:18px !important;">C.</p></th>
        <th scope="col"><p style="width:40px !important;">Turma</p></th>
        <th scope="col"><p style="width:130px !important;">Docente</p></th>
        <th scope="col"><p style="width:68px !important;">Turno</p></th>
        <th scope="col"><p style="width:72px !important;">Horário</p></th>
        <th scope="col"><p style="width:98px !important;">Sala</p></th>
        <th scope="col"><p style="width:32px !important;">Total</p></th>
        <template v-for="curso in Cursos">
            <template  v-if="CursosAtivos[curso.id]">  
                <th :key="curso.id" :id="'curso'+curso.id">
                    <p v-bind:class="{'cursoGrande':big(curso.codigo)}" style="width: 32px !important;" v-on:mouseover="">
                        {{curso.codigo}}
                    </p>
                </th>
                
                <b-popover :target="'curso'+curso.id" placement="bottom" triggers="hover focus">
                    <p style="font-size: 11px" v-if="curso.semestreInicial==1 || curso.semestreInicial==3">1º - {{curso.alunosEntrada}}</p>
                    <p style="font-size: 11px" v-if="curso.semestreInicial==2 || curso.semestreInicial==3">2º - {{curso.alunosEntrada2}}</p>
                    <p style="font-size: 11px">{{curso.nome}}</p>
                </b-popover>
            </template>
        </template>
    </div>
</template>
<script>
    import _ from 'lodash'

    export default {
        name:'TurmaHeader',

        methods: {
            big(nome){
                if(nome.length > 4)
                    return true
                else
                    return false
            },
        },

        computed: {
            Cursos () {
                return _.orderBy(this.$store.state.curso.Cursos, 'posicao')
            },

            CursosAtivos () {
                return this.$store.state.curso.Ativos
            }
        }
    }
</script>
<style scoped>

    .cursoGrande {
        font-size: 7px !important;
    }

    .sticky {
        position: sticky;
        position: -webkit-sticky;
        top: 0;
    }

    p{
        padding: 0px 0 0px 0;
        margin: 0;
        font-size: 11px;
        text-align: center;
        height:18px;
    }

    th{
        padding: 0!important;
        font-size: 10px;
        text-align: center;
        height: 16px !important;
    }

</style>