import { HttpClientSpy, mockRemoteSurveyResultModel } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { RemoteSaveSurveyResult } from '@/data/usecases'
import { mockSaveSurveyResultParams } from '@/domain/test'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import faker from 'faker'



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

    test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.forbidden
        }
        const promise = sut.save(mockSaveSurveyResultParams())
        await expect(promise).rejects.toThrow(new AccessDeniedError())
    })

    test('Should throw UnexpectedError if HttpClient returns 404', async () => {
        const { sut, httpClientSpy } = makeSut()
        httpClientSpy.response = {
            statusCode: HttpStatusCode.notFound
        }
        const promise = sut.save(mockSaveSurveyResultParams())
        await expect(promise).rejects.toThrow(new UnexpectedError())
    })

})