<template>
    <div style="width:32px;">
        <input v-if="pedidoForm.vagasPeriodizadas == 0" type="text" v-model="pedidoForm.vagasPeriodizadas" style="margin-top:1px; margin-bottom:1px; color:#DADADA;"
               v-on:change="editPedido(pedido)">
        <input v-else type="text" v-model="pedidoForm.vagasPeriodizadas" style="margin-top:1px; margin-bottom:1px;  background-color: #DCDCDC;"
                v-on:change="editPedido(pedido)">
        <input v-if="pedidoForm.vagasNaoPeriodizadas == 0" type="text" v-model="pedidoForm.vagasNaoPeriodizadas" style=" color:#DADADA;"
                v-on:change="editPedido(pedido)">
        <input v-else type="text" v-model="pedidoForm.vagasNaoPeriodizadas" style="background-color: #DCDCDC;"
                v-on:change="editPedido(pedido)">
    </div>
</template>
<script>
    import pedidoService from '../../common/services/pedido'
    import _ from 'lodash'

    const emptyPedido =  {
        vagasPeriodizadas: 0,
        vagasNaoPeriodizadas: 0,
        Curso: undefined,
        Turma: undefined,
    }

    export default {
        name:'TurmaPedido',

        props: {
            turma: Object,
            index: Number,
        },

        data () {
            return {
                ativo: false,
                valorAtual:undefined,
                pedidoForm: _.clone(emptyPedido)
            }
        },
        mounted:function (){
            this.pedidoForm = _.clone(this.$store.state.pedido.Pedidos[this.turma.id][this.index])

        },

        methods: {

            editPedido() {
                console.log(this.$store.state.pedido.Pedidos[this.turma.id][this.index])
                pedidoService.update(this.pedidoForm.Curso, this.pedidoForm.Turma, this.pedidoForm).then((response) => {
                    this.$notify({
                        group: 'general',
                        title: `Sucesso!`,
                        text: `O pedido foi atualizado!`,
                        type: 'success'
                    })
                    console.log(this.$store.state.pedido.Pedidos[this.turma.id][this.index])
                }).catch(error => {
                    this.error = '<b>Erro ao atualizar Pedido</b>'
                    if (error.response.data.fullMessage) {
                        this.error += '<br/>' + error.response.data.fullMessage.replace('\n', '<br/>')
                    }
                })
            }

        },

        computed: {
            pedido () {
                return this.$store.state.pedido.Pedidos[this.turma.id][this.index]
            }
        },

        watch: {
            pedido: function () {
                this.pedidoForm = _.clone(this.$store.state.pedido.Pedidos[this.turma.id][this.index])
            }
        }

    }
</script>
<style scoped>  
    td {
        text-align: center;
        vertical-align:middle;
        padding: 0;
        height:40px;
    }
    input {
        width: 25px;
        height:15px;
        text-align: center!important;
    }
    @-moz-document url-prefix() {
        input{
            height: 18px!important;
            text-align:center;
            box-sizing: border-box;
            
            line-height: 8px;
            border: 0.5px solid rgb(160, 160, 160);
            border-radius: 2px;
            background-color:rgb(245, 245, 245);
        }
    }
    
</style>