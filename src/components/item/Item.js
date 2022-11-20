import React, { useState } from 'react'
import "./item.scss"


function Item({ notes, setNotes }) {
    const [editingNotes, setEditingNotes] = useState(null)
    const [editingTitle, setEditingTitle] = useState("")
    const [editingDescription, setEditingDescription] = useState("")



    const deleteHandle = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(`https://mern-notes-api.onrender.com/notes/${id}`, requestOptions)
            .then(res => res.json())
        const deleted = notes.filter(d => d._id !== id)
        setNotes(deleted)
    }


    const editHandle = (id) => {

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: editingTitle,
                description: editingDescription
            })

        }
        fetch(`https://mern-notes-api.onrender.com/notes/${id}`, requestOptions)
            .then(res => res.json())
        const updated = notes.find(d => {
            if (d._id !== id) {
                return setNotes(updated)
            }
            setEditingNotes(null)
            setEditingDescription("")
            setEditingTitle("")
        })

    }

    return (

        <div className='items' >

            {
                notes.map(note => (
                    <div >

                        {editingNotes === note._id ? (
                            <div className='modal' key={note._id} >
                                <form className='modal-container' onSubmit={() => editHandle(note._id)}>
                                    <label>Title: </label>
                                    <input type="text" value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} />
                                    <label>Description:</label>
                                    <textarea type="text" value={editingDescription} onChange={e => setEditingDescription(e.target.value)} />
                                    <button type='submit'>Save</button>
                                </form>

                            </div>

                        ) : (

                            <div className='item' key={note._id} >
                                <h3>{note.title}</h3>
                                <p>{note.description}</p>
                                <div className='item-button'>
                                    <button className='btn-edit' onClick={() => setEditingNotes(note._id)}>Edit</button>
                                    <button className='btn-delete' onClick={() => deleteHandle(note._id)}>Delete</button>
                                </div>

                            </div>
                        )}
                    </div>
                ))
            }


        </div>
    )
}

export default Item
