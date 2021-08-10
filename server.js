// require in express
const { response } = require('express')
const express = require('express')
// create path and lisenting port
const path = require('path')
// api database
const data = require('./lib/Data')
const PORT = process.env.PORT || 3000
// app uses express
const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
// routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
// routes to notes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));
// calls stored and saved data and delte data handlers
app.get('/api/notes', (req, res) => res.json(data.callAPI()));
app.post('/api/notes', (req, res) => {
    const note = req.body
    data.storeNote(note)
        res.send();
      })
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    data.deleteNote(id)
        res.send();
      })
// check if listening on port
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
