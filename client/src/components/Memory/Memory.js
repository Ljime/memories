import classes from './Memory.module.css'
import {Fragment, useState} from 'react'
import Modal from '../Modal/Modal'
import HeadingThree from "../UI/heading-3"
import Button from "../UI/Button"
import ButtonSecondary from "../UI/ButtonSecondary"
import useAxios from '../../hooks/useAxios'
const Memory = (props) => {

    const {sendRequest} = useAxios()
    const [showModal, setShowModal] = useState(false)

    const deleteMemoryHandler = async () => {
        await sendRequest({
            method: 'DELETE',
            url: '/delete-memory',
            data: {
                id: props.id
            },
            headers: {
                 'Authorization' : `Bearer ${localStorage.getItem('token')}` 
            }
        })
        
        props.onDeleteMemorySubmit()
    }

    const showDeleteMemoryModal = () => {
        setShowModal(true)
    }

    const hideMemoryModal = () => {
        setShowModal(false)
    }

    return (
        <Fragment>
            <div className={classes.card}>
                <div className={classes.imageContainer}>
                    <div className={classes.titleContainer}>
                        <h4>{props.title}</h4>
                        <div className={classes.menuContainer}>
                            <div className={classes.menu}></div>
                            <ul className={classes.menuDropDown}>
                                <li className={classes.menuDropDownItem}>Update Memory</li>
                                <li
                                    onClick={showDeleteMemoryModal}
                                    className={classes.menuDropDownItem}
                                >
                                    Delete Memory
                                </li>
                            </ul>
                        </div>
                    </div>
                    <img
                        className={classes.image}
                        src={`/memories/${props.id}/image`}
                        alt="Memory"
                    ></img>
                </div>
                <div className={classes.text}>
                    <h4>{props.title}</h4>
                    <p>{props.description}</p>
                </div>
            </div>
            <Modal in={showModal}>
                <HeadingThree>Are You Sure You Want To Delete This Memory?</HeadingThree>
                <div>
                    <ButtonSecondary onClick={hideMemoryModal}>No</ButtonSecondary>
                    <Button onClick={deleteMemoryHandler}>Yes</Button>
                </div>
            </Modal>
        </Fragment>
    )
}

export default Memory







