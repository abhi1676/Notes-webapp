import noteStore from "../stores/noteStore";

export default function Notes() {
    const store = noteStore();

    return (
        <div>
            <h2>Notes :</h2>
            {store.notes &&
                store.notes.map((note) => {
                    return (
                        <div key={note._id}>
                            <h3>{note.title}</h3>
                            {/* Button to toggle show/hide body */}
                            <button onClick={() => store.toggleBody(note._id)}>
                                {store.showBodyId === note._id ? "Hide Body" : "Show Body"}
                            </button>
                            <button onClick={() => store.deleteNote(note._id)}>Delete Note</button>
                            <button onClick={() => store.toggleUpdate(note)}>Update note</button>
                            {/* Display body if showBodyId matches the note id */}
                            {store.showBodyId === note._id && <p>{note.body}</p>}
                        </div>
                    );
                })}
        </div>
    );
}
