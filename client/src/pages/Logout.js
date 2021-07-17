import Modal from "../components/Modal/Modal"
import Button from "../components/UI/Button"
import ButtonSecondary from "../components/UI/ButtonSecondary"
import HeadingTwo from "../components/UI/heading-2"
import { useEffect, useState } from "react"
import { authActions } from "../store/authSlice"
import { useDispatch } from 'react-redux'
const Logout = () => {

    const [showModal, setShowModal] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        setShowModal(true)
    }, [])

    const hideLogoutModal = () => {
        setShowModal(false)
    }

    const logoutHandler = () => {
        dispatch(authActions.logout())
    }
    return (
        <Modal in={showModal}>
            <HeadingTwo>Are You Sure You Want To Log Out?</HeadingTwo>
            <ButtonSecondary onClick={hideLogoutModal}>No</ButtonSecondary>
            <Button onClick={logoutHandler}>Yes</Button>
        </Modal>
    )
}

export default Logout