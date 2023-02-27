import { createStore } from "vuex"
import axios from "../axios-for-auth"

// ユーザー情報の定義
interface User {
  id: number
  username: string
  email: string
  password: string
}

// ステートの定義
interface State {
  user: User | null
}
const userJson = localStorage.getItem("user")
// Vuexストアを作成
export default createStore<State>({
  state: {
    user: userJson ? JSON.parse(userJson) : null,
  },
  mutations: {
    setUser(state, user: User) {
      state.user = user
      localStorage.setItem("user", JSON.stringify(user))
    },
    logoutUser(state) {
      state.user = null
      localStorage.removeItem("user")
    },
  },

  actions: {
    // ログイン
    async login({ commit }, { usernameOrEmail, password }) {
      try {
        const response = await axios.post("/login", {
          usernameOrEmail: usernameOrEmail,
          password: password,
        })
        const user = response.data.users_users[0]

        // ストアのステートにセット
        commit("setUser", user)
      } catch (err) {
        console.error(err)
      }
    },
    // 新規作成→ログイン
    async register({ commit }, { username, email, password }) {
      try {
        const response = await axios.post("/create", {
          username: username,
          email: email,
          password: password,
        })
        const user = response.data.insert_users_users.returning[0]
        commit("setUser", user)
      } catch (err) {
        console.error(err)
      }
    },
    // ログアウト
    logout({ commit }) {
      commit("logoutUser")
    },
  },

  getters: {
    isLoggedIn(state) {
      return state.user !== null
    },
    getUser(state) {
      return state.user
    },
  },
})
