import { HttpResponse } from "."

export type HtttpGetParams = {
    url: string
}

export interface HttpGetClient<R = any> {
    get: (params: HtttpGetParams) => Promise<HttpResponse<R>>

}