<template>
    <div class="app">
        <ProdutoView :tema="this.tema" />
    </div>
</template>

<style scope>
* {
    font-family: 'Montserrat', sans-serif;
    box-sizing: border-box;
}

/* Layout principal */
.app {
    display: flex;
    width: 100%;
    height: 100vh;
    font-size: 16px;
    flex-direction: column;
}
</style>
<script>
import ProdutoView from './components/ProdutoView.vue';
export default {
    name: 'App',
    components: {
        ProdutoView,
    },
    data() {
        return {
            tema: 1,
        };
    },
};
</script>
