import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../redux/store"
import { selectCurrrentUser } from "../redux/authSlice"
import { useMemo } from "react"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAuth = () => {
  const user = useSelector(selectCurrrentUser)

  return useMemo(() => ({ user }), [user])
}
