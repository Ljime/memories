import classes from "./FileInput.module.css"
import React from "react"
const FileInput = React.forwardRef((props, ref) => {
	return (
		<div className={`${classes.input} ${props.className}`}>
			<label htmlFor={props.name}>{props.name}</label>
			<input
				type='file'
				onBlur={props.onBlur}
				ref={ref}
				id={props.name}
				name={props.name}
				onChange={props.onChange}
				formEncType='multipart/form-data'
			></input>
		</div>
	)
})

export default FileInput
