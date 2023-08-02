import faker from "faker"
import * as Http from '../support/survey-list-mocks'
import { setLocalStorageItem, testUrl } from "../support/form-helper"

describe('SurveyList', () => {
  beforeEach(() => {
    setLocalStorageItem('account', { 
      accessToken: faker.datatype.uuid(), 
      name: faker.name.findName()
    })
    cy.visit('')
  })

  it('Should present error on Unexpectederror', () => {
    Http.mockUnexpectedError()
    cy.getByTestId('error').should(
      'contain.text', 
      'Algo de errado aconteceu. Tente novamente em breve'
    )
  })
})
      