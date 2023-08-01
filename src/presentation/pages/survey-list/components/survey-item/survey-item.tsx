import Styles from './survey-item-styles.scss'
import { IconName, Icon } from '../../../../components'
import React from 'react'

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={IconName.thumbUp}/>
        <time>
          <span className={Styles.day}>26</span>
          <span className={Styles.month}>03</span>
          <span className={Styles.year}>2022</span>
        </time>
        <p> Qual é seu framework web favorito?</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem