const Note = require("../models/note");

const fetchNotes = async (req , res) => {
    //find notes
    const notes = await Note.find({user: req.user._id});
    //respond
    res.json({ notes : notes })
}

const fetchNote = async (req , res) => {
    //get id from url
    const Noteid = req.params.id;
    //find note 
    const note = await Note.findOne({_id: Noteid, user: req.user._id});

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
        user: req.user._id,
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
     await Note.findOneAndUpdate({_id: noteid, user: req.user._id} ,{
        title : title ,
        body : body
    });
    //respond with it
    const note = await Note.findById(noteid)
    res.json({note : note});
}

const deleteNote = async (req , res) => {
    //get note from id
    const noteid = req.params.id;

    //delete note 
    await Note.deleteOne({ _id: noteid, user: req.user._id });

    //respond

    res.json({ success: "Note Deleted SucessFully"});

}

module.exports = {
    fetchNote : fetchNote,
    fetchNotes : fetchNotes,
    createNote : createNote,
    updateNote : updateNote,
    deleteNote : deleteNote,
}