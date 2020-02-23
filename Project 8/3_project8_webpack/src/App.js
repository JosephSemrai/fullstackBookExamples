import React, { useState } from 'react'
import './index.css'
import PromisePolyfill from 'promise-polyfill'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}

const App = () => {
  const [testArray, setTestArray] = useState() // Defined with no value

  const handleArrayAdd = () => {
    setTestArray(testArray.concat('Added!')) // Tries to concat 'Added!' to an object that isn't an array
  }

  return (
    <>
      {testArray}
      <button onClick={handleArrayAdd} className="test">Add value to array</button>
    </>
  )
}

export default App