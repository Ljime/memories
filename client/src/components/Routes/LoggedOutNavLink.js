import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
const LoggedOutNavLink = (props) => {
	const loggedIn = useSelector((state) => state.auth.loggedIn)
	if (!loggedIn) {
		return <NavLink {...props}></NavLink>
	}
	return null
}

export default LoggedOutNavLink
