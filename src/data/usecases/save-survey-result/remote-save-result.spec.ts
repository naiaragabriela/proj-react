import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { RemoteSaveSurveyResult } from '@/data/usecases'
import faker from 'faker'
import { mockSaveSurveyResultParams } from '@/domain/test'



type SutTypes = {
    sut: RemoteSaveSurveyResult
    httpClientSpy: HttpClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
    const httpClientSpy = new HttpClientSpy()
    const sut = new RemoteSaveSurveyResult(url,httpClientSpy)
    return {
        sut,
        httpClientSpy
    }
}


describe('RemoteSaveSurveyResult', () => {
    test('Should call HttpClient with correct URL values', async () => {
        const url = faker.internet.url()
        const { sut, httpClientSpy } = makeSut(url)
        httpClientSpy.response = {
            statusCode: HttpStatusCode.ok,
            body: mockRemoteSurveyResultModel()
        }
        const saveSurveyResultParams = mockSaveSurveyResultParams()
        await sut.save(saveSurveyResultParams)
        expect(httpClientSpy.url).toBe(url)
        expect(httpClientSpy.method).toBe('put')
        expect(httpClientSpy.body).toEqual(saveSurveyResultParams)
    })
})