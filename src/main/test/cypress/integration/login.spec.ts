import faker from 'faker'

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  
  it('Should load with correct initial state', () => {
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo Obrigatório')
    cy.getByTestId('password-status').should('have.attr', 'title', 'Campo Obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled') 
    cy.getByTestId('error-wrap').should('not.have.descendants') 
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-status').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-status').should('have.attr', 'title', 'Valor inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled') 
    cy.getByTestId('error-wrap').should('not.have.descendants') 
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('email-status').should('have.attr', 'title', 'OK')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-status').should('have.attr', 'title', 'OK')
    cy.getByTestId('submit').should('not.have.attr', 'disabled') 
    cy.getByTestId('error-wrap').should('not.have.descendants') 
  })

})
      