const notes = [
  {
    'content': 'This is a mock note!',
    'flagged': true,
    'date': '2019-12-23T04:32:47.154Z',
    'user': {
      'username': 'jassuf',
      'name': 'joe',
      'id': '5df151019f8679503a3de183'
    },
    'id': '5e00436f4001db92b2ab0a00'
  },
  {
    'content': 'This is another mock note.',
    'flagged': false,
    'date': '2019-12-23T04:33:21.129Z',
    'user': {
      'username': 'jassuf',
      'name': 'joe',
      'id': '5df151019f8679503a3de183'
    },
    'id': '5e0043914001db92b2ab0a01'
  },
  {
    'content': 'This is the third mock note.',
    'flagged': false,
    'date': '2019-12-23T07:11:38.841Z',
    'user': {
      'username': 'jassuf',
      'name': 'joe',
      'id': '5df151019f8679503a3de183'
    },
    'id': '5e0068aa4001db92b2ab0a02'
  }
]

const getAll = () => {
  return Promise.resolve(notes)
}

export default { getAll }