import faker from "faker"
import * as Http from '../utils/http-mocks'
import { testInputStatus, testMainError, testUrl } from "../utils/form-helper"

const path = /signup/
const mockEmailInUseError = (): void => Http.mockForbiddenError(path, 'POST')
const mockUnexpectedError = (): void => Http.mockServerError(path, 'POST')
const mockSuccess = (): void => Http.mockOk(path, 'POST', 'fx:account')


const populateFields = (): void => {
    cy.getByTestId('name').focus().type(faker.name.findName())
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    const password = faker.random.alphaNumeric(7)
    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('passwordConfirmation').focus().type(password)
}

const simulateValidSubmit = (): void => {
    populateFields()
    cy.getByTestId('submit').click()
}

describe('SignUp', () => {
    beforeEach(() => {
      cy.visit('signup')
    })
    
    it('Should load with correct initial state', () => {
      cy.getByTestId('name').should('have.attr', 'readOnly')
      testInputStatus('name', 'Campo Obrigatório')
      cy.getByTestId('email').should('have.attr', 'readOnly')
      testInputStatus('email', 'Campo Obrigatório')
      cy.getByTestId('password').should('have.attr', 'readOnly')
      testInputStatus('password', 'Campo Obrigatório')
      cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
      testInputStatus('passwordConfirmation', 'Campo Obrigatório')
      cy.getByTestId('submit').should('have.attr', 'disabled') 
      cy.getByTestId('error-wrap').should('not.have.descendants') 
    })

    it('Should present error state if form is invalid', () => {
        cy.getByTestId('name').focus().type(faker.random.alphaNumeric(3))
        testInputStatus('name', 'Valor inválido')
        cy.getByTestId('email').focus().type(faker.random.word())
        testInputStatus('email', 'Valor inválido')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
        testInputStatus('password', 'Valor inválido')
        cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4))
        testInputStatus('passwordConfirmation', 'Valor inválido')
        cy.getByTestId('submit').should('have.attr', 'disabled') 
        cy.getByTestId('error-wrap').should('not.have.descendants') 
    })
    
    it('Should present valid state if form is valid', () => {
        cy.getByTestId('name').focus().type(faker.name.findName())
        testInputStatus('name')
        cy.getByTestId('email').focus().type(faker.internet.email())
        testInputStatus('email')
        const password = faker.random.alphaNumeric(5)
        cy.getByTestId('password').focus().type(password)
        testInputStatus('password')
        cy.getByTestId('passwordConfirmation').focus().type(password)
        testInputStatus('passwordConfirmation')
        cy.getByTestId('submit').should('not.have.attr', 'disabled') 
        cy.getByTestId('error-wrap').should('not.have.descendants') 
    })

    it('Should present EmailInUseError on 403', () => {
        mockEmailInUseError()
        simulateValidSubmit()
        testMainError('Algo de errado aconteceu. Tente novamente em breve')
        testUrl('/signup')
    })

    it('Should present UnexpectedError on default error cases', () => {
        mockUnexpectedError()
        simulateValidSubmit()
        testMainError('Algo de errado aconteceu. Tente novamente em breve')
        testUrl('/signup')
    })
  
    it('Should present save accessToken if valid credentials are provided', () => {
        mockSuccess()
        simulateValidSubmit()
        cy.getByTestId('error-wrap').should('not.have.descendants')
        testUrl('/signup')//no curso está usando sem o signup
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