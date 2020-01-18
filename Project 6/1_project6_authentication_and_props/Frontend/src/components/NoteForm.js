import React from 'react'

const noteForm = ({
    addNote,
    noteField,
    handleInputChange
    }) => (
    <form onSubmit={addNote}>
        <input
        value={noteField}
        onChange={handleInputChange}
        />
        <button type="submit">Add Note</button>
    </form>  
)

export default noteForm