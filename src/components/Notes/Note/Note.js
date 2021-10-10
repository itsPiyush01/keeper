import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import dateFormatter from "../../../../utility/dateFormatter";
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
      <h6 className="note__date">
        Edited: {dateFormatter(props.date_of_creation)}
      </h6>
    </div>
  );
}

export default Note;
