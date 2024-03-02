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
const cors = require('cors');
//configure express app  to use json
app.use(express.json());
app.use(cors());
//connect to database

connectToDb();


//routing
app.get('/',(req,res) => {
    res.json({ hello : "world"});
});


app.post("/notes", noteController.createNote );


app.get("/notes", noteController.fetchNotes);

app.get("/notes/:id", noteController.fetchNote );


app.put("/notes/:id" , noteController.updateNote );

app.delete("/notes/:id",noteController.deleteNote);
//start our server

app.listen(process.env.PORT);