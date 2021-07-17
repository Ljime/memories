import React from 'react'
import classes from './Modal.module.css'
import ReactDom from "react-dom"
import Transition from 'react-transition-group/Transition'
const ModalOverlay = (props) => {

    return (
        <Transition in={props.in} mountOnEnter unmountOnExit timeout={300}>
            {(state) => (
            <div className={`${classes.modal} ${props.className} ${state === 'exiting' && classes.exiting}`}>
                {props.children}
            </div>
            )}
        </Transition>
    )
}

const BackDrop = (props) => {
    return (
        <Transition in={props.in} mountOnEnter unmountOnExit timeout={300}>
            {(state) => (
                <div className={`${classes.backdrop} ${state === 'exiting' && classes.backdropExiting}`}></div>
            )}
        </Transition>
    )
}

const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDom.createPortal(
                <ModalOverlay
                    in={props.in}
                    show={props.show}
                    className={`${classes.modal} ${props.className}`}
                >
                    {props.children}
                </ModalOverlay>,
                document.getElementById("overlays")
            )}
            {ReactDom.createPortal(
                <BackDrop
                    in={props.in}
                    show={props.show}
                    className={classes.backdrop}
                ></BackDrop>,
                document.getElementById("overlays")
            )}
        </React.Fragment>
    )
}

export default Modal