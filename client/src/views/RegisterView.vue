<script setup lang="ts">
import router from "@/router"
import { ref } from "vue"
import { useStore } from "vuex"

const store = useStore()
const username = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const isError = ref(false)

const registerUser = async () => {
  if (
    username.value === "" ||
    email.value === "" ||
    password.value === "" ||
    password.value !== confirmPassword.value
  ) {
    isError.value = true
  } else {
    await store
      .dispatch("register", {
        username: username.value,
        email: email.value,
        password: password.value,
      })
      .then(() => {
        if (!store.state.user) {
          isError.value = true
        } else {
          router.push("/")
        }
      })
  }
}
</script>

<template>
  <div class="form-wrap">
    <h2>新規登録</h2>
    <form v-on:submit.prevent="registerUser">
      <p class="error-message" v-if="isError">
        入力欄が正しく入力されていません。
      </p>
      <label>ユーザー名</label>
      <input type="text" placeholder="username" required v-model="username" />
      <label>メールアドレス</label>
      <input type="text" placeholder="email" required v-model="email" />
      <label>パスワード</label>
      <input
        type="password"
        placeholder="password"
        required
        v-model="password"
      />
      <label>確認用パスワード</label>
      <input
        type="password"
        placeholder="confirm password"
        v-model="confirmPassword"
      />
      <button type="submit">登録する</button>
      <router-link to="/login">ログイン</router-link>
    </form>
  </div>
</template>

<style>
.error-message {
  color: red;
}
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
