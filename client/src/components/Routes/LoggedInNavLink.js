import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
const LoggedInNavLink = (props) => {
	const loggedIn = useSelector((state) => state.auth.loggedIn)
	if (loggedIn) {
		return <NavLink {...props}></NavLink>
	}
	return null
}

export default LoggedInNavLink
