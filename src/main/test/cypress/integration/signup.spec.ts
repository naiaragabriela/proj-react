import { testInputStatus } from "../support/form-helper"

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
})