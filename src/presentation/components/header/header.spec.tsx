import { Header } from '../../components'
import { ApiContext } from '../../contexts'
import { fireEvent, render, screen } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { AccountModel } from '../../../domain/models'
import { mockAccountModel } from '../../../domain/test'
import React from 'react'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })  
  const setCurrentAccountMock = jest.fn()
  render(
    <ApiContext.Provider value={{ 
      setCurrentAccount: setCurrentAccountMock, 
      getCurrentAccount: () => account 
    }}>
      <Router history={history}>
        <Header />
      </Router>
    </ApiContext.Provider>
  )
  return {
    history,
    setCurrentAccountMock
  }
}

describe('Header Component', () => {
    test('Should call setCurrentAccount with null', () => {
      const { history, setCurrentAccountMock } = makeSut()
      fireEvent.click(screen.getByTestId('logout'))
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(history.location.pathname).toBe('/login')
    })

     test('Should render username correctly', () => {
      const account = mockAccountModel()
      makeSut(account)
      expect(screen.getByTestId('username')).toHaveTextContent(account.name)
    })
})
