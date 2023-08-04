import Styles from './result-styles.scss'
import { Calendar } from '../../../../components'
import { SurveyResultAnswer } from '..'
import FlipMove from 'react-flip-move'
import { useHistory } from 'react-router-dom'
import { LoadSurveyResult } from '../../../../../domain/usecases'
import React from 'react'

type Props = {
    surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const { goBack } = useHistory()
  return (
    <>
      <hgroup> 
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={Styles.answerList}>
        <>
          {surveyResult.answers.map(answer => <SurveyResultAnswer key={answer.answer}  answer={answer} />)}
        </>
      </FlipMove>
      <button className={Styles.button} data-testid="back-button" onClick={goBack}>Voltar</button> 
    </>
  )
}

export default Result