import { testUrl } from "../utils/form-helper"

describe('Private Routes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('')
    testUrl('/login')
  })

  it('Should logout if survey-resul has no token', () => {
    cy.visit('/login') //valor colocado no curso dentro do cy.visit ('/surveys/any_id')
    testUrl('/login')
  })
})
      