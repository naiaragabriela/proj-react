import { HttpClient } from "@/data/protocols/http";
import { AuthorizedHttpClientDecorator } from "@/main/decorators";
import { makeLocalStorageAdapter } from "../cache/local-storage-adapter-factory";
import { makeAxiosHttpClient } from "../http/axios-http-client-factory";

export const makeAuthorizeHttpClientDecorator = (): HttpClient => {
    return new AuthorizedHttpClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}