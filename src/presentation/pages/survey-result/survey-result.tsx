import Header from '@/presentation/components/header/header'
import Footer from '@/presentation/components/footer/footer'
import { Loading } from '@/presentation/components'
import Styles from './survey-result-styles.scss'
import FlipMove from 'react-flip-move'
import React from 'react'

const SurveyResult: React.FC = () => {
    return (
      <div className={Styles.surveyResultWrap}>
        <Header />
        <div className={Styles.contentWrap}>
          <h2>Pergunta: qual seu framework favorito? </h2>
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
            <li>
              <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freecodecamp.org%2Fportuguese%2Fnews%2Freact-js-para-iniciantes-props-e-state-explicados%2F&psig=AOvVaw0ItCi48mPTl3U-Df1vFIic&ust=1691169488728000&source=images&cd=vfe&opi=89978449&ved=0CA4QjRxqFwoTCKjM47r_wIADFQAAAAAdAAAAABAw" />
              <span className={Styles.answer}>Resposta: React</span>
              <span className={Styles.percent}>50%</span>
            </li>
          </FlipMove>
          <button>Voltar</button> 
          <Loading />
        </div>
        <Footer /> 
      </div>
    )
}

export default SurveyResult