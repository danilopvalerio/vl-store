<template>
    <div class="FooterPanel">
        <button class="btn">Voltar</button>
    </div>
</template>

<style scoped>
.FooterPanel {
    background-color: v-bind(cor4);
    box-sizing: border-box;
    width: 100%;
    height: 80px; /* Altura fixa do painel */
    padding: 0 20px; /* Ajuste de espaçamento nas laterais */
    display: flex;
    justify-content: center; /* Centraliza o conteúdo horizontalmente */
    align-items: center; /* Centraliza o conteúdo verticalmente */
}

.btn {
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 13;
    background-color: v-bind(cor0);
    color: v-bind(cor3);
}

.btn:hover {
    background-color: v-bind(cor4);
    color: v-bind(cor0);
    
}
</style>

<script>
export default {
    props: {
        paleta: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            cor0: this.paleta[0],
            cor1: this.paleta[1],
            cor2: this.paleta[2],
            cor3: this.paleta[3],
            cor4: this.paleta[4],
            cor5: this.paleta[5],
            cor6: this.paleta[6],
        };
    },
};
</script>
