import faker from "faker"


export const mockInvalidCredentialsError = (url: RegExp,): void => {
    cy.intercept({
        method: 'POST',
        url,
        /*
        status: 401,
        response: {
            error: faker.random.words()
        } 
        */
    }).as('request')
}

export const mockEmailInUseError = (url: RegExp,): void => {
    cy.intercept({
        method: 'POST',
        url,
        /*
        status: 403,
        response: {
            error: faker.random.words()
        } 
        */
    }).as('request')
}

export const mockUnexpectedError = (url: RegExp, method: string): void => {
    cy.intercept({
        method,
        url,
        /*
        status: faker.helpers.randomize([400, 401, 500]),
        response: {
            error: faker.random.words()
        }
        */
    }).as('request')
}


export const mockOk = (url: RegExp, method: string, response: any): void => {
    cy.intercept({
        method,
        url,
        /*
        status: 200,
        response
        */
    }).as('request')
}
