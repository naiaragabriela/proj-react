import React, { useContext } from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { ApiContext } from '../../contexts'


const PrivateRoute: React.FC<RouteProps>= (props: RouteProps) => {
const { getCurrentAccount } = useContext(ApiContext);
/*return <Route {...props} />
}*/

return getCurrentAccount?.()?.accessToken

    ? <Route {...props} />
    : <Route {...props} component={() => <Redirect to="/login" />} /> 

}


export default PrivateRoute