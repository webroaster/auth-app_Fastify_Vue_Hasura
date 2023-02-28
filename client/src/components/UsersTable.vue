<script setup lang="ts">
import { ref, onMounted, defineEmits } from "vue"
import axios from "../axios-for-auth"

interface Users {
  id: number
  username: string
  email: string
  password: string
}

const users = ref<Users[]>([])

const getUsers = async () => {
  try {
    const response = await (await axios.get("/users")).data.users_users
    users.value = response
  } catch (err) {
    console.error(err)
  }
}

// 全てのユーザー取得
onMounted(() => {
  getUsers()
})

// ユーザーの削除
const deleteUser = async (id: number) => {
  try {
    await axios.post("/delete", {
      id: id,
    })
    getUsers()
  } catch (err) {
    console.error(err)
  }
}

const emit = defineEmits(["click-edit"])
const onClickEdit = (
  id: number,
  username: string,
  email: string,
  password: string
) => {
  const editData = { id, username, email, password }
  emit("click-edit", editData)
}
</script>

<template>
  <table>
    <tr>
      <th>username</th>
      <th>email</th>
      <th>password</th>
    </tr>
    <tr v-for="(user, i) in users" :key="i">
      <td>{{ user.username }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.password }}</td>
      <td class="edit-wrap">
        <button
          @click="
            onClickEdit(user.id, user.username, user.email, user.password)
          "
          class="edit-bottom"
        >
          edit
        </button>
        <button @click.prevent="deleteUser(user.id)" class="delete-bottom">
          delete
        </button>
      </td>
    </tr>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  max-width: 800px;
  margin: 30px auto;
  border-collapse: collapse;
  background: #f8f8f8;
}

tr:nth-of-type(even) {
  background: #dcdcdc;
}

th {
  padding: 0.4em;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}

td {
  padding: 0.4em 1em;
  font-weight: normal;
  text-align: left;
}

.edit-wrap {
  text-align: right;
}

.edit-bottom {
  font-size: 14px;
  border: none;
  border-radius: 99px;
  padding: 0.3em 1em;
  background: #58908a;
  color: white;
}
.edit-bottom:hover {
  opacity: 0.8;
}
.delete-bottom {
  font-size: 14px;
  border: none;
  border-radius: 99px;
  padding: 0.3em 1em;
  background: #be3939;
  color: white;
  margin-left: 0.5em;
}
.delete-bottom:hover {
  opacity: 0.8;
}
</style>
