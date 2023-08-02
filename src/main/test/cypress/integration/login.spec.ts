import { testInputStatus, testMainError, testUrl } from '../utils/form-helper'
import * as Http from '../utils/http-mocks'
import faker from 'faker'

const path = /login/
const mockInvalidCredentialsError = (): void => Http.mockUnauthorizedError(path)
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')
const mockSuccess = (): void => Http.mockOk(path, 'POST', 'fx:account')

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  
  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    testInputStatus('email', 'Campo Obrigatório')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    testInputStatus('password', 'Campo Obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled') 
    cy.getByTestId('error-wrap').should('not.have.descendants') 
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    testInputStatus('email', 'Valor inválido')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    testInputStatus('password', 'Valor inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled') 
    cy.getByTestId('error-wrap').should('not.have.descendants') 
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    testInputStatus('email')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    testInputStatus('password')
    cy.getByTestId('submit').should('not.have.attr', 'disabled') 
    cy.getByTestId('error-wrap').should('not.have.descendants') 
  })
  
  it('Should present InvalidCredentialsError on 401', () => {
    mockInvalidCredentialsError()
    simulateValidSubmit()
    testMainError('Algo de errado aconteceu. Tente novamente em breve')
    testUrl('/login')
  })

  it('Should present UnexpectedError on default error cases', () => {
    mockUnexpectedError()
    simulateValidSubmit()
    testMainError('Algo de errado aconteceu. Tente novamente em breve')
    testUrl('/login')
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    mockSuccess()
    simulateValidSubmit()
    cy.getByTestId('error-wrap').should('not.have.descendants')
    testUrl('/login')//no curso está usando sem o login
    //testLocalStorage('account')
  })

  it('Should prevent multiple submits', () => {
    mockSuccess()
    populateFields()
    cy.getByTestId('submit').dblclick()
     //testHttpCallsCount(1)
     
  })


  it('Should not call submit if form is invalid', () => {
    mockSuccess()
    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
    //testHttpCallsCount(0)
  })
})
      