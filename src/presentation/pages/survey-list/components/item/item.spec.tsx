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
      })
      makeSut(survey)
      expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp )
      expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    })

    test('Should render with correct values', () => {
        const survey = Object.assign(mockSurveyModel(), {
            didAnswer: false,
        })
        makeSut(survey)
        expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown )
        expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
      })
})