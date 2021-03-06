import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const notes = [
    {
      id: 1,
      content: 'First Note',
      date: '2019-09-30T17:32:41.199Z',
      flagged: true
    },
    {
      id: 2,
      content: 'Second Note!',
      date: '2019-08-30T12:13:24.091Z',
      flagged: false
    },
    {
      id: 3,
      content: 'This is our third note.',
      date: '2019-08-30T12:20:14.998Z',
      flagged: true
    }
  ]

ReactDOM.render(<App notes={notes} />, document.getElementById('root'))
