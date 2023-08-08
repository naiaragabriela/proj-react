import faker from "faker"


export const mockUnauthorizedError = (url: RegExp, response: any): void => {
    cy.intercept('POST', url, {
        statusCode: 401, response
      }).as('request')
}

export const mockForbiddenError = (url: RegExp): void => {
    cy.intercept('GET' || 'POST', url, {
        statusCode: 403,
      }).as('request');
}

export const mockServerError = (url: RegExp): void => {
    cy.intercept('GET' || 'POST' || 'PUT', url, {
        statusCode: 500,
      }).as('request')
}


export const mockOk = (url: RegExp, response: any): void => {
    cy.intercept('GET' || 'POST', url, {
        statusCode: 200, response
      }).as('request')
}