import React, { useEffect, useContext } from 'react'
import { loginState, Input, SubmitButton, FormStatus } from './components'
import { Link, useHistory } from 'react-router-dom'
import Styles from './login-styles.scss'
import { Footer, LoginHeader } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases'
import { useRecoilState } from 'recoil'




type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
    const {setCurrentAccount} = useContext(ApiContext)
    const history = useHistory()
    const [state, setState] = useRecoilState(loginState)
    useEffect(() => {
      const {  email, password } = state
      const formData = { email, password }
      const emailError= validation.validate('email', formData)
      const passwordError= validation.validate('password', formData)

      setState({
        ...state,
        emailError,
        passwordError,
        isFormInvalid: !!emailError || !!passwordError 
      })
    }, [state.email, state.password])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault()
      try{
        if(state.isLoading || state.isFormInvalid){
          return 
        }
        setState({ ...state, isLoading: true })
        const account = await authentication.auth({
          email: state.email, 
          password: state.password
        })
        setCurrentAccount(account)
        history.replace('/')
      } catch (error){
        setState({ 
          ...state, 
          isLoading: false,
          mainError: error.message
        })
      }
    }

    return (
        <div className={Styles.loginWrap}>
          <LoginHeader />
            <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
              <h2>Login</h2>
              <Input type="email" name="email" placeholder="Digite seu e-mail"/>
              <Input type="password" name="password" placeholder="Digite sua senha" />
              <SubmitButton text="Entrar" />
              <Link data-testid="signup-link" to="/signup" className={Styles.link}>Criar Conta</Link>
              <FormStatus />
            </form>
          <Footer />
        </div>
    )
}
export default Login