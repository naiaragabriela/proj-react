import { ApiContext } from "../contexts"
import { AccessDeniedError } from "@/domain/errors"
import { useContext } from "react"
import { useHistory } from "react-router-dom"

type CallBackType = (error: Error) => void
type ResultType = CallBackType


export const useErrorHandler = (callback: CallBackType): ResultType => {
    const history = useHistory()
    const  { setCurrentAccount } = useContext(ApiContext)
  return (error: Error): void => {

    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined)
      history.replace('/login')
    } else {
      callback(error)
    }
  }
}