const express = require('express')
const mongoose = require('mongoose')
const app = express()

const url =
  'mongodb+srv://exampleuser:examplepassword@cluster0-nfeqs.mongodb.net/note-app?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    flagged: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const firstTestNote = new Note({
    content: 'This is our first note in our database!',
    date: new Date(),
    flagged: false
})

firstTestNote.save().then(result => {
    console.log('Successfully saved!')
    mongoose.connection.close()
})

const secondTestNote = new Note({
    content: 'This is our second note in our database!',
    date: new Date(),
    flagged: true
})

secondTestNote.save().then(result => {
    console.log('Successfully saved!')
    mongoose.connection.close()
})

const thirdTestNote = new Note({
    content: 'This is our third note in our database!',
    date: new Date(),
    flagged: true
})

thirdTestNote.save().then(result => {
    console.log('Successfully saved!')
    mongoose.connection.close()
})