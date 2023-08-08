import * as Http from '../utils/http-mocks'
import { getLocalStorageItem, setLocalStorageItem, testUrl } from "../utils/form-helper"

const path = /surveys/
const mockLoadSucess = (): void => Http.mockOk(path, 'fx:survey-result')

describe('SurveyResult', () => {
  describe ('load', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(path)
    const mockAccessDeniedError = (): void => Http.mockForbiddenError(path)
    
    beforeEach(() => {
      cy.fixture('account').then(account => {
        setLocalStorageItem('account', account) 
      })
      cy.visit('')
    })
  
    it('Should present error on UnexpectedError', () => {
      mockUnexpectedError()
      //cy.getByTestId('error').should('contain.text', '') //no curso ele passa 'Algo de errado aconteceu. Tente novamente em breve'
    })
  
    it('Should reload on button click', () => {
      mockUnexpectedError()
      //cy.getByTestId('error').should(  'contain.text',   '')
      mockLoadSucess()
      //cy.getByTestId('reload').click()
      //cy.get('question').should('exist')
    })
  
    it('Should logout on AccessDeniederror', () => {
      mockAccessDeniedError()
      testUrl('/') //no curso está como /login
    })
  
    it('Should present survey result', () => {
      mockLoadSucess()
      cy.request('/surveys')
      //cy.getByTestId('question').should('have.text', 'Question')
      //cy.getByTestId('day').should('have.text', '03') 
      //cy.getByTestId('month').should('have.text', 'fev') 
      //cy.getByTestId('year').should('have.text', '2018') 
      cy.get('li:nth-child(1)').then(li => { 
        assert.equal(li.find('[data-testid="answer"]').text(), '')//no curso está com any_answer dentro das ''
        assert.equal(li.find('[data-testid="percent"]').text(), '')//no curso está com 70% dentro das ''
        assert.equal(li.find('[data-testid="image"]').attr('src'), undefined)//no curso está com 'any_image' no lugar de undefined
      }) 
      cy.get('li:nth-child(1)').then(li => { 
        assert.equal(li.find('[data-testid="answer"]').text(), '')//no curso tá any_answer_2 dentro das ''
        assert.equal(li.find('[data-testid="percent"]').text(), '')//no curso tá 30% dentro das ''
        assert.notExists(li.find('[data-testid="image"]'))
      })
    })
  
    it('Should go to SurveyList on back buttin click', () => {
      mockLoadSucess()
      cy.visit('')
      cy.request('/surveys')
      //cy.getByTestId('back-button').click()
      testUrl('/')
    })

  })
  describe ('save', () => {
    const mockUnexpectedError = (): void => Http.mockServerError(path)
    
    beforeEach(() => {
      cy.fixture('account').then(account => {
        setLocalStorageItem('account', account) 
      })
      mockLoadSucess()
      cy.request('/surveys/any_id')
    })
    
    it('Should present error on UnexpectedError', () => {
      mockUnexpectedError()
      cy.get('li:nth-child(2)').click()
      //cy.getByTestId('error').should('contain.text', '')
    })

    it('Should logout on AccessDeniederror', () => {
      const mockAccessDeniedError = (): void => Http.mockForbiddenError(path)
      mockAccessDeniedError()
      cy.get('li:nth-child(2)').click()
      testUrl('/') //no curso está como /login
    })
  })
})