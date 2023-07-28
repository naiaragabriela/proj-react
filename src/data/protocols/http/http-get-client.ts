export type HtttpGetParams = {
    url: string
}

export interface HttpGetClient {
    get: (params: HtttpGetParams) => Promise<void>

}