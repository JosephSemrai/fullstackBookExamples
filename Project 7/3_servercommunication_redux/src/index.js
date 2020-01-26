import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

import noteReducer, { initNotes } from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'

import noteService from './services/noteService'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

noteService.getAll().then(notes =>
  store.dispatch(initNotes(notes))
);


ReactDOM.render(
  <Provider store={store}> 
    <App store={store} />
  </Provider>,
  document.getElementById('root')
)
