import { mockGetRequest, GetStorageSpy } from "@/data/test"
import { AuthorizedHttpGetClientDecorator } from "./authorize-http-get-client-decorator"

type SutTypes = {
  sut: AuthorizedHttpGetClientDecorator
  getStorageSpy: GetStorageSpy
}

const makeSut = (): SutTypes => {
    const getStorageSpy = new GetStorageSpy()
    const sut = new AuthorizedHttpGetClientDecorator(getStorageSpy)
    return {
        sut,
        getStorageSpy
    }
}

describe('AuthorizedHttpGetClientDecorator', () => { 
    test('Should call GetStorage with correct value', () => {
        const { sut, getStorageSpy } = makeSut()
        sut.get(mockGetRequest())
        expect(getStorageSpy.key).toBe('account')
    })

    test('Should not add headers if getStorage is invalid', () => {
        const getStorageSpy = new GetStorageSpy()
        const sut = new AuthorizedHttpGetClientDecorator(getStorageSpy)
        sut.get(mockGetRequest())
        expect(getStorageSpy.key).toBe('account')
    })
})