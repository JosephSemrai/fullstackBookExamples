const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI

console.log('Connecting to: ', uri)

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useFindAndModify: false
 })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 1,
    required: true
  },
  date: { 
    type: Date,
    required: true
  },
  flagged: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)