import React, { memo } from 'react'
import  Styles from './header-styles.scss'
import Logo from '../logo/logo'

const Header: React.FC = () => {
    return (
        <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
           <Logo />
           <div className={Styles.logoutWrap}>
             <span>Naiara</span>
             <a href="#">Sair</a>
           </div>
        </div> 
     </header>
    )
}

export default memo(Header)