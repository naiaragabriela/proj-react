import { HttpResponse } from "../../protocols/http"

export type HttpGetParams = {
    url: string,
    headers?: any 
}

export interface HttpGetClient<R = any> {
    get: (params: HttpGetParams) => Promise<HttpResponse<R>>

}