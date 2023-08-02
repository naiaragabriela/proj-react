import faker from "faker"
import * as Http from '../utils/http-mocks'
import { getLocalStorageItem, setLocalStorageItem, testUrl } from "../utils/form-helper"

const path = /surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')


describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {setLocalStorageItem('account', account) })
    cy.visit('')
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.getByTestId('error').should(
      'contain.text', 
      'Algo de errado aconteceu. Tente novamente em breve'
    )
  })

  it('Should logout on AccessDeniederror', () => {
    mockAccessDeniedError()
    testUrl('/')//no curso aqui usa o /login
  })
  
  it('Should present correct username', () => {
    mockUnexpectedError()
    const { name } = getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logout link click', () => {
    mockUnexpectedError()
    cy.getByTestId('logout').click()
    testUrl('/login')
  })

})
      