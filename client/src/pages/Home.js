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
                            <Button>Get Started</Button>
                        </Link>
                        <Link to='/add-memory'>
                            <ButtonSecondary>Create A Memory</ButtonSecondary>
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