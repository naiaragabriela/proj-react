import * as Http from '../utils/http-mocks'
import { getLocalStorageItem, setLocalStorageItem, testUrl } from "../utils/form-helper"

const path = /surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')


describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {setLocalStorageItem('account', account) })
  })
  
  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.visit('/surveys/any_id')
    cy.getByTestId('error').should('contain.text', '')
  })
})