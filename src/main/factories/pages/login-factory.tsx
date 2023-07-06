import React from "react"
import { makeLoginValidation } from "./login/login-validation-factory"
import { makeRemoteAuthentication } from "@/main/factories/usecases/authentication/remote-authentication-factory"
import { Login } from '@/presentation/pages'

export const makelogin: React.FC = () => {
  return (
    <Login 
    authentication={makeRemoteAuthentication()} 
    validation={makeLoginValidation()} 
    />
  )
}