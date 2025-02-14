<template>
  <div>
    <HeaderPanel :temaNum="tema" />
    <div class="container">
      <div class="center-panel">
        <div class="login-container-box welcome">
          <h1>Bem-vindo de volta!</h1>
          <p>Insira os seus dados para ter acesso ao sistema.</p>
        </div>
        <div class="login-container-box">
          <h1>Login</h1>
          <form @submit.prevent="login">
            <div class="entries-field">
              <div class="form-item">
                <label>Usuário</label>
                <input v-model="user" type="text" />
              </div>
              <div class="form-item">
                <label>Senha</label>
                <input v-model="password" type="password" />
              </div>
            </div>
            <button>Recuperar senha</button>
            <button type="submit">Entrar</button>
            <button @click="loginComoVisitante">Entrar como visitante</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, inject, ref } from "vue";
import { corSelect } from "../controllers/themeController.js";
import { useRouter } from "vue-router";
import HeaderPanel from "@/components/common/HeaderPanel.vue";

export default defineComponent({
  name: "ProdutoTable",
  components: {
    HeaderPanel,
  },
  props: {
    temaNum: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const user = ref("");
    const password = ref("");
    const login = () => {
      if (user.value === "tenkel33" && password.value === "445530") {
        router.push("/produto");
      } else {
        alert("Usuário ou senha incorretos.");
      }
    };
    const loginComoVisitante = () => {
      router.push("/produto");
    };

    const tema = inject("tema");

    const cores = (tema, cor) => {
      return corSelect(tema, cor);
    };

    return {
      tema,
      cores,
      login,
      loginComoVisitante,
      router,
      user,
      password,
    };
  },
});
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.container {
  background-color: v-bind(cores(tema, 0));
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100vh;
  transition: background-color 0.3s, border-color 0.3s;
}

h1 {
  color: v-bind(cores(tema, 2));
  text-align: center;
  margin-bottom: 0;
  transition: background-color 0.3s, border-color 0.3s;
}

.overlay {
  background-color: rgba(72, 72, 72, 0.164);
  backdrop-filter: blur(30px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  transition: background-color 0.3s, border-color 0.3s;
}

.center-panel {
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 10px 4px rgba(177, 177, 177, 0.8); /* Neon azul */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: background-color 0.3s, border-color 0.3s;
}

.login-container-box {
  background-color: v-bind(cores(tema, 0));
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 450px;
  transition: background-color 0.3s, border-color 0.3s;
}

.welcome {
  background-color: v-bind(cores(tema, 4));
  color: v-bind(cores(tema, 20));
  padding: 40px;
  text-align: center;
  transition: background-color 0.3s, border-color 0.3s;
}
.welcome h1 {
  color: v-bind(cores(tema, 20));
}
form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 80%;
}

.entries-field {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.form-item {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-item label {
  width: 20%;
  text-align: right;
  margin-right: 15px;
  color: v-bind(cores(tema, 2));
}

input {
  outline: none;
  width: 70%;
  height: 30px;
  border: none;
  background-color: v-bind(cores(tema, 0));
  border-radius: 15px;
  padding: 5px 10px;
  border: 1px solid v-bind(cores(tema, 12));
  box-shadow: 1px 1px 2px v-bind(cores(tema, 22));
  transition: background-color 0.3s, border-color 0.3s;
}

button {
  background-color: v-bind(cores(tema, 0));
  color: v-bind(cores(tema, 2));
  padding: 10px 10px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  border: 1px solid v-bind(cores(tema, 12));
  box-shadow: 1px 1px 2px v-bind(cores(tema, 22));
  transition: background-color 0.3s, border-color 0.3s;
  box-sizing: border-box;
  width: 150px;
}

button:hover {
  background-color: v-bind(cores(tema, 4));
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.307);
  color: v-bind(cores(tema, 20));
}
</style>
