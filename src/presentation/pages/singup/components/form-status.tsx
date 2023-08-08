import { signUpState } from './atoms'
import { FormStatusBase } from '../../../components'
import { useRecoilValue } from 'recoil'
import React from 'react'


const FormStatus: React.FC= () => {
    const state = useRecoilValue(signUpState)
    return (
        <FormStatusBase state={state} />
    )
}
export default FormStatus