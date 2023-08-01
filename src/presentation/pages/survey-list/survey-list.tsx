import Styles from './survey-list-styles.scss'
import { Header, Footer} from '@/presentation/components'
import { SurveyContext, SurveyListItem , Error} from './components'
import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { SurveyModel } from '@/domain/models'
import React, { useEffect, useState } from 'react'

type Props = {
  loadSurveyList: LoadSurveyList
}


const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: '',
    reload: false
    
  })

  useEffect(() => {
    loadSurveyList.loadAll()
    .then(surveys => setState({ ...state, surveys }))
    .catch(error => setState({ ...state, error: error.message }))
  }, [state.reload])
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{state, setState}}>
          {state.error ? <Error /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer /> 
    </div>
  )
}

export default SurveyList