import { loginState } from './atoms'
import { FormStatusBase } from '../../../components'
import { useRecoilState } from 'recoil'
import React from 'react'


const FormStatus: React.FC= () => {
    const [state] = useRecoilState(loginState)
    return (
        <FormStatusBase state={state} />
    )
}
export default FormStatus