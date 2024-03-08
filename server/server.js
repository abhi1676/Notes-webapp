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
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController')
const requireAuth = require("./middleware/requireAuth");

//creating expree app

const app = express()
const cors = require('cors');
//configure express app  to use json
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(cookieParser());
//connect to database

connectToDb();




app.post('/signup',userController.signup);
app.post('/login',userController.login);
app.get('/logout',userController.logout);
app.get('/check-auth', requireAuth, userController.checkAuth);



app.post("/notes",requireAuth, noteController.createNote );


app.get("/notes",requireAuth, noteController.fetchNotes);

app.get("/notes/:id",requireAuth, noteController.fetchNote );


app.put("/notes/:id" ,requireAuth, noteController.updateNote );

app.delete("/notes/:id",requireAuth,noteController.deleteNote);
//start our server

app.listen(process.env.PORT);