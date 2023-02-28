<script setup lang="ts">
import InputArea from "@/components/InputArea.vue"
import UsersTable from "@/components/UsersTable.vue"
import { ref, onBeforeMount, watchEffect } from "vue"
import router from "@/router"
import { useStore } from "vuex"
import type User from "@/types/User"

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

const editData = ref()
const onEditUser = (value: User) => {
  editData.value = value
}
</script>

<template>
  <InputArea :edit-data="editData" />

  <UsersTable @click-edit="onEditUser" />
</template>
