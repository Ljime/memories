import React from 'react'
import classes from './TextArea.module.css'

const TextArea = React.forwardRef((props, ref) => {

    return (
        <div className={`${classes.descDiv} ${props.className}`}>
            <label htmlFor={props.name}>{props.name}</label>
            <textarea onBlur={props.onBlur} ref={ref} className={classes.desc} type="text" id={props.name}></textarea>
        </div>
    )
})

export default TextArea