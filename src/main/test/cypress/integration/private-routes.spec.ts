import { testUrl } from "../utils/form-helper"

describe('Private Routes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('')
    testUrl('/login')
  })
})
      