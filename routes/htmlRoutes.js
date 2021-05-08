const path = require('path');

module.exports = (app) => {
    // => HTML GET Requests
    // The user is shown an HTML page of content
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
  
    app.get("/notes", (req, res) => {
      res.sendFile(path.join(__dirname, '../public/notes.html'));
    });
  
    // If no matching route is found default to home
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
};
  
  