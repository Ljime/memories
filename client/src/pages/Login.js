import Form from "../components/Form/Form"
import Input from "../components/Form/Input"
import classes from "./Login.module.css"
import Button from "../components/UI/Button"
import useAxiosPost from "../hooks/useAxiosPost"
import { useRef, useCallback } from "react"
import validator from "validator"
import useInputValidation from "../hooks/useInputValidation"
import FormError from "../components/Form/FormError"
import InputError from '../components/Form/InputError'
import Spinner from "../components/UI/Spinner"
import { useDispatch } from "react-redux"
import { authActions } from "../store/authSlice"
import { useHistory } from "react-router-dom"

const Login = () => {

    const {isValid: emailIsValid,  validateInput: validateEmail} = useInputValidation((value) => validator.isEmail(value))
    const {isValid: passwordIsValid,  validateInput: validatePassword} = useInputValidation((value) => value.length > 5)
	const {error, isLoading, finishedLoading, sendRequest} = useAxiosPost()
    const emailRef = useRef()
	const passwordRef = useRef()

	const dispatch = useDispatch()
	const history = useHistory()

	const onSubmitHandler = useCallback (async (event) => {
		event.preventDefault()
		const email = emailRef.current.value
		const password = passwordRef.current.value

		const response = await sendRequest('/user-login', {email, password})

		if(response) {
			dispatch(authActions.login())
			history.push('/memories')
		}

	}, [sendRequest, dispatch, history])

	const onEmailBlurHandler = () => {
		validateEmail(emailRef.current.value)
	}

	const onPasswordBlurHandler = () => {
		validatePassword(passwordRef.current.value)
	}
	
	return (
		<Form onSubmit={onSubmitHandler}>
			<Input
				className={!emailIsValid ? classes.inputError : ""}
				onBlur={onEmailBlurHandler}
				ref={emailRef}
				name="Email"
			></Input>
			<InputError
				error={!emailIsValid}
				errorMessage="Email is Invalid"
			></InputError>
			<Input
				className={!passwordIsValid ? classes.inputError : ""}
				onBlur={onPasswordBlurHandler}
				ref={passwordRef}
				name="Password"
				type="password"
			></Input>
			<InputError
				error={!passwordIsValid}
				errorMessage="Passwords Should Be More Than 6 Characters"
			></InputError>
			<div className={classes.buttonContainer}>
				{isLoading ? (
					<span>
						<Spinner></Spinner>
					</span>
				) : (
					<Button className={classes.submitButton}>Log In</Button>
				)}
			</div>
			<FormError
				finishedLoading={finishedLoading}
				error={error}
				successMessage="Successfully Logged In!"
				errorMessage="Unable To Log In, Please Check Your Credentials"
			></FormError>
		</Form>
	)
}

export default Login


