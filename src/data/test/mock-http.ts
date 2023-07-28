import { HttpGetClient, HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode, HtttpGetParams } from '@/data/protocols/http'
import faker from 'faker'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})


export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}


export class HttpGetClientSpy implements HttpGetClient {
  url: string

 async get (params: HtttpGetParams): Promise<void> {
  this.url = params.url
 }
}