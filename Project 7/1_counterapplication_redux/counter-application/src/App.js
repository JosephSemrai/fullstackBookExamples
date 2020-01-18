import React from 'react';
import { createStore } from 'redux'



const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'RESET':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

store.subscribe(() => {
  const currentStore = store.getState()
  console.log(currentStore)
})

const App = () => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <button 
        onClick={e => store.dispatch({ type: 'INCREMENT' })}
      >
        Increment
      </button>
      <button
        onClick={e => store.dispatch({ type: 'DECREMENT' })}
      >
        Decrement
      </button>
      <button 
        onClick={e => store.dispatch({ type: 'RESET' })}
      >
        Reset
      </button>
    </div>
  )
}

export default App;
