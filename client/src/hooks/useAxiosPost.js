import {useCallback, useState} from 'react'
import axios from "axios"

const useAxiosPost = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [finishedLoading, setFinishedLoading] = useState(false)

    const sendRequest = useCallback(async (url, data) => {
        setError(null)
        setIsLoading(true)
        setFinishedLoading(false)
        const response = await axios.post(url , data).catch(err => {
            setError('error')
        })

        setFinishedLoading(true)
        setIsLoading(false)
        return response
    }, [])

    return {
        isLoading,
        error,
        finishedLoading,
        sendRequest
    }
}


export default useAxiosPost


