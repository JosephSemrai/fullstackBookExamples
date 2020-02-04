const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
  providerId: String
})

userSchema.plugin(uniqueValidator)
userSchema.plugin(findOrCreate)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // For security purposes, the passwordHash of the user should not be sent with the user object (even though it is not the plaintext password, it can still be decrypted)
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User