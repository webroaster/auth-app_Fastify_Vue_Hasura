<script setup lang="ts">
import axios from "../axios-for-auth"
import { ref } from "vue"

const username = ref("")
const email = ref("")
const password = ref("")
const isUpdate = ref(false)

const handle = () => {
  isUpdate.value = !isUpdate.value
}

// ユーザー作成
const createUser = async () => {
  try {
    await axios.post("/create", {
      username: username.value,
      email: email.value,
      password: password.value,
    })
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <form>
    <label for="username">ユーザー名</label>
    <input
      type="text"
      id="username"
      placeholder="username"
      v-model="username"
      required
    />
    <label for="email">メールアドレス</label>
    <input
      type="text"
      id="email"
      placeholder="foo@example.com"
      v-model="email"
      required
    />
    <label for="password">パスワード</label>
    <input
      type="password"
      placeholder="password"
      id="password"
      v-model="password"
      required
    />
    <div v-if="!isUpdate">
      <button @click="createUser">ユーザー追加</button>
    </div>
    <div v-else>
      <button @click="handle">更新</button>
    </div>
  </form>
</template>

<style scoped>
button {
  border: none;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  padding: 0.5em 1em;
  background: #58908a;
  color: white;
}
button:hover {
  opacity: 0.8;
}
</style>
