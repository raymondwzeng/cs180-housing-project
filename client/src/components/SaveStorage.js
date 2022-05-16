import React, {useState, useEffect} from "react";

function SaveStorage() {
    const [notes, setNotes] = useState([]);
    const [noteEditing, setNoteEditing] = useState("");
    const addNote = (e) => {
        e.preventDefault();
        const newNote = {
          id: Math.random().toString(36).substr(2, 9),
          text: e.target.note.value,
        };
        setNotes([...notes, newNote]);
        e.target.note.value = "";
      };
    return(
        <div className="App">
            <form onSubmit={addNote}>
                
                <input type="text" name="note" />
                <input type="Submit" name="Save"/>
                
            </form>
        </div>
    );
}

export default SaveStorage;