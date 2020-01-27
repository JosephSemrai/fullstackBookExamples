import noteService from '../services/noteService'

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

export const createNote = textContent => {
  return async dispatch => {
    const newNote = await noteService.create(textContent)
    dispatch({
      type: 'NEW_NOTE',
      data: newNote
    })
  }
}

export const toggleFlaggedOf = id => {
  return {
    type: 'TOGGLE_FLAGGED',
    data: { id }
  }
}

export const initNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: notes
    })
  }
}
export default noteReducer