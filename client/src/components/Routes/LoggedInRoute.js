import {useSelector} from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
const LoggedInRoute = (props) => {
    const loggedIn = useSelector(state => state.auth.loggedIn)
    if (loggedIn) {
        return <Route {...props}></Route>
    }
    return (
        <Redirect to='/memories' />
    )
}

export default LoggedInRoute