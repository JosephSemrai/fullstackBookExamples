const noteReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_NOTES':
    return action.data
  case 'NEW_NOTE':
    return [...state, action.data]
  case 'TOGGLE_FLAGGED': {
    const noteId = action.data.id
    const originalNote = state.find(n => n.id === noteId)
    const updatedNote = {
      ...originalNote,
      flagged: !originalNote.flagged
    }
    return state.map(n => n.id === noteId ? updatedNote : n)
  }
  default:
    return state
  }
}

const generateId = () => Math.round(Number((Math.random() * 10000)))

export const createNote = (textContent) => {
  return {
    type: 'NEW_NOTE',
    data: {
      textContent,
      flagged: false,
      id: generateId()
    }
  }
}

export const toggleFlaggedOf = (id) => {
  return {
    type: 'TOGGLE_FLAGGED',
    data: { id }
  }
}

export const initNotes = (notes) => {
  return {
    type: 'INIT_NOTES',
    data: notes
  }
}
export default noteReducer