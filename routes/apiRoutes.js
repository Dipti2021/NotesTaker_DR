// LOAD DATA
const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

//Routing: 
module.exports = function(app) {
    // Implementing the GET function
    app.get("/api/notes", function(req, res) {
       
        res.json(data);

    });

    app.get("/api/notes/:id", function(req, res) {// prefixed the parameter id for the routes

        res.json(data[Number(req.params.id)]);// Used a number constructor used to create a number object. used for the id property

    });

    // POST func :posts a new note to save on the request body, add it to the `db.json` file, and then returns the new note to the client.
    app.post("/api/notes", function(req, res) {

        let next_note = req.body;  // to access data in the JSON object from the client side.
        let uniqueId = (data.length).toString();
        console.log(uniqueId);
        next_note.id = uniqueId;
        // the id of the note will be pushed with the rest of the text in the request.body
        data.push(next_note);
        
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);        
        }); 

        res.json(data);    

    });

    // Deleting the notes
    app.delete("/api/notes/:id", function(req, res) {
       //finds note by id and converts the string into a JSON object 
        let noteId = req.params.id;
        let next_Id = 0;
        console.log(`Your request to delete the note with id ${noteId} has been granted`);
        data = data.filter(currentNote => {
           return currentNote.id != noteId;
        });
        for (currentNote of data) {
            currentNote.id = next_Id.toString();
            next_Id++;
        }
        
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    }); 

}