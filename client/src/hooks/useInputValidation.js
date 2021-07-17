import { useState } from "react"

const useInputValidation = (validation) => {
    const [isValid, setIsValid] = useState(true)

    const validateInput = (value) => {
        setIsValid(validation(value))
    }

    return {
        isValid,
        validateInput
    }    
}

export default useInputValidation