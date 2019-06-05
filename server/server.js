let express = require("express");
let db = require("diskdb");
let bodyParser = require("body-parser");

db = db.connect("./database", ['notes']);

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/note/:id", function(req, res) {
    let note = db.notes.find({_id: req.params.id});
    res.send(note);
});

app.get("/notes", function(req, res) {
    let notes = db.notes.find();
    res.send(notes);
});

app.post("/", function(req, res) {
    let note = {
        "due":req.body.due,
        "title":req.body.title,
        "content":req.body.content,
        "priority":req.body.priority,
        "checked":req.body.checked
    };
    let newNote = db.notes.save(note);
    res.send(newNote);
});

app.delete("/note/:id", function(req, res) {
    let removedNote = db.notes.remove({_id : req.params.id}, false);
    res.send(removedNote);
});

var server = app.listen(3000, function() {
    console.log("Listening on port %s...", server.address().port);
});