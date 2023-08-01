import Styles from './error-styles.scss'
import { SurveyContext } from '../../../../pages/survey-list/components'
import React, { useContext} from 'react'

const Error: React.FC = () => {
    const { state, setState } = useContext(SurveyContext)
    const realod = (): void => {
      setState ({ surveys: [], error: '', reload: !state.reload })
    }
    
    return (
      <div className={Styles.errorWrap}>
        <span data-testid="error">{state.error}</span>
        <button data-testid="reload" onClick={realod} >Tentar Novamente</button>
      </div>
    )
}

export default Error