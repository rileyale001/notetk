const fs = require('fs')
class Data {
    constructor() {
        this.path = './lib/db.json'
        this.notes = JSON.parse(fs.readFileSync(this.path))
    }
    store = function() {
        fs.writeFileSync(this.path, JSON.stringify(this.notes))
    }
    genID = function() {
        const ids = this.notes.map(note => note.id)
        let id
        do id = Math.floor(Math.random() * 36**9).toString(36).toUpperCase().padStart(9, '0')
        while (ids.includes(id))
        return id
    }

    callAPI() {
        return [...this.notes]
    }
    storeNote(note) {
        note.id = this.genID()
        this.notes.push(note)
        this.store
        return note
    }
    deleteNote(id) {
        const list = []
        let remove = null
        for (const note of this.notes) {
            if (note.id != id) {
                list.push(note)
            } else {
                remove = note
            }
        }
        this.notes = list
        this.store()
        return remove
    }
}
module.exports = new Data()
