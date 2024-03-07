import CreateForm from "../components/CreateForm";
import Notes from "../components/Notes";
import UpdateForm from "../components/UpdateForm";
import noteStore from "../stores/noteStore";
import { useEffect } from "react";
export default function NotesPage() {

    const store = noteStore();


    //useeffect
  useEffect(() => {
    store.fetchNotes();
  },[]);

  return (
     <div >
    <Notes />
   
    <UpdateForm />

   <CreateForm />

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
  )
}
