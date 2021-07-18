import {useCallback, useState} from 'react'
import axios from 'axios'
const useAxiosGet = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [finishedLoading, setFinishedLoading] = useState(false)

    const sendRequest = useCallback (async (url) => {
        setFinishedLoading(false)
        setError(null)
        setIsLoading(true)
        
        const data = await axios.get(url).catch(err => {
            setError('Error')
        })

        setIsLoading(false)
        setFinishedLoading(true)
        return data
    }, [])

    return {
        isLoading,
        error,
        finishedLoading,
        sendRequest
    }
}

export default useAxiosGet
