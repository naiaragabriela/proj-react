import Styles from './survey-list-styles.scss'
import { Header, Footer} from '@/presentation/components'
import { SurveyItemEmpty } from './components'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import React, { useEffect } from 'react'

type Props = {
  loadSurveyList: LoadSurveyList
}


const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  useEffect(() => {
    (async function () {
      loadSurveyList.loadAll()
    }) ()
  }, [])
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <ul data-testid="survey-list">
          <SurveyItemEmpty />
        </ul>
      </div>
      <Footer /> 
    </div>
  )
}

export default SurveyList