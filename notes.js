const json = require('./json.js');
const chalk = require('chalk');

const resolved = chalk.blue.inverse;
const error = chalk.red.inverse;

const addNote = (title, body) => {
    //Load
    const notes = json.loadNotes();
    
    //Modify
    const filteredNote = findNote(title);


    if (!filteredNote) {
        const newNote = {
            title,
            body
        }
        notes.push(newNote)
        console.log(resolved("New note added."));

        //Store
        json.saveNotes(notes);
    } else {
        console.log(error('Note already exists: ' + title));
    } 
}


const removeNote = (title) => {
    const notes = json.loadNotes();
    const filteredNotes = notes.filter((note) => note.title.toLowerCase() !== title.toLowerCase());
    
    if (filteredNotes.length < notes.length) {
        console.log(chalk.blue.inverse('Note removed: ' + title))
        json.saveNotes(filteredNotes);
    } else {
        console.log(chalk.red.inverse('Note not found: ' + title))
    }
    
}

const listNotes = () => {
    const notes = json.loadNotes();
    console.log(resolved('Your Notes: '));
    notes.forEach((note) => console.log(`Note title: ${note.title},  Body: ${note.body}`));
}

const readNote = (title) => {
    const notes = json.loadNotes();
    const verifyNoteExists = findNote(title)

    if (verifyNoteExists) {
        console.log(resolved(verifyNoteExists.body))
    } else {
        console.log(error('Note does not exist: ' + title))
    }
}

const findNote = (title) => {
    const notes = json.loadNotes();
    const filteredNote = notes.find((note) => note.title.toLowerCase() === title.toLowerCase());
    return filteredNote;
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}
