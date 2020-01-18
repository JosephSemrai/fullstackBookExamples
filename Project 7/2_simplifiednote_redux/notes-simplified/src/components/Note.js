import React from 'react' // eslint-disable-line no-unused-vars

const Note = ({ note, toggleFlagged }) => {

  return (
    <li>
      <input 
        name="note"
        type="checkbox" 
        alt="Toggle Flagged" 
        checked={note.flagged} 
        onChange={toggleFlagged}
      />
      {note.textContent}
    </li>
  )
}

export default Note