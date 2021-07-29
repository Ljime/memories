import jwtDecode from "jwt-decode"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { authActions } from "../store/authSlice"

const useExpireToken = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const expireToken = useCallback((token) => {
        const currentToken = jwtDecode(token)
        const expirationTime = (currentToken.exp - currentToken.iat) * 1000
        setTimeout(() => {
            dispatch(authActions.logout(currentToken))
            history.replace('/')
        }, expirationTime)
    }, [dispatch, history])
    return expireToken
}


export default useExpireToken