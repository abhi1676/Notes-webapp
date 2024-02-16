const Note = require("../models/note");

const fetchNotes = async (req , res) => {
    //find notes
    const notes = await Note.find();
    //respond
    res.json({ notes : notes })
}

const fetchNote = async (req , res) => {
    //get id from url
    const Noteid = req.params.id;
    //find note 
    const note = await Note.findById(Noteid);

    //respond with note
    res.json({ note : note})
}

const createNote = async (req , res) => {

    // Get the sent in data off req body

   const title = req.body.title
   const body = req.body.body
    // create a note 

   const note =  await Note.create({
        title : title,
        body : body,
    });

    // respond with new note 

    res.json({ note : note})
}

const updateNote = async (req , res) => {
    //get id 
    const noteid = req.params.id;
    const title = req.body.title;
    const body = req.body.body;
    //findnote with id
     await  Note.findByIdAndUpdate(noteid ,{
        title : title ,
        body : body
    });
    //respond with it
    const note = await Note.findById(noteid)
    res.json({note : note});
}

module.exports = {
    fetchNote : fetchNote,
    fetchNotes : fetchNotes,
    createNote : createNote,
    updateNote : updateNote,
}