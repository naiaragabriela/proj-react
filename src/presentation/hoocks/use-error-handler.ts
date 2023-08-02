import { ApiContext } from "../contexts"
import { AccessDeniedError } from "@/domain/errors"
import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { useLogout } from "./use-logout"

type CallBackType = (error: Error) => void
type ResultType = CallBackType


export const useErrorHandler = (callback: CallBackType): ResultType => {
  const logout = useLogout()
  return (error: Error): void => {

    if (error instanceof AccessDeniedError) {
      logout()
    } else {
      callback(error)
    }
  }
}