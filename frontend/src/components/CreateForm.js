import noteStore from "../stores/noteStore";

export default function CreateForm() {

    const store = noteStore();

    if(!store.updateForm._id) return <></>;
  return (
    <div>
       
    <h2>Create Note</h2>
    <form onSubmit={store.createNote}>
      <input onChange={store.updateCreateFormfield} value ={store.createForm.title} name="title"/>
      <textarea onChange={store.updateCreateFormfield} value= {store.createForm.body} name="body" />
      <button type="submit">Create note</button>
    </form>
  </div>
 
  )
}
