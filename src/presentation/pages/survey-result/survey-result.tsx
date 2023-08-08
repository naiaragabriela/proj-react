import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import { Loading , Error} from '@/presentation/components'
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hoocks'
import { SurveyResultContext, SurveyResultData } from './components'
import Styles from './survey-result-styles.scss'
import React, { useEffect, useState} from 'react'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props>= ({ loadSurveyResult, saveSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, surveyResult: null, isLoading: false, error: error.message })
  })
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })


  const onAnswer = (answer:string): void => {
    if(state.isLoading) {
      return 
    }
    setState(state => ({...state, isLoading: true }))
    saveSurveyResult.save({ answer })
    .then(surveyResult => setState(state => ({ ...state, isLoading: false, surveyResult })))
    .catch(handleError)
  }

  const reload = (): void => setState(state => ({
    isLoading:false, 
    surveyResult: null, 
    error: '', 
    reload: !state.reload
  }))



  useEffect(() => {
    loadSurveyResult.load()
    .then(surveyResult => setState(state => ({ ...state, surveyResult })))
    .catch(handleError)
  }, [state.reload])

    return (
      <div className={Styles.surveyResultWrap}>
        <Header />
        <SurveyResultContext.Provider value={{ onAnswer }} > 
          <div data-testid="survey-result" className={Styles.contentWrap}>
            { state.surveyResult && <SurveyResultData surveyResult={state.surveyResult}/>}
            { state.isLoading && <Loading /> }
            { state.error && <Error error={state.error} reload={reload} /> }
          </div>
        </SurveyResultContext.Provider>
        <Footer /> 
      </div>
    )
}

export default SurveyResult



/*
 <li className={Styles.active}>
                  <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freecodecamp.org%2Fportuguese%2Fnews%2Freact-js-para-iniciantes-props-e-state-explicados%2F&psig=AOvVaw0ItCi48mPTl3U-Df1vFIic&ust=1691169488728000&source=images&cd=vfe&opi=89978449&ved=0CA4QjRxqFwoTCKjM47r_wIADFQAAAAAdAAAAABAw" />
                  <span className={Styles.answer}>Resposta: React</span>
                  <span className={Styles.percent}>50%</span>
                </li>
                <li className={Styles.active}>
                  <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freecodecamp.org%2Fportuguese%2Fnews%2Freact-js-para-iniciantes-props-e-state-explicados%2F&psig=AOvVaw0ItCi48mPTl3U-Df1vFIic&ust=1691169488728000&source=images&cd=vfe&opi=89978449&ved=0CA4QjRxqFwoTCKjM47r_wIADFQAAAAAdAAAAABAw" />
                  <span className={Styles.answer}>Resposta: React</span>
                  <span className={Styles.percent}>50%</span>
                </li>
*/