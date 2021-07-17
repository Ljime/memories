import Form from '../components/Form/Form'
import Input from '../components/Form/Input'
import classes from './Sign-Up.module.css'
import Button from '../components/UI/Button'
import useAxiosPost from '../hooks/useAxiosPost'
import { useRef, useCallback } from 'react'
import validator from 'validator'
import useInputValidation from '../hooks/useInputValidation'
import FormError from '../components/Form/FormError'
import InputError from '../components/Form/InputError'
import Spinner from '../components/UI/Spinner'

const SignUp = () => {

    const {isValid: emailIsValid,  validateInput: validateEmail} = useInputValidation((value) => validator.isEmail(value))
    const {isValid: usernameIsValid,  validateInput: validateUsername} = useInputValidation((value) => value.length > 0)
    const {isValid: passwordIsValid,  validateInput: validatePassword} = useInputValidation((value) => value.length > 5)
    const {error, isLoading, sendRequest, finishedLoading} = useAxiosPost()
    const usernameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const onSubmitHandler = useCallback ( async (event) => {
        event.preventDefault()
        const username = usernameRef.current.value
        const email = emailRef.current.value
        const password = passwordRef.current.value

        await sendRequest('/create-user', {
            username,
            email,
            password
        })

        usernameRef.current.value = ''
        emailRef.current.value = ''
        passwordRef.current.value = ''
    }, [sendRequest])
    
    const onUsernameBlurHandler = () => {
        validateUsername(usernameRef.current.value)
    }

	const onEmailBlurHandler = () => {
		validateEmail(emailRef.current.value)
	}

	const onPasswordBlurHandler = () => {
		validatePassword(passwordRef.current.value)
	}

    return (
					<Form onSubmit={onSubmitHandler}>
						<Input
							onBlur={onUsernameBlurHandler}
							className={!usernameIsValid ? classes.inputError : ""}
							ref={usernameRef}
							name="Username"
						></Input>
						<InputError
							error={!usernameIsValid}
							errorMessage="Username is Blank"
						></InputError>
						<Input
							onBlur={onEmailBlurHandler}
							className={!emailIsValid ? classes.inputError : ""}
							ref={emailRef}
							name="Email"
						></Input>
						<InputError
							error={!emailIsValid}
							errorMessage="Email is Invalid"
						></InputError>
						<Input
							onBlur={onPasswordBlurHandler}
							className={!passwordIsValid ? classes.inputError : ""}
							ref={passwordRef}
							name="Password"
							type="password"
						></Input>
						<InputError
							error={!passwordIsValid}
							errorMessage="Password Must Be 6 Characters Long"
						></InputError>
						<div className={classes.buttonContainer}>
							{isLoading ? (
								<span>
									<Spinner></Spinner>
								</span>
							) : (
								<Button className={classes.submitButton}>Sign Up</Button>
							)}
						</div>
						<FormError
							finishedLoading={finishedLoading}
							error={error}
							successMessage="Successfully Signed Up!"
							errorMessage="Unable To Sign Up! Please Check Your Credentials"
						></FormError>
					</Form>
				)
}

export default SignUp


