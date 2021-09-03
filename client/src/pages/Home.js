import Button from '../components/UI/Button'
import ButtonSecondary from '../components/UI/ButtonSecondary'
import HeadingTwo from '../components/UI/heading-2'
import HeadingThree from '../components/UI/heading-3'
import classes from './Home.module.css'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <section className={classes.home}>
            <div className={classes.overlay}>
                <div className={classes.info}>
                    <HeadingTwo>Save Your Most Memorable Moments</HeadingTwo>
                    <HeadingThree>The Best Memories Kept Safe Here</HeadingThree>
                    <div className={classes.buttonContainer}>
                        <Link to='/login'>
                            <Button>Log In</Button>
                        </Link>
                        <Link to='/signup'>
                            <ButtonSecondary>Sign Up</ButtonSecondary>
                        </Link>
                    </div>
                </div>
                <div className={classes.empty}>

                </div>
            </div>
        </section>
    )
}

export default Home