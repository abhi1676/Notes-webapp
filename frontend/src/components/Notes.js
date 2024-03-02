import noteStore from "../stores/noteStore";

export default function Notes(){
    const store = noteStore();
 return(
    <div>
    <h2> Notes :</h2>
    {store.notes && 
   store.notes.map(note => {
     return(
       <div key={note._id}>
         <h3>{note.title}</h3>
         <button onClick={() => store.deleteNote(note._id)}>Delete Note</button>
         <button onClick={() => store.toggleUpdate(note)}>Update note</button>
         </div>
     );
    })}
    </div>
 )
}