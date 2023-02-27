<script setup lang="ts">
import InputArea from "@/components/InputArea.vue"
import UsersTable from "@/components/UsersTable.vue"
import { onBeforeMount, watchEffect } from "vue"
import router from "@/router"
import { useStore } from "vuex"

const store = useStore()

let user = store.state.user

onBeforeMount(() => {
  if (!user) {
    router.push("/login")
  }
})

watchEffect(() => {
  user = store.state.user
  if (!user) {
    router.push("/login")
  }
})
</script>

<template>
  <div>
    <h1>Profile</h1>
    <div v-show="store.state.user">
      <p>{{ store.state.user.username }}</p>
      <p>{{ store.state.user.email }}</p>
    </div>
  </div>
  <InputArea />

  <UsersTable />
</template>
