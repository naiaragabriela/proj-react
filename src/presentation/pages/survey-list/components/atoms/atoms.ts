import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { atom } from 'recoil'

export const surveyListState = atom ({
    key: 'surveyListState',
    default: {
        surveys: [] as LoadSurveyList.Model[],
        error: '',
        reload: false
    }
})