import React from 'react'

const Note = ({ note, toggleFlagged }) => {
  return (
    <li className="mainNote card">
    <input type="checkbox" checked={note.flagged} onChange={toggleFlagged} />
    {note.content}
    </li>
  )
}

export default Note