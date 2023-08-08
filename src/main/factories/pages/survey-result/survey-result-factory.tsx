import { SurveyResult } from '../../../../presentation/pages' 
import { makeRemoteLoadSurveyResult, makeRemoteSaveSurveyResult } from '../../usecases'
import { useParams } from 'react-router-dom'
import React from 'react'

export const makeSurveyResult: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  return (
    <SurveyResult 
    loadSurveyResult={makeRemoteLoadSurveyResult(id)} 
    saveSurveyResult={makeRemoteSaveSurveyResult(id)} 
    />
  )
}