import React from 'react'
import { render } from '@testing-library/react'
import Login from './login'

describe ('Login Component', () => {
  test ('Should start with initial state', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId ('error-wrap') 
    expect(errorWrap.childElementCount).toBe(0)
    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)
    const emailStatus = getByTestId ('password-status')
    expect(emailStatus.title).toBe('Campo Obrigatório')
    expect(emailStatus.textContent).toBe('.')
    const passwordStatus = getByTestId ('password-status')
    expect(passwordStatus.title).toBe('Campo Obrigatório')
    expect(passwordStatus.title).toBe('.')
    })
})