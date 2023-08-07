import { makeApiUrl } from "@/main/factories/http/api-url-factory"
import { makeAuthorizeHttpClientDecorator } from "../../decorators"
import { LoadSurveyResult } from "@/domain/usecases"
import { RemoteLoadSurveyResult } from "@/data/usecases"

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpClientDecorator()) //recebo o token de acesso
}