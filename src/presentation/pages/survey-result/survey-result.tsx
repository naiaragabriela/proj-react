import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import { Calendar, Loading , Error} from '@/presentation/components'
import { LoadSurveyResult } from '@/domain/usecases'
import Styles from './survey-result-styles.scss'
import FlipMove from 'react-flip-move'
import React, { useState } from 'react'

const SurveyResult: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model
  })

    return (
      <div className={Styles.surveyResultWrap}>
        <Header />
        <div data-testid="survey-result" className={Styles.contentWrap}>
          { state.surveyResult && 
            <>
              <hgroup> 
                <Calendar date={new Date()} className={Styles.calendarWrap} />
                <h2>Pergunta: qual seu framework favorito? </h2>
              </hgroup>
              <FlipMove className={Styles.answerList}>
                <li>
                  <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freecodecamp.org%2Fportuguese%2Fnews%2Freact-js-para-iniciantes-props-e-state-explicados%2F&psig=AOvVaw0ItCi48mPTl3U-Df1vFIic&ust=1691169488728000&source=images&cd=vfe&opi=89978449&ved=0CA4QjRxqFwoTCKjM47r_wIADFQAAAAAdAAAAABAw" />
                  <span className={Styles.answer}>Resposta: React</span>
                  <span className={Styles.percent}>50%</span>
                </li>
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
              </FlipMove>
              <button>Voltar</button> 
            </>
          }
          { state.isLoading && <Loading /> }
          { state.error && <Error error={state.error} reload={() => {}} /> }
        </div>
        <Footer /> 
      </div>
    )
}

export default SurveyResult