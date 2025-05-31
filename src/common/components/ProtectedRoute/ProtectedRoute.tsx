import { Navigate, Outlet } from "react-router"
import { Path } from '@/common/routing'
import { ReactNode } from 'react'

type ProtectedRouteType = {
  isAllowed: boolean
  children?: ReactNode
  redirectPath?: string
}

export const ProtectedRoute = ({ children, isAllowed, redirectPath = Path.Login }: ProtectedRouteType) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />
  }

  return children ? children : <Outlet/>
}
