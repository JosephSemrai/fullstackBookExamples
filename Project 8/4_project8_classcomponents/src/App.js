import React from 'react'
import 'promise-polyfill/src/polyfill'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      notes: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/notes').then(res => {
      this.setState({ notes: res.data })
    })
  }

  handleClick() {
    this.setState({
      notes: []
    })
  }

  render() {
    if (this.state.notes.length === 0 ) {
      return <p>There are no notes</p>
    }

    return (
      <div>
        <h1>Notes App</h1>
        <div>
          {this.state.notes.map(n => n.content)}
        </div>
        <button onClick={this.handleClick}>Remove Notes</button>
      </div>
    )
  }
}

export default App

// FUNCTIONAL COMPONENT VERSION
// import React, { useState, useEffect} from 'react'
// import 'promise-polyfill/src/polyfill'
// import axios from 'axios'

// const App = () => {
//   const [notes, setNotes] = useState([])

//   useEffect(() =>{
//     axios.get('http://localhost:3001/notes').then(res => {
//       setNotes(res.data)
//     })
//   }, [])

//   const handleClick = () => {
//     setNotes([])
//   }

//   if (notes.length === 0) {
//     return <p>There are no notes</p>
//   }
  
//   return (
//     <div>
//       <h1>Notes App</h1>
//       <div>
//         {notes.map(n => n.content)}
//       </div>
//       <button onClick={handleClick}>Remove Notes</button>
//     </div>
//   )
// }

// export default App