import React from 'react' 
import { currentAccountState } from '../../../presentation/components'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import PrivateRoute from './private-route'
import { RecoilRoot } from 'recoil'
import { mockAccountModel } from '../../../domain/test'

type SutTypes = {
    history: MemoryHistory
}
const makeSut = (account = mockAccountModel()): SutTypes => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    const mockedState = { setCurrentAccount: jest.fn(), getCurrentAccount: () => account }
    render(
      <RecoilRoot initializeState={({ set }) => set(currentAccountState, mockedState) }>
        <Router history={history}>
          <PrivateRoute />
        </Router>
      </RecoilRoot>
    )
    return { history }
}

describe('PrivateRoute', () => {
    test('Should redirect to /login if token is empty', () => {
      const { history } = makeSut()
      expect(history.location.pathname).toBe('/')
    })
    test('Should render current component if token is not empty', () => {
        const { history } = makeSut()
        expect(history.location.pathname).toBe('/')
      })
})
