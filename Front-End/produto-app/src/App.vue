<template>
    <div class="app">
        <HeaderPanel :paleta="paleta" />
        <ProdutoTable :paleta="paleta" />
        <FooterPanel :paleta="paleta" />
    </div>
</template>

<style>
* {
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
}

/* Layout principal */
.app {
    background-color: #202020;
    display: flex;
    width: 100%;
    height: 100vh;
    font-size: 16px;
    flex-direction: column;
}
</style>
<script>
import ProdutoTable from './components/ProdutoTable.vue';
import HeaderPanel from './components/common/HeaderPanel.vue';
import FooterPanel from './components/common/FooterPanel.vue';
export default {
    name: 'App',
    components: {
        ProdutoTable,
        HeaderPanel,
        FooterPanel,
    },
    data() {
        return {
            paleta: [
                '#FFFFFF',
                '#F0F0F0',
                '#000000',
                '#363F4E',//#363F4E
                '#590728',
                '#ff5c5c',
                '#B5B5B5',
                'rgba(0, 0, 0, 0.3)',
                'rgba(164, 164, 164, 0.185)'
            ],
        };
    },
};
</script>
