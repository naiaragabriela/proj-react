import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

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

  
  it('Should present error if invalid credentials are provided', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
    /*
    .getByTestId('spinner').should('exist')
    .getByTestId('main-error').should('not.exist')
    .getByTestId('spinner').should('not.exist')
    .getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
    */
   cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Should present save accessToken if valid credentials are provided', () => {
    cy.getByTestId('email').focus().type('jose@hotmail.com')
    cy.getByTestId('password').focus().type('12345')
    cy.getByTestId('submit').click()
    cy.getByTestId('error-wrap')
    /*
    .getByTestId('spinner').should('exist')
    .getByTestId('main-error').should('not.exist')
    .getByTestId('spinner').should('not.exist')
    .getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
    */
   //cy.url().should('eq', `${baseUrl}/`)
   //cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })
})
      