import { useState,useEffect } from "react";
import axios from "axios";
import noteStore from "../stores/noteStore";
import Notes from "../components/Notes.js";
function App() {

  const store = noteStore();

  //state
  const [notes,setNotes] = useState(null);
const [createForm,setcreateForm] = useState({
  title : "",
  body : "",
});

const [updateForm, setupdateForm] = useState({
  _id :null,
  title : "",
  body: "",
});

//useeffect
  useEffect(() => {
    store.fetchNotes();
  },[]);


  //functions
  const fetchNotes = async () => {
    try {
      // Fetch notes 
      const res = await axios.get("http://localhost:3001/notes");
      // Set notes to state
     setNotes(res.data.notes)
     
    } catch (error) {
      // Handle error
      console.error("Error fetching notes:", error);
    }
  };


  const updateCreateFormfield = (e) =>{
    const {name ,value} = e.target;

    setcreateForm({
      ...createForm,
      [name]: value,

      
    });
  
  };
  
  const createNote = async (e) => {
    e.preventDefault();

    //create note
    const res = await axios.post("http://localhost:3001/notes",createForm)
    

    //update state

    if (notes === null) {
      setNotes([res.data.note]);
    } else {
      setNotes([...notes, res.data.note]);
    }


    //clear from state
    setcreateForm({title : "" , body :""})
  };


  const deleteNote = async (_id) => {
   const res = await axios.delete(`http://localhost:3001/notes/${_id}`);
  
   //update state
    const newNotes = [...notes.filter(notes =>{
      return notes._id !== _id;
    })]
    setNotes(newNotes);
  };


  const handleupdateFieldchange =(e) =>{
    const {value,name} = e.target

    setupdateForm({
      ...updateForm,
      [name] : value,
    });
  };


const toggleUpdate = (note) =>
{
  //get current note value 
  

  //set state on update form
  setupdateForm({title : note.title , body: note.body, _id: note._id});
}

const updateNote = async(e) =>
{ 
  e.preventDefault();
  const {title , body } = updateForm;

  //Send the update request
  const res = await axios.put(`http://localhost:3001/notes/${updateForm._id}`,{title, body });
  //Update state
  const newNotes = [...notes];
  const noteIndex = notes.findIndex((note) => {
    return note._id === updateForm._id;
  });
    

  newNotes[noteIndex] = res.data.note;
  setNotes(newNotes);


  //clear update form state

  setupdateForm({
    _id: null,
    title: "",
    body: "",
  });

  
  };



  return (
    <div className="App">
     <Notes />

     {store.updateForm._id &&(

      <div>
      <h2>Update note</h2>
      <form onSubmit={store.updateNote}>
        <input onChange ={store.handleupdateFieldchange} value={store.updateForm.title} name="title" />
        <textarea onChange ={store.handleupdateFieldchange} value={store.updateForm.body} name="body" />
        <button type ="submit">Update note</button>
      </form>
     </div>
     )}


    {!store.updateForm._id && (<div>
      <h2>Create Note</h2>
      <form onSubmit={store.createNote}>
        <input onChange={store.updateCreateFormfield} value ={store.createForm.title} name="title"/>
        <textarea onChange={store.updateCreateFormfield} value= {store.createForm.body} name="body" />
        <button type="submit">Create note</button>
      </form>
    </div>
    )}
    </div>
  );
}

export default App;
