import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Note.css";
function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <i className="note__date">Date: {props.date_of_creation}</i>
    </div>
  );
}

export default Note;
