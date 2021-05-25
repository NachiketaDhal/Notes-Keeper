import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function Note(props) {
  const { noteItem, onEditIconClick } = props;

  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{noteItem.title}</h1>
      <p>{noteItem.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <button onClick={() => onEditIconClick(noteItem)}>
        <EditIcon />
      </button>
    </div>
  );
}

export default Note;
