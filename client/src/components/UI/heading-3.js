import classes from "./heading-3.module.css"

const HeadingThree = (props) => {
	return <h3 className={classes.headingThree}>{props.children}</h3>
}

export default HeadingThree
