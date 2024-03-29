import { Authentication } from '@/domain/usecases'
import { AccountModel } from '../../domain/models'
import faker from 'faker'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
  name: faker.name.findName()
})

export class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel()
  params: Authentication.Params
  callsCount = 0
 
  async auth (params: Authentication.Params): Promise <Authentication.Model> {
  
    this.params = params
    this.callsCount++ 
    return this.account
  }
}
