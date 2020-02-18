import React from 'react'
import { Link } from 'react-router-dom'

const Note = ({ note, toggleFlagged }) => {
  if (!note) {
    note = {
      flagged: false,
      content: 'Note content not found'
    }
  }
  return (
    <li className="mainNote card">
      <input type="checkbox" alt="Toggle Flagged" checked={note.flagged} onChange={toggleFlagged} />
      <Link to={`/notes/${note.id}`}>
        {note.content}
      </Link>
    </li>
  )
}

export default Note