import classes from "./FormRedirect.module.css"
import { Link } from "react-router-dom"
const FormRedirect = (props) => {
	return (
		<Link className={`${classes.link} ${props.className}`} to={props.to}>
			{props.children}
		</Link>
	)
}

export default FormRedirect

