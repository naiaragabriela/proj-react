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

})
      