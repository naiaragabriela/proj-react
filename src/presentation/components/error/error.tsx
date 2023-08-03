import Styles from './error-styles.scss'
import { SurveyContext } from '../../pages/survey-list/components'
import React from 'react'

type Props = {
  error: string
  reload: () => void
}
const Error: React.FC<Props> = ({ error, reload }: Props) => {
    return (
      <div className={Styles.errorWrap}>
        <span data-testid="error">{error}</span>
        <button data-testid="reload" onClick={reload} >Tentar Novamente</button>
      </div>
    )
}

export default Error