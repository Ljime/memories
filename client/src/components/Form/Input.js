import classes from './Input.module.css'
import React from 'react'
const Input = React.forwardRef((props, ref) => {
    return (
        <div className={`${classes.input} ${props.className}`}>
            <label htmlFor={props.name}>{props.name}</label>
            <input type={props.type} onBlur={props.onBlur} ref={ref}  id={props.name}></input>
        </div>
    )
})

export default Input