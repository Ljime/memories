import { useCallback, useState } from "react"
import axios from "axios"

const useAxios = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)
	const [finishedLoading, setFinishedLoading] = useState(false)

	const sendRequest = useCallback(async (data) => {
		setError(null)
		setIsLoading(true)
		setFinishedLoading(false)

		const response = await axios({
            method: data.method,
            url: data.url,
            headers: data.headers,
            data: data.data
        }).catch((err) => {
			setError('Error')
		})
		setFinishedLoading(true)
		setIsLoading(false)
		return response
	}, [])

	return {
		isLoading,
		error,
		finishedLoading,
		sendRequest,
	}
}

export default useAxios


