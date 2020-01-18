import React from 'react' // eslint-disable-line no-unused-vars
import { filterNotesBy } from '../reducers/filterReducer'
import { connect } from 'react-redux'
const NoteFilter = ({ filter, filterNotes }) => {

  const showAll = filter === 'ALL'

  return (
    <div>
      <button onClick={() => filterNotes(showAll ? 'FLAGGED' : 'ALL')}>
          Show {showAll ? 'Flagged' : 'All' }
      </button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  filterNotes: filterNotesBy
}

const ConnectedNoteFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteFilter)
export default ConnectedNoteFilter