import classes from './Memory.module.css'
import {Fragment, useState, useRef} from 'react'
import Modal from '../Modal/Modal'
import HeadingThree from "../UI/heading-3"
import Button from "../UI/Button"
import ButtonSecondary from "../UI/ButtonSecondary"
import useAxios from '../../hooks/useAxios'
import Form from '../Form/Form'
import Input from '../Form/Input'
import FileInput from '../Form/FileInput'
import TextArea from '../Form/TextArea'

const Memory = (props) => {

    const {sendRequest: sendDeleteRequest} = useAxios()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [image, setImage] = useState(null)
    const titleRef = useRef('')
    const descRef = useRef('')
    const { error, isLoading, sendRequest: sendUpdateRequest, finishedLoading } = useAxios()
   
    const deleteMemoryHandler = async () => {
        await sendDeleteRequest({
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
        setShowDeleteModal(true)
    }

    const hideDeleteMemoryModal = () => {
        setShowDeleteModal(false)
    }

    const updateMemoryHandler = async (e) => {
        const title = titleRef.current.value
        const desc = descRef.current.value
        const updates = []

        if(title) {
            updates.push('title')
        }

        if(image) {
            updates.push('image')
        }

        if(desc) {
            updates.push('description')
        }

        const fd = new FormData()
        fd.append('image', image)
        fd.append('title', title)
        fd.append('description', desc)
        fd.append('updates', updates)
        fd.append('id', props.id)

        await sendUpdateRequest({
            method:'PUT',
            url: '/update-memory',
            data: fd,
            headers: {
                 'Authorization' : `Bearer ${localStorage.getItem('token')}` 
            }
        })
        props.onDeleteMemorySubmit()
    }

    const showUpdateMemoryModal = () => {
        setShowUpdateModal(true)
    }
    
    const hideUpdateMemoryModal = () => {
        setShowUpdateModal(false)
    }

    const imageHandler = (e) => {
        setImage(e.target.files[0])
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
                                <li onClick={showUpdateMemoryModal} 
                                    className={classes.menuDropDownItem}>Update Memory</li>
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
            <Modal in={showDeleteModal}>
                <HeadingThree>Are You Sure You Want To Delete This Memory?</HeadingThree>
                <div>
                    <ButtonSecondary onClick={hideDeleteMemoryModal}>No</ButtonSecondary>
                    <Button onClick={deleteMemoryHandler}>Yes</Button>
                </div>
            </Modal>
            <Modal in={showUpdateModal}>
                <HeadingThree>Update Memory</HeadingThree>
                <Form>
                    <Input name='Title' ref={titleRef}></Input>
                    <FileInput onChange={imageHandler} name='Image'></FileInput>
                    <TextArea name='Description' ref={descRef}></TextArea>
                </Form>
                <div>
                    <ButtonSecondary onClick={hideUpdateMemoryModal}>Cancel</ButtonSecondary>
                    <Button onClick={updateMemoryHandler}>Submit</Button>
                </div>
            </Modal>
        </Fragment>
    )
}

export default Memory







