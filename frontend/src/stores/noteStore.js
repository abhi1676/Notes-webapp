import { create } from 'zustand'
import axios from 'axios';
const noteStore = create((set) => ({
 notes:null,

 createForm : {
    title: "",
    body: "",
 },

 updateForm : {
    _id: null,
    title: "",
    body: "",
 },


 fetchNotes: async () => {

    //Fetch the notes 
    const res = await axios.get("http://localhost:3001/notes");

    //set to state 
    set({
        notes: res.data.notes
    });
 },

 updateCreateFormfield : (e) =>{
    const {name ,value} = e.target;

    set((state)=>{
        return{
            createForm: {
                ...state.createForm,
                [name]: value,
            },
        };
    })
   
},


createNote: async (e) => {
    e.preventDefault();

    const { createForm , notes } = noteStore.getState();
    const res = await axios.post("http://localhost:3001/notes",createForm)
    set({
       notes: [...notes, res.data.note], 
       createForm: {
        title: "",
        body: "",
       }
    })
},

deleteNote : async (_id) => {
    const res = await axios.delete(`http://localhost:3001/notes/${_id}`);
    
    const  { notes } = noteStore.getState();

    //update state
     const newNotes = notes.filter(notes =>{
       return notes._id !== _id;
     });
     set({notes : newNotes})
     
   },


   handleupdateFieldchange: (e) =>{
    const {value,name} = e.target

    set(state => {
        return{
          updateForm: {
            ...state.updateForm,
            [name]: value,
          },  
        }
    })

   
  },

  toggleUpdate: ({_id, title, body}) =>
{   
    
  //get current note value 
  set({
    updateForm: {
        title  ,
         body,
          _id,
    },
  });
},
 


updateNote: async(e) =>
{ 
  e.preventDefault();


  const updateFormState = noteStore.getState().updateForm;

  if (!updateFormState) {
    console.error("Update form state is undefined");
    return;
  }

  const { title, body, _id } = updateFormState;
  const { notes } = noteStore.getState();
  

  //Send the update request
  const res = await axios.put(`http://localhost:3001/notes/${_id}`,{title, body });
  //Update state
  const newNotes = [...notes];
  const noteIndex = notes.findIndex((note) => {
    return note._id === _id;
  });
    

  newNotes[noteIndex] = res.data.note;
  set({
    notes: newNotes,
    updateForm: {
     _id: null,
    title: "",
    body: "",
    },
  });


  //clear update form state

},

  
  

  
}));



export default noteStore;