import classes from './heading-2.module.css'

const HeadingTwo = (props) => {
    return <h2 className={classes.headingTwo}>
        {props.children}
    </h2>
}

export default HeadingTwo