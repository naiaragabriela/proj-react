import { makeApiUrl } from "@/main/factories/http/api-url-factory"
import { makeAuthorizeHttpClientDecorator } from "../../decorators"
import { SaveSurveyResult } from "@/domain/usecases"
import { RemoteSaveSurveyResult } from "@/data/usecases"

export const makeRemoteSaveSurveyResult = (id: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpClientDecorator()) //recebo o token de acesso
}