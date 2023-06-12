import React from 'react'
import { RenderResult, render, fireEvent, cleanup } from '@testing-library/react'
import Login from './login'
import { Validation } from '@/presentation/protocols/validation'

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
}

class ValidationSpy implements Validation {
  errorMessage: string
  fieldName: string
  fieldValue: string

  validate (fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValue
    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy}/>)
  return{
    sut,
    validationSpy
  }
}
describe ('Login Component', () => {
  afterEach(cleanup)

  test ('Should start with initial state', () => {
    const { sut } = makeSut()
    const errorWrap = sut.getByTestId ('error-wrap') 
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = sut.getByTestId ('password-status')
    expect(emailStatus.title).toBe('Campo Obrigatório')
    expect(emailStatus.textContent).toBe('.')
    const passwordStatus = sut.getByTestId ('password-status')
    expect(passwordStatus.title).toBe('Campo Obrigatório')
    expect(passwordStatus.title).toBe('.')
    })

  test ('Should call Validation with correct email', () => {
    const { sut, validationSpy } = makeSut() 
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput,{ target: { value: 'any_email'}})
    expect(validationSpy.fieldName).toBe('email')
    expect(validationSpy.fieldValue).toBe('any_email')
  })

  test ('Should call Validation with correct password', () => {
    const { sut, validationSpy } = makeSut() 
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput,{ target: { value: 'any_password'}})
    expect(validationSpy.fieldName).toBe('password')
    expect(validationSpy.fieldValue).toBe('any_password')
  })
}) 
