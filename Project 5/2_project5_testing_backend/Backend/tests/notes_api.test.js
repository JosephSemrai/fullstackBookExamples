const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')

const initializationNotes = [
    {
        content: 'This is the first note!',
        date: new Date(),
        flagged: true,
    },
    {
        content: 'This is a note that happens to be the second note.',
        date: new Date(),
        flagged: false,
    },
    {
        content: 'This is the third note.',
        date: new Date(),
        flagged: true,
    }
]

beforeEach(async () => {
    await Note.deleteMany({})

    let noteObject = new Note(initializationNotes[0])
    await noteObject.save()

    noteObject = new Note(initializationNotes[1])
    await noteObject.save()

    noteObject = new Note(initializationNotes[2])
    await noteObject.save()
})

test('notes returned as json', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are three notes', async () => {
    const response = await api.get('/api/notes')

    expect(response.body.length).toBe(initializationNotes.length)
})

test('the first note is about it being the first note', async () => {
    const response = await api.get('/api/notes')

    const allContents = response.body.map(n => n.content)

    expect(allContents).toContain('This is the first note!')
})

afterAll(() => {
    mongoose.connection.close()
})