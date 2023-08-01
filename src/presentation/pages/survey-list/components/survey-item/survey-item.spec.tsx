import { SurveyItem } from '../../../../pages/survey-list/components'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { mockSurveyModel } from '../../../../../domain/test'
import { IconName } from '../../../../components'

describe('SurveyItem Component', () => {
    test('Should render with correct values', () => {
      const survey = mockSurveyModel()
      survey.didAnswer = true
      survey.date = new Date('2023-08-01T00:00:00')
      render(<SurveyItem survey={survey} />)
      expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp )
      expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
      expect(screen.getByTestId('day')).toHaveTextContent('1')
      expect(screen.getByTestId('month')).toHaveTextContent('ago')
      expect(screen.getByTestId('year')).toHaveTextContent('2023')
    })
})