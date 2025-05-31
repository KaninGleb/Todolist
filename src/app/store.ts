import { tasksSlice, tasksReducer } from '@/features/todolists/model/tasks-slice'
import { todolistsSlice, todolistsReducer } from '@/features/todolists/model/todolists-slice'
import { configureStore } from '@reduxjs/toolkit'
import { appSlice, appReducer } from './app-slice.ts'
import { authSlice, authReducer } from "@/features/auth/model/auth-slice.ts"

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
