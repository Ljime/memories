import classes from './App.module.css'
import Home from './pages/Home';
import Memories from './pages/Memories';
import AddMemory from './pages/AddMemory';
import SignUp from './pages/Sign-Up';
import Login from './pages/Login';

import {Route, Switch, NavLink, Link, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Modal from "./components/Modal/Modal"
import Button from "./components/UI/Button"
import ButtonSecondary from "./components/UI/ButtonSecondary"
import HeadingTwo from "./components/UI/heading-2"
import { Fragment, useState } from "react"
import { authActions } from "./store/authSlice"
import { useDispatch } from "react-redux"
import LoggedInRoute from './components/Routes/LoggedInRoute';
import LoggedOutRoute from './components/Routes/LoggedOutRoute';
import { useHistory } from 'react-router-dom'
import LoggedOutNavLink from './components/Routes/LoggedOutNavLink';
import LoggedInNavLink from './components/Routes/LoggedInNavLink';
import useAxios from './hooks/useAxios';
import Spinner from './components/UI/Spinner';

function App() {
	const {sendRequest, isLoading} = useAxios()
	const loggedIn = useSelector(state => state.auth.loggedIn)
  	const [showModal, setShowModal] = useState(false)
	const dispatch = useDispatch()
	const history = useHistory()
	
	const hideLogoutModal = () => {
		setShowModal(false)
	}

	const showLogoutModal = () => {
		setShowModal(true)
	}

	const logoutHandler = async () => {
		setShowModal(false)
		console.log('hi')
		await sendRequest({
			url: "/user-logout",
			method: "POST",
			headers: {
				'Authorization': `Bearer ${localStorage.getItem("token")}`,
			}
		})
		dispatch(authActions.logout())
		history.push('/')
		history.go(0)
	}

 	 return (
		<div className="App">
			<header className={classes.header}>
				<div className={classes.flex}>
					<NavLink to="/memories" activeClassName={classes.active}>
						Memories
					</NavLink>
					<LoggedInNavLink to="/add-memory" activeClassName={classes.active}>
						AddMemory
					</LoggedInNavLink>
				</div>
				<div className={classes.flex}>
					<Link to="/">
						<h1>Memories</h1>
					</Link>
				</div>
				<div className={classes.flex}>
					{loggedIn && <Button onClick={showLogoutModal}>Logout</Button>}
					<LoggedOutNavLink to="/login" activeClassName={classes.active}>
						Login
					</LoggedOutNavLink>
					<LoggedOutNavLink to="/signup" activeClassName={classes.active}>
						Sign Up
					</LoggedOutNavLink>
				</div>
			</header>

			<Switch>
				<Route path="/" exact>
					<Home></Home>
				</Route>
				<Route path="/memories">
					<Memories></Memories>
				</Route>
				<LoggedInRoute path="/add-memory">
					<AddMemory></AddMemory>
				</LoggedInRoute>
				<LoggedOutRoute path="/login">
					<Login></Login>
				</LoggedOutRoute>
				<LoggedOutRoute path="/signup">
					<SignUp></SignUp>
				</LoggedOutRoute>
				<Route path='*'>
					<Redirect to='/'></Redirect>
				</Route>
			</Switch>

			<Modal in={showModal}>
				{isLoading && <Spinner></Spinner>}
				{!isLoading && 
					<Fragment>
						<HeadingTwo>Are You Sure You Want To Log Out?</HeadingTwo>
						<div>
							<ButtonSecondary onClick={hideLogoutModal}>No</ButtonSecondary>
							<Button onClick={logoutHandler}>Yes</Button>
						</div>
					</Fragment>
				}
				
			</Modal>
		</div>
	)
}

export default App;


