import { EmailInUseError } from '../../../domain/errors'
import { Router } from 'react-router-dom'
import {createMemoryHistory} from 'history'
import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import React from "react"
import faker from 'faker'
import { ApiContext } from '../../contexts'
import SignUp from "./signup"
import { Helper, ValidationStub, AddAccountSpy } from '../../test' 
import { AddAccount } from "../../../domain/usecases"


type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AddAccount.Model) => void
}

type SutParams = {
    validationError: string  
}

const history = createMemoryHistory({initialEntries: ['/signup']})

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError as string
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <SignUp
          validation={validationStub} 
          addAccount={addAccountSpy} 
        />
      </Router>
    </ApiContext.Provider>
  )
  return{
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()): Promise<void> => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}


  

describe ('SignUp Component', () => {
  test ('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({validationError})
    Helper.testChildCount('error-wrap', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test ('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({validationError})
    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
  })

  test ('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({validationError})
    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test ('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({validationError})
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test ('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({validationError})
    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test ('Should show valid name state if Validation succeeds', () => {
    makeSut() 
    Helper.populateField('name')
    Helper.testStatusForField('name')
  })

  test ('Should show valid email state if Validation succeeds', () => {
    makeSut() 
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  test ('Should show valid password state if Validation succeeds', () => {
    makeSut() 
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  test ('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut() 
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  test ('Should enable submit button if form is valid', () => {
    makeSut() 
    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    Helper.testButtonIsDisabled('submit', false)
  })

  test ('Should show spinner on submit', async () => {
    makeSut() 
    await simulateValidSubmit()
    Helper.testElementExists('spinner')
  })

  test ('Should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut() 
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({
        name, 
        email, 
        password,
        passwordConfirmation: password
    })
  })
  
  test ('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut() 
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(1)
  })

  test ('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({validationError})
    await simulateValidSubmit()
    expect(addAccountSpy.callsCount).toBe(0)
  })

  test ('Should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    Helper.testElementText('main-error',error.message)
    Helper.testChildCount('error-wrap', 1)
  })

  test ('Should call SaveAccessToken on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })


  test ('Should go to login page', () => {
    makeSut()
    const loginLink = screen.getByTestId('login-link')
    fireEvent.click(loginLink)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })

})