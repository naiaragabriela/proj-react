import * as Http from '../utils/http-mocks'
import { getLocalStorageItem, setLocalStorageItem, testUrl } from "../utils/form-helper"

const path = /surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path)
const mockSucess = (): void => Http.mockOk(path, 'fx:survey-result')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path)

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      setLocalStorageItem('account', account) 
    })
    cy.visit('')
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.getByTestId('error').should('contain.text', '') //no curso ele passa 'Algo de errado aconteceu. Tente novamente em breve'
  })

  it('Should reload on button click', () => {
    mockUnexpectedError()
    cy.getByTestId('error').should(
      'contain.text', 
      'Algo de errado aconteceu. Tente novamente em breve'
    )
    mockSucess()
    cy.getByTestId('reload').click()
    //cy.get('question').should('exist')
  })

  it('Should logout on AccessDeniederror', () => {
    mockAccessDeniedError()
    testUrl('/login')//no curso aqui usa o /login
  })
})