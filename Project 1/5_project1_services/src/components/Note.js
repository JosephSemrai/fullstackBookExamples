import React from 'react'

const Note = ({ note, toggleFlagged }) => {
  return (
    <li>
    <input type="checkbox" checked={note.flagged} onChange={toggleFlagged} />
    {note.content}
    </li>
  )
}

export default Note