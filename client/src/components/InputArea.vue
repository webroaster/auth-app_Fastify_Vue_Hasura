<script setup lang="ts">
import axios from "../axios-for-auth"
import { ref, watch } from "vue"
import type { PropType } from "vue"
import type User from "@/types/User"

const username = ref("")
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const isUpdate = ref(false)
const isError = ref(false)

const handleCancel = () => {
  isUpdate.value = false
  username.value = ""
  email.value = ""
  password.value = ""
}

// ユーザー作成
const createUser = async () => {
  if (
    username.value === "" ||
    email.value === "" ||
    password.value === "" ||
    password.value !== confirmPassword.value
  ) {
    isError.value = true
  } else {
    await axios.post("/create", {
      username: username.value,
      email: email.value,
      password: password.value,
    })
  }
}

// 更新するユーザー情報を受け取る
const props = defineProps({
  editData: {
    type: Object as PropType<User>,
    required: true,
  },
})
watch(
  () => props.editData,
  () => {
    isUpdate.value = true
    username.value = props.editData.username
    email.value = props.editData.email
    password.value = props.editData.password
  }
)
// ユーザー更新
const updateUser = async () => {
  if (
    username.value === "" ||
    email.value === "" ||
    password.value === "" ||
    password.value !== confirmPassword.value
  ) {
    isError.value = true
  } else {
    await axios.post("/update", {
      id: props.editData.id,
      username: username.value,
      email: email.value,
      password: password.value,
    })
  }
}
</script>

<template>
  <form>
    <p class="error-message" v-if="isError">
      入力欄が正しく入力されていません。
    </p>
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
    <label for="confirmPassword">確認用パスワード</label>
    <input
      type="password"
      placeholder="confirmPassword"
      id="confirmPassword"
      v-model="confirmPassword"
      required
    />
    <div v-if="!isUpdate">
      <button @click="createUser">ユーザー追加</button>
    </div>
    <div v-else>
      <button class="update-button" @click="updateUser">更新</button>
      <button class="cancel-button" @click="handleCancel">キャンセル</button>
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
button + button {
  margin-left: 1em;
}
button:hover {
  opacity: 0.8;
}

.update-button {
  background: #5283c3;
}
.cancel-button {
  background: #be3939;
}
</style>
