import React from 'react'
import { RenderResult, render, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { ValidationStub } from '@/presentation/test'
import faker from 'faker'

type SutTypes = {
  sut: RenderResult
  ValidationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const ValidationStub = new ValidationStub()
  ValidationStub.errorMessage = faker.random.words()
  const sut = render(<Login validation={ValidationStub} />)
  return{
    sut,
    ValidationStub
  }
}
describe ('Login Component', () => {
  afterEach(cleanup)

  test ('Should start with initial state', () => {
    const { sut, ValidationStub } = makeSut()
    const errorWrap = sut.getByTestId ('error-wrap') 
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId ('email-status')
    expect(emailStatus.title).toBe(ValidationStub.errorMessage)
    expect(emailStatus.textContent).toBe('.')
    const passwordStatus = sut.getByTestId ('password-status')
    expect(passwordStatus.title).toBe('validationSpy.errorMessage')
    expect(passwordStatus.textContent).toBe('.')
    })

  test ('Should show email error if Validation fails', () => {
    const { sut, ValidationStub } = makeSut() 
    const emailInput = sut.getByTestId('email') 
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(ValidationStub.errorMessage)
    expect(emailStatus.textContent).toBe('.')
  })

  test ('Should show password error if Validation fails', () => {
    const { sut, ValidationStub } = makeSut() 
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput,{ target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(ValidationStub.errorMessage)
    expect(passwordStatus.textContent).toBe('.')
  })

  test ('Should show valid email state if Validation succeeds', () => {
    const { sut, ValidationStub } = makeSut() 
    ValidationStub.errorMessage = null
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput,{ target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Ok')
    expect(emailStatus.textContent).toBe('')
  })

  test ('Should show valid password state if Validation succeeds', () => {
    const { sut, ValidationStub } = makeSut() 
    ValidationStub.errorMessage = null
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput,{ target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Ok')
    expect(passwordStatus.textContent).toBe('')
  })

  test ('Should enable submit button if form is valid', () => {
    const { sut, ValidationStub } = makeSut() 
    ValidationStub.errorMessage = null
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput,{ target: { value: faker.internet.email() } })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput,{ target: { value: faker.internet.password() } })
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })
}) 
