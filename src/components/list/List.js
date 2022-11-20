import React, { useState, useEffect } from 'react'
import "./list.scss"
import Item from "../item/Item"

function List() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [notes, setNotes] = useState([])



    // const submitHandle = (e) => {
    //     e.preventDefault();
    //     let newNote = { title, description, id: new Date().getTime().toString() }

    //     setNotes([...notes, newNote])
    //     setDescription("")
    //     setTitle("")


    // }
    // ======================================================




    useEffect(() => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch("http://localhost:3001/notes", requestOptions)
            .then(res => res.json())
            .then(data => setNotes(data))
    }, [])



    const submitHandle = (e) => {

        e.preventDefault()
        let newNote = { title, description }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newNote)
        }

        fetch("http://localhost:3001/notes", requestOptions)
            .then(res => res.json())
            .then(data => console.log("1", data))
            .catch(error => console.log(error.messsage))

        setNotes([...notes, newNote])
        setDescription("")
        setTitle("")

    }

    return (
        <div className='main'>
            <div className='form' onSubmit={submitHandle}>
                <form className='form-container'>
                    <label>Title: </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label>Description:</label>
                    <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button type='submit'>Add</button>
                </form>

            </div>
            <div className='list'>
                <Item notes={notes} setNotes={setNotes} />

            </div>
        </div>
    )
}

export default List