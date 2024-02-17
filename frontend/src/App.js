import { useState,useEffect } from "react";
import axios from "axios";

function App() {

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
    fetchNotes();
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
  return (
    <div className="App">
      <div>
     <h2> Notes :</h2>
     {notes && 
     notes.map(note => {
      return(
        <div key={note._id}>
          <h3>{note.title}</h3>
          <button onClick={() => deleteNote(note._id)}>Delete Note</button>
          </div>
      );
     })}
     </div>

     <div>
      <h2>Update note</h2>
      <form action="">
        <input onChange ={handleupdateFieldchange} value={updateForm.title} name="title" />
        <textarea onChange ={handleupdateFieldchange} value={updateForm.body} name="body" />
        <button type ="submit">Update note</button>
      </form>
     </div>
    <div>
      <h2>Create Note</h2>
      <form onSubmit={createNote}>
        <input onChange={updateCreateFormfield} value ={createForm.title} name="title"/>
        <textarea onChange={updateCreateFormfield} value= {createForm.body} name="body" />
        <button type="submit">Create note</button>
      </form>
    </div>
    </div>
  );
}

export default App;
