const fs = require('fs')
const chalk = require('chalk')

const listNotes = () => {
    const notes = loadNotes()

    debugger

    console.log(chalk.white.inverse.underline.bold("List of Notes:"))
    notes.forEach(note => {
        console.log('\u2022 ' + note.title)
    });
    console.log('')
}

const readNote = (title) => {
    const notes = loadNotes()
    const selectedNote = notes.find((note) => note.title === title)
    if (selectedNote) {
        console.log(
            '\n' +
            chalk.white.inverse.underline.bold(selectedNote.title)
            + '\n' + selectedNote.body)
    } else {
        console.log(chalk.red.inverse('Could not find a note with that title!'))
    }
    console.log('')
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
    console.log('')
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
    console.log('')
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    listNotes: listNotes,
    readNote: readNote,
    addNote: addNote,
    removeNote: removeNote
}