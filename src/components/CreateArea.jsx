import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {

  const [inputZoom, setInputZoom] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function handleInputClick(){
    setInputZoom(true);
  }

  return (
    <div>
      <form className="create-note">

      {inputZoom ? (<input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title" />) : null}

        {/* <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        /> */}
        <textarea
          name="content"
          onChange={handleChange}
          onClick={handleInputClick}
          value={note.content}
          placeholder="Take a note..."
          rows= {inputZoom ? "3" : "1"}
        />
        {/* material-ui */}
        <Zoom in = {inputZoom}>
        <Fab onClick={submitNote}>
          <AddIcon />   
        </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
