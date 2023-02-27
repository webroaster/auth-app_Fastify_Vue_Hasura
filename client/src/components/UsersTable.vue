<script setup lang="ts">
import { ref, watchEffect } from "vue"
import axios from "../axios-for-auth"

const users = ref([])

// 全てのユーザー取得
const getUser = async () => {
  try {
    const response = await (await axios.get("/users")).data.users_users
    users.value = response
  } catch (err) {
    console.error(err)
  }
}
getUser()
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
      <td><button class="edit-bottom">edit</button></td>
    </tr>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  max-width: 700px;
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
</style>
