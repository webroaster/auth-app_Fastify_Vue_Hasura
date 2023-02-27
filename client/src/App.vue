<script setup lang="ts">
import { useStore } from "vuex"
import router from "./router"

const store = useStore()

// ログアウト
const handleLogout = () => {
  store.dispatch("logout").then(() => {
    router.push("/login")
  })
}
</script>

<template>
  <header>
    <h2>Auth App</h2>
    <nav v-if="store.state.user">
      <button @click="handleLogout" class="logoutButton">Logout</button>
    </nav>
  </header>
  <router-view />
</template>

<style scoped>
header {
  background: #ccc;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5em 2em;
}

nav {
  display: flex;
  align-items: center;
  grid-gap: 1em;
}

h2 {
  text-align: left;
}

.logoutButton {
  border-radius: 5px;
  border: none;
  background: #888;
  color: white;
  font-weight: bold;
}
</style>
