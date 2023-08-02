import { testUrl } from "../support/form-helper"

describe('Private Routes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('')
    testUrl('/login')
  })
})
      