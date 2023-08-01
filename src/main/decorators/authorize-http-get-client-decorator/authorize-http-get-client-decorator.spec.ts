import { mockGetRequest, GetStorageSpy } from "@/data/test"
import { AuthorizedHttpGetClientDecorator } from "./authorize-http-get-client-decorator"

describe('AuthorizedHttpGetClientDecorator', () => { 
    test('Should call GetStorage with correct value', () => {
        const getStorageSpy = new GetStorageSpy()
        const sut = new AuthorizedHttpGetClientDecorator(getStorageSpy)
        sut.get(mockGetRequest())
        expect(getStorageSpy.key).toBe('account')
    })
})