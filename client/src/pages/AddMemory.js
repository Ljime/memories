import { useRef, Fragment } from 'react'
import Form from '../components/Form/Form'
import Input from '../components/Form/Input'
import TextArea from '../components/Form/TextArea'
import Button from '../components/UI/Button'
import Spinner from '../components/UI/Spinner'
import useAxios from '../hooks/useAxios'
import classes from './AddMemory.module.css'
import useInputValidation from '../hooks/useInputValidation'
import FormError from '../components/Form/FormError'
import InputError from '../components/Form/InputError'

const AddMemory = () => {
    
    const {isValid: titleIsValid,  validateInput: validateTitle} = useInputValidation((value) => value.length > 0)
    const {isValid: imageIsValid,  validateInput: validateImage} = useInputValidation((value) => value.length > 0)
    const {isValid: descIsValid,  validateInput: validateDesc} = useInputValidation((value) => value.length > 0)
    const {error, isLoading, sendRequest, finishedLoading} = useAxios()
    const titleRef = useRef()
    const imageRef = useRef()
    const descRef = useRef()

    const addMemoryHandler = async (e) => {
        e.preventDefault()

        const title = titleRef.current.value
        const imageURL = imageRef.current.value
        const desc = descRef.current.value
        
        await sendRequest({
            method: "POST",
            url: "/add-memory",
            data: {
                title,
                imageURL,
                description: desc,
             },
             headers: {
                 'Authorization' : `Bearer ${localStorage.getItem('token')}` 
             }
        })

        titleRef.current.value = ''
        imageRef.current.value = ''
        descRef.current.value = '' 
    }

    const onTitleBlurHandler = () => {
        validateTitle(titleRef.current.value)
    }

    const onImageBlurHandler = () => {
        validateImage(imageRef.current.value)
    }

    const onDescBlurHandler = () => {
        validateDesc(descRef.current.value)
    }

    return (
        <Fragment>
            <Form onSubmit={addMemoryHandler}>
                <Input
                    className={!titleIsValid ? classes.inputError : ""}
                    onBlur={onTitleBlurHandler}
                    ref={titleRef}
                    name="Title"
                ></Input>
                <InputError
                    error={!titleIsValid}
                    errorMessage="Title is Empty"
                ></InputError>
                <Input
                    className={!imageIsValid ? classes.inputError : ""}
                    onBlur={onImageBlurHandler}
                    ref={imageRef}
                    name="ImageURL"
                ></Input>
                <InputError
                    error={!imageIsValid}
                    errorMessage="ImageURL is Empty"
                ></InputError>
                <TextArea
                    className={!descIsValid ? classes.inputError : ""}
                    onBlur={onDescBlurHandler}
                    ref={descRef}
                    name="Description"
                ></TextArea>
                <InputError
                    error={!descIsValid}
                    errorMessage="Description is Empty"
                ></InputError>
                <div className={classes.buttonContainer}>
                    {isLoading ? (
                        <span>
                            <Spinner></Spinner>
                        </span>
                    ) : (
                        <Button className={classes.submitButton}>Add Memory</Button>
                    )}
                </div>
                <FormError
                    finishedLoading={finishedLoading}
                    error={error}
                    successMessage="Successfully Added Memory"
                    errorMessage='Unable to add Memory'
                ></FormError>
            </Form>
        </Fragment>
    )
}

export default AddMemory

/* {finishedLoading && !error && (
    <p className={classes.success}>Success!</p>
)}
{error && (
    <p className={classes.error}>Please Make Sure All Forms Are Filled</p>
)} */

