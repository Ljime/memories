import classes from './FormError.module.css'
import { Fragment } from 'react'

const FormError = (props) => {
    return (
        <Fragment>
            {props.finishedLoading && !props.error && <p className={classes.success}>{props.successMessage}</p>}
            {props.error && (
                <p className={classes.error}>{props.errorMessage}</p>
            )}
        </Fragment>
    )
}

export default FormError


