import noteReducer from './noteReducer'
import deepFreeze from 'deep-freeze'

describe('noteReducer Unit Tests', () => {
  test('action NEW_NOTE returns new state', () => {
    const state = []
    const action = {
      type: 'NEW_NOTE',
      data: {
        content: 'This should update the store state',
        flagged: false,
        id: 1
      }
    }

    deepFreeze(state)
    const newState = noteReducer(state, action)

    expect(newState.length).toBe(1)
    expect(newState).toContainEqual(action.data)
  })

  test('action TOGGLE_FLAGGED returns new state with note flagged changed', () => {
    const state = [
      {
        content: 'This is stored in the store',
        flagged: false,
        id: 1
      },
      {
        content: 'This state will be updated via actions',
        flagged: true,
        id: 2
      }]
  
    const action = {
      type: 'TOGGLE_FLAGGED',
      data: {
        id: 2
      }
    }
  
    deepFreeze(state)
    const newState = noteReducer(state, action)
  
    expect(newState.length).toBe(2)
  
    expect(newState).toContainEqual(state[0])
  
    expect(newState).toContainEqual({
      content: 'This state will be updated via actions',
      flagged: false,
      id: 2
    })
  })
})
