import { SurveyItem } from '..'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { mockSurveyModel } from '../../../../../domain/test'
import { IconName } from '../../../../components'


const makeSut = (survey = mockSurveyModel()): void => {
    render(<SurveyItem survey={survey} />)
}

describe('SurveyItem Component', () => {
    test('Should render with correct values', () => {
      const survey = Object.assign(mockSurveyModel(), {
          didAnswer: true,
          date: new Date('2023-08-01T00:00:00')
      })
      makeSut(survey)
      expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp )
      expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
      expect(screen.getByTestId('day')).toHaveTextContent('01')
      expect(screen.getByTestId('month')).toHaveTextContent('ago')
      expect(screen.getByTestId('year')).toHaveTextContent('2023')
    })

    test('Should render with correct values', () => {
        const survey = Object.assign(mockSurveyModel(), {
            didAnswer: false,
            date: new Date('2019-05-03T00:00:00')
        })
        makeSut(survey)
        expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown )
        expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
        expect(screen.getByTestId('day')).toHaveTextContent('03')
        expect(screen.getByTestId('month')).toHaveTextContent('mai')
        expect(screen.getByTestId('year')).toHaveTextContent('2019')
      })
})