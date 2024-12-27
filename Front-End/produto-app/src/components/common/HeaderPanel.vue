<template>
    <div class="headerPanel">
        <div class="logo_panel">
            <img src="./../../assets/images/vl-store-logo-white.svg" />
        </div>
    </div>
</template>

<style scoped>
.headerPanel {
    background-color: v-bind(cor5);
    box-sizing: border-box;
    width: 100%;
    height: 80px; /* Altura fixa do painel */
    padding: 0 20px; /* Ajuste de espaçamento nas laterais */
    display: flex;
    justify-content: center; /* Centraliza o conteúdo horizontalmente */
    align-items: center; /* Centraliza o conteúdo verticalmente */
}

/* Logo */
.logo_panel {
    width: 100%; /* A logo vai ocupar toda a largura disponível */
    display: flex;
    justify-content: center; /* Centraliza a logo horizontalmente */
    align-items: center; /* Centraliza a logo verticalmente */
    height: 100%; /* A logo terá a altura total do painel */
}

.logo_panel img {
    width: auto; /* Ajusta a largura automaticamente */
    max-height: 80%; /* Garante que a altura da logo não ultrapasse 80% da altura do painel */
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
            cor1: this.paleta[0],
            cor2: this.paleta[1],
            cor3: this.paleta[2],
            cor4: this.paleta[3],
            cor5: this.paleta[4],
            cor6: this.paleta[5],
            cor7: this.paleta[6],
        };
    },
};
</script>
