import classes from "./Form.module.css"

const Form = (props) => {
	return (
		<form onSubmit={props.onSubmit} className={`${classes.form} ${props.className}`}>
            {props.children}
		</form>
	)
}

export default Form

