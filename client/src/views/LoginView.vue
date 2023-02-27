<script setup lang="ts">
import router from "@/router"
import { ref } from "vue"
import { useStore } from "vuex"

const store = useStore()
const usernameOrEmail = ref("")
const password = ref("")

const handleLogin = async () => {
  try {
    await store
      .dispatch("login", {
        usernameOrEmail: usernameOrEmail.value,
        password: password.value,
      })
      .then(() => {
        router.push("/")
      })
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="form-wrap">
    <h2>ログイン</h2>
    <form v-on:submit.prevent="handleLogin">
      <label>ユーザー名 or Email</label>
      <input type="text" placeholder="username" v-model="usernameOrEmail" />
      <label>Password</label>
      <input type="password" placeholder="password" v-model="password" />
      <button type="submit">Sign In</button>
      <router-link to="/register">新規登録</router-link>
    </form>
  </div>
</template>

<style>
.form-wrap {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 2%;
  max-width: 800px;
  margin: 0 auto;
}
h2 {
  font-weight: bold;
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  max-width: 560px;
  margin: 20px auto;
}
input {
  font-size: 16px;
  padding: 0.5em;
}
button {
  font-size: 16px;
  padding: 0.5em;
  cursor: pointer;
}
</style>
