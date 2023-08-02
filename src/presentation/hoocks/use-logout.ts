import { ApiContext } from "../contexts"
import { AccessDeniedError } from "@/domain/errors"
import { useContext } from "react"
import { useHistory } from "react-router-dom"


type ResultType = () => void

export const useLogout = (): ResultType =>  {
  const history = useHistory()
  const  { setCurrentAccount } = useContext(ApiContext)
  return (): void => {
   setCurrentAccount(undefined)
   history.replace('/login')
  }
}