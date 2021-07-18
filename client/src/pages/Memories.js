import { useCallback, useEffect } from 'react'
import classes from './Memories.module.css'
import Memory from '../components/Memory/Memory'
import { useState } from 'react'
import useAxios from '../hooks/useAxios'
import Spinner from '../components/UI/Spinner'
import HeadingTwo from '../components/UI/heading-2'

const Memories = () => {
    const {error, isLoading, sendRequest, finishedLoading} = useAxios()
    const [memories, setMemories] = useState([])

    const fetchMemories = useCallback(async () => {
        const data = await sendRequest({
            url: "/memories",
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        
        const memories = [];

        if(!data || !data.data) {
            return setMemories([])
        }

        for (let item in data.data) {
            memories.push({
                id: data.data[item]._id,
                title: data.data[item].title,
                imageURL: data.data[item].imageURL,
                description: data.data[item].description
            })
        }

        setMemories(memories)
    }, [sendRequest])

    const onDeleteMemorySubmit = () => {
        setMemories([])
        fetchMemories()
    }
    
    useEffect(() => {
        fetchMemories()
    }, [fetchMemories])
    
    
    return (
        <section className={classes.home}>
            {isLoading && <Spinner></Spinner>}
            {memories.map(item => <Memory onDeleteMemorySubmit={onDeleteMemorySubmit} id={item.id} key={item.id} title={item.title} imageURL={item.imageURL} description={item.description}></Memory>)}
            {(error || (memories.length===0 && finishedLoading)) && <HeadingTwo>Unable to load memories</HeadingTwo>}
        </section>
    )
}


export default Memories

