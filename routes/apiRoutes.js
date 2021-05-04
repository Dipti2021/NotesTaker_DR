// LOAD DATA

const fs = require("fs");

//Routing: 
module.exports = (app) => {
    // It reads the `db.json` file and returns all saved notes as JSON.
    let your_notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    app.get("/api/notes", (req, res) => res.json(your_notes));
   

    // Receives a new note to save on the request body, add it to the `db.json` file, and then returns the new note to the client.
    app.post('/api/notes', (req, res) => {
        // get Id of last note if it exists else set it to 0
        let last_id;
        if (your_notes.length) {
            last_id = Math.max(...(your_notes.map(note => note.id)));

        } else {
            last_id = 0;
        }
       
        const id = last_id ++;

        // the id of the note  will be pushed with the rest of the text in the request.body
        your_notes.push({ id, ...req.body }); res.json(your_notes.slice(-1));
    });

    // Deleting the notes
    app.delete('/api/notes/:id', (req, res) => {
        //finds note by id and converts the string into a JSON object 
        let id_notes = your_notes.find(({ id }) => id === JSON.parse(req.params.id));

        //Delete object matching the index of the note ID
        your_notes.splice(your_notes.indexOf(id_notes), 1);
        res.end("Your note has been deleted!");
    });
};