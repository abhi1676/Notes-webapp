import noteStore from "../stores/noteStore"

export default function UpdateForm() {

    const store = noteStore();

    if (!store.updateForm._id) return <> </>;

    return (



        <div>
            <h2>Update note</h2>
            <form onSubmit={store.updateNote}>
                <input onChange={store.handleupdateFieldchange} value={store.updateForm.title} name="title" />
                <textarea onChange={store.handleupdateFieldchange} value={store.updateForm.body} name="body" />
                <button type="submit">Update note</button>
            </form>
        </div>




    )
}
