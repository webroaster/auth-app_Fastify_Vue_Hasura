<script setup lang="ts">
import router from "@/router"
import { ref } from "vue"
import { useStore } from "vuex"

const store = useStore()
const username = ref("")
const email = ref("")
const password = ref("")

const registerUser = async () => {
  try {
    await store
      .dispatch("register", {
        username: username.value,
        email: email.value,
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
    <h2>新規登録</h2>
    <form v-on:submit.prevent="registerUser">
      <label>ユーザー名</label>
      <input type="text" placeholder="username" v-model="username" />
      <label>Email</label>
      <input type="text" placeholder="email" v-model="email" />
      <label>Password</label>
      <input type="password" placeholder="password" v-model="password" />
      <button type="submit">登録する</button>
      <router-link to="/login">ログイン</router-link>
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
