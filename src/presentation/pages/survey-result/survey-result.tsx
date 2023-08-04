import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import { Calendar, Loading , Error} from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hoocks'
import Styles from './survey-result-styles.scss'
import FlipMove from 'react-flip-move'
import React, { useEffect, useState} from 'react'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props>= ({ loadSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState({ ...state, surveyResult: null, error: error.message })
  })
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  })

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
        <div data-testid="survey-result" className={Styles.contentWrap}>
          { state.surveyResult && 
            <>
              <hgroup> 
                <Calendar date={state.surveyResult.date} className={Styles.calendarWrap} />
                <h2 data-testid="question">{state.surveyResult.question}</h2>
              </hgroup>
              <FlipMove data-testid="answers" className={Styles.answerList}>
                {state.surveyResult.answers.map(answer => 
                <li 
                data-testid="answer-wrap" 
                key={answer.answer} 
                className={answer.isCurrentAccountAnswer ? Styles.active : ''}
                >
                  {answer.image && <img data-testid="image" src={answer.image} alt={answer.answer} />}
                  <span data-testid="answer" className={Styles.answer}>{answer.answer}</span>
                  <span data-testid="percent" className={Styles.percent}>{answer.percent}</span>
                </li>
                )}
              </FlipMove>
              <button>Voltar</button> 
            </>
          }
          { state.isLoading && <Loading /> }
          { state.error && <Error error={state.error} reload={reload} /> }
        </div>
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