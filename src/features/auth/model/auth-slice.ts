import { createAppSlice, handleServerAppError, handleServerNetworkError } from '@/common/utils'
import { LoginInputs } from '@/features/auth/lib/schemas'
import { setAppStatusAC } from '@/app/app-slice.ts'
import { ResultCode } from '@/common/enums'
import { authApi } from '@/features/auth/api/authApi.ts'
import { AUTH_TOKEN } from "@/common/constants"
import { clearDataAC } from "@/common/actions"

export const authSlice = createAppSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  selectors: {
    selectIsLoggedIn: (s) => s.isLoggedIn,
  },
  reducers: (create) => ({
    loginTC: create.asyncThunk(
      async (payload: LoginInputs, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await authApi.login(payload)
          if (res.data.resultCode === ResultCode.Success) {
            localStorage.setItem(AUTH_TOKEN, res.data.data.token)
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            return { isLoggedIn: true }
          } else {
            handleServerAppError(res.data, dispatch)
            dispatch(setAppStatusAC({ status: 'failed' }))
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(dispatch, error)
          dispatch(setAppStatusAC({ status: 'failed' }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    logoutTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await authApi.logout()
          if (res.data.resultCode === ResultCode.Success) {
            localStorage.removeItem(AUTH_TOKEN)
            dispatch(clearDataAC())
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            return { isLoggedIn: false }
          } else {
            handleServerAppError(res.data, dispatch)
            dispatch(setAppStatusAC({ status: 'failed' }))
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(dispatch, error)
          dispatch(setAppStatusAC({ status: 'failed' }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
    initializeAppTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: 'loading' }))
          const res = await authApi.me()
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatusAC({ status: 'succeeded' }))
            return { isLoggedIn: true }
          } else {
            handleServerAppError(res.data, dispatch)
            dispatch(setAppStatusAC({ status: 'failed' }))
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(dispatch, error)
          dispatch(setAppStatusAC({ status: 'failed' }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn
        },
      },
    ),
  }),
})

export const { selectIsLoggedIn } = authSlice.selectors
export const { loginTC, logoutTC, initializeAppTC } = authSlice.actions
export const authReducer = authSlice.reducer
