import classes from "./InputError.module.css"
import Transition from "react-transition-group/Transition"

const InputError = (props) => {
	return (
		<Transition in={props.error} mountOnEnter unmountOnExit timeout={200}>
			{state => (
				<p className={`${classes.error} ${state === 'exiting' && classes.exiting}`}>{props.errorMessage}</p>
			)}
		</Transition>
	)
}

export default InputError
