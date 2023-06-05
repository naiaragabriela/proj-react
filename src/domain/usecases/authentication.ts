import { AccountModel } from '../models/account-model'

type AuthenticationParams = {
  email: string
  passoword: string
}

export interface Authentication {
  auth (params: AuthenticationParams): Promise<AccountModel>
}