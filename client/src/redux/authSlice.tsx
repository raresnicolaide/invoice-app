import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./store"
import { IUser } from "./api"

type AuthState = {
  user: IUser | null
  token: string | null
}

const loadFromLocalStorage = (): AuthState => {
  const storedAuth = localStorage.getItem("auth")
  return storedAuth ? JSON.parse(storedAuth) : { user: null, token: null }
}

const saveToLocalStorage = (auth: AuthState) => {
  localStorage.setItem("auth", JSON.stringify(auth))
}

const slice = createSlice({
  name: "auth",
  initialState: loadFromLocalStorage(),
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: IUser; token: string }>,
    ) => {
      state.user = user
      state.token = token
      saveToLocalStorage(state)
    },
    logout: (state) => {
      state.user = null
      state.token = null
      saveToLocalStorage(state)
    },
  },
})

export const { setCredentials, logout } = slice.actions

export default slice.reducer

export const selectCurrrentUser = (state: RootState) => state.auth.user
