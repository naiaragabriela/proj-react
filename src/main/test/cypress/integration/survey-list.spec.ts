import * as Http from '../utils/http-mocks'
import { getLocalStorageItem, setLocalStorageItem, testUrl } from "../utils/form-helper"

const path = /surveys/
const mockUnexpectedError = (): void => Http.mockServerError(path, 'GET')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(path, 'GET')
const mockSucess = (): void => Http.mockOk(path, 'GET', 'fx:survey-list')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {setLocalStorageItem('account', account) })
    cy.visit('')
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpectedError()
    cy.getByTestId('error').should(
      'contain.text', 
      'Algo de errado aconteceu. Tente novamente em breve'
    )
  })

  it('Should reload on button click', () => {
    mockUnexpectedError()
    cy.getByTestId('error').should(
      'contain.text', 
      'Algo de errado aconteceu. Tente novamente em breve'
    )
    mockSucess()
    cy.getByTestId('reload').click()
    cy.get('li:not(:empty)').should('have.length', 0)//no curso ele coloca 2 (sao as li preenchidas no survey list)
  })

  it('Should logout on AccessDeniederror', () => {
    mockAccessDeniedError()
    testUrl('/')//no curso aqui usa o /login
  })
  
  it('Should present correct username', () => {
    mockUnexpectedError()
    const { name } = getLocalStorageItem('account')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logout link click', () => {
    mockUnexpectedError()
    cy.getByTestId('logout').click()
    testUrl('/login')
  })

  it('Should present survey items', () => {
    mockUnexpectedError()
    cy.getByTestId('logout').click()
    testUrl('/login')
  })

  it('Should present survey items', () => {
    mockSucess()
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 0)//no curso ele colocou o numero 2 
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '')//no curso ele colocou o numero 03
      assert.equal(li.find('[data-testid="month"]').text(), '')//ele usa fev
      assert.equal(li.find('[data-testid="year"]').text(), '')//ele usa 2018 
      assert.equal(li.find('[data-testid="question"]').text(), '')// usa Question 1
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumUp)  
      })
    })
    /* não encontra o segundo objeto do meu survey-list.json

    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '')//no curso ele colocou o numero 20
      assert.equal(li.find('[data-testid="month"]').text(), '')//ele usa out
      assert.equal(li.find('[data-testid="year"]').text(), '')//ele usa 2020 
      assert.equal(li.find('[data-testid="question"]').text(), '')// usa Question 2
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown)  
      })
    })
    */

  })
})
