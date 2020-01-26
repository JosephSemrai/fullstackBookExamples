const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {   
  case 'SET_FILTER':
    return action.filterType
  default:
    return state
  }
}
  
export const filterNotesBy = filterType => {
  return {
    type: 'SET_FILTER',
    filterType
  }
}

export default filterReducer