import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [inputZoom, setInputZoom] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);

  function addNote(newNote) {
    if (note.title && note.content) {
      setNotes((prevNotes) => {
        return [...prevNotes, newNote];
      });
    }
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function onEditIconClick(noteItem) {
    setEdit(true);
    setEditItem(noteItem);
    setNote({ title: noteItem.title, content: noteItem.content });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    if (edit) {
      const newNotes = notes.map((noteItem) => {
        if (noteItem === editItem) {
          noteItem.title = note.title;
          noteItem.content = note.content;
        }
        setEdit(false);
        setNote({
          title: "",
          content: "",
        });
      });
    } else {
      addNote(note);
      setNote({
        title: "",
        content: "",
      });
    }
  }

  function handleInputClick() {
    setInputZoom(true);
  }

  return (
    <div>
      <Header />
      <div>
        <form className="create-note">
          {inputZoom ? (
            <input
              name="title"
              onChange={handleChange}
              value={note.title}
              placeholder="Title"
            />
          ) : null}
          <textarea
            name="content"
            onChange={handleChange}
            onClick={handleInputClick}
            value={note.content}
            placeholder="Take a note..."
            rows={inputZoom ? "3" : "1"}
          />
          {/* material-ui */}
          <Zoom in={inputZoom}>
            <Fab onClick={submitNote}>{edit ? <EditIcon /> : <AddIcon />}</Fab>
          </Zoom>
        </form>
      </div>
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            noteItem={noteItem}
            onDelete={deleteNote}
            onEditIconClick={onEditIconClick}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
