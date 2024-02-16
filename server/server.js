//load env variables
if(process.env.NODE_ENV != "production")
{
    require("dotenv").config();
}


//import dependencies
const express = require('express')
const connectToDb = require("./config/connectToDb");
const Note = require("./models/note")
const noteController = require("./controllers/noteController")

//creating expree app

const app = express()
//configure express app  to use json
app.use(express.json());
//coect to database

connectToDb();


//routing
app.get('/',(req,res) => {
    res.json({ hello : "world"});
});


app.post("/notes", noteController.createNote );


app.get("/notes", noteController.fetchNotes);

app.get("/notes/:id", noteController.fetchNote );


app.put("/notes/:id" , noteController.updateNote );

app.delete("/notes/:id", async (req , res) => {
    //get note from id
    const noteid = req.params.id;

    //delete note 
    await Note.deleteOne({ _id: noteid });

    //respond

    res.json({ success: "Note Deleted SucessFully"});

});
//start our server

app.listen(process.env.PORT);