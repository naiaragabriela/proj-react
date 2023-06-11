import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '@/presentation/components/spinner/spinner'
import Logo from '@/presentation/components/logo/log'

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
          <header className={Styles.header}>
            <Logo />
            <h1>React and Clean Arquiteture</h1>
          </header>
            <form className={Styles.form}>
                <h2>Login</h2>
                <div className={Styles.inputWrap}>
                  <input type="email" name="email" placeholder="Digite seu e-mail" />
                  <span className={Styles.status}>
                  </span>
                </div>
                <div className={Styles.inputWrap}>
                  <input type="password" name="password" placeholder="Digite sua senha" />
                  <span className={Styles.status}>
                  </span>
                </div>
                <button className={Styles.submit} type="submit">Entrar</button>
                <span className={Styles.link}>Criar Conta</span>
                 <div className={Styles.erroWrap}>
                  <Spinner className={Styles.spinner} />
                  <span className={Styles.error}>Erro</span>
                </div>     
            </form>
            <footer className={Styles.footer}></footer>
        </div>
    )
}
export default Login