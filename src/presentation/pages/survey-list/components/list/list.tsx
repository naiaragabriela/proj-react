import Styles from './list-styles.scss'
import { SurveyItem, SurveyItemEmpty, SurveyContext } from '../../../../pages/survey-list/components'
import React, { useContext} from 'react'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return ( 
    <ul className={Styles.listWrap} data-testid="survey-list">
      {state.surveys.length
        ? state.surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
        :  <SurveyItemEmpty />
      }
    </ul>
  )
}

export default List