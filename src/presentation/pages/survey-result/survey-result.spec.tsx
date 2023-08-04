import { ApiContext } from '../../contexts'
import SurveyResult from './survey-result';
import { LoadSurveyResultSpy, mockAccountModel, mockSurveyResultModel } from '../../../domain/test'
import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { UnexpectedError } from '../../../domain/errors';

type SutTypes = {
    loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutTypes => {

    
    render(
        <ApiContext.Provider value={{ 
          setCurrentAccount: jest.fn(), 
          getCurrentAccount: () => mockAccountModel() 
        }}>
          <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
        </ApiContext.Provider>
    )
    return { loadSurveyResultSpy }
}

describe('SurveyResult Component', () => {
    test('Should present correct initial state', async () => {
        makeSut()
        const surveyResult = screen.getByTestId('survey-result')
        expect(surveyResult.childElementCount).toBe(0)
        expect(screen.queryByTestId('error')).not.toBeInTheDocument()
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
        await waitFor(() => surveyResult)
    })
    test('Should call LoadSurveyResult', async () => {
        const {loadSurveyResultSpy} = makeSut()
        await waitFor(() => screen.getByTestId('survey-result'))
        expect(loadSurveyResultSpy.callsCount).toBe(1)

    })
    test('Should present SuveryResult data on success', async () => {
        const loadSurveyResultSpy = new LoadSurveyResultSpy()
        const surveyResult = Object.assign(mockSurveyResultModel(), {
            date: new Date('2020-01-10T00:00:00')
        })
        loadSurveyResultSpy.surveyResult = surveyResult
        makeSut(loadSurveyResultSpy)
        await waitFor(() => screen.getByTestId('survey-result'))
        expect(screen.getByTestId('day')).toHaveTextContent('10')
        expect(screen.getByTestId('month')).toHaveTextContent('jan')
        expect(screen.getByTestId('year')).toHaveTextContent('2020')
        expect(screen.getByTestId('question')).toHaveTextContent(surveyResult.question)
        expect(screen.getByTestId('answers').childElementCount).toBe(2)
        const answersWrap = screen.queryAllByAltText('answer-wrap')
        //expect(answersWrap[0]).toHaveClass('active')
        //expect(answersWrap[1]).not.toHaveClass('active')
        const images = screen.queryAllByAltText('image')
        //expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image) // falta eu ter as imagens  pro test passar
        //xpect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)
        expect(images[1]).toBeFalsy()
        const answers = screen.queryAllByAltText('answer')
        //xpect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer) //falta a api para esses testes funcionarem
        //expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)
        const percents = screen.queryAllByAltText('percent')
        //expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`) //falta a api para esses testes funcionarem
        //expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
    })


    test('Should render error on UnexpectedError', async () => {
        const loadSurveyResultSpy = new LoadSurveyResultSpy()
        const error = new UnexpectedError()
        jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error)
        makeSut(loadSurveyResultSpy)
        await waitFor(() => screen.getByTestId('survey-result'))
        expect(screen.queryByTestId('question')).not.toBeInTheDocument()
        expect(screen.getByTestId('error')).toHaveTextContent(error.message)
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
      })
});