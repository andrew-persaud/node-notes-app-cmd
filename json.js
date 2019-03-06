const fs = require('fs');

const saveNotes = function (notes) {
    const json = JSON.stringify(notes);
    fs.writeFileSync('notes.json', json);
}

const loadNotes = function() {
    try {
        const buffer = fs.readFileSync('notes.json');
        const jsonData = buffer.toString();
        return JSON.parse(jsonData);
    } catch (e) {
        return [];
    }    
}


module.exports = {
    saveNotes,
    loadNotes
}