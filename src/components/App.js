import React, { useEffect, useReducer } from "react";
import Header from "../components/UI/Header/Header";
import Note from "../components/UI/Note/Note";
import CreateArea from "../components/UI/CreateArea/CreateArea";
import axios from "../axios-notes";
import createDate from "../utility/createDate";

const noteReducer = (currentNotes, action) => {
  switch (action.type) {
    case "SET":
      return action.notes;
    case "ADD":
      return [...currentNotes, action.note];
    case "DELETE":
      return currentNotes.filter((note) => note.id !== action.id);
    default:
      throw new Error("Should not get there");
  }
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return { ...curHttpState, loading: false };
    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return { ...curHttpState, error: null };
    default:
      throw new Error("Should not be reached!");
  }
};

function App() {
  const [userNotes, dispatch] = useReducer(noteReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  useEffect(() => {
    console.log("RENDERING NOTES", userNotes);
  }, [userNotes]);

  const addNoteHandler = (note) => {
    dispatchHttp({ type: "SEND" });
    const d = createDate();
    console.log("date" + d);

    // d.toISOString()
    let noteObject = {
      ...note,
      date_of_creation: d,
    };

    axios
      .post("/notes.json", noteObject)
      .then((res) => {
        console.log(res);
        dispatchHttp({ type: "RESPONSE" });
        dispatch({
          type: "ADD",
          note: { id: res.data.name, ...noteObject },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatchHttp({ type: "ERROR" });
      });
  };

  const removeNoteHandler = (noteId) => {
    dispatchHttp({ type: "SEND" });
    axios
      .delete(`/notes/${noteId}.json`)
      .then((res) => {
        dispatchHttp({ type: "RESPONSE" });
        dispatch({ type: "DELETE", id: noteId });
        console.log();
      })
      .catch((err) => {
        console.log();
        dispatchHttp({ type: "ERROR" });
      });
  };

  useEffect(() => {
    dispatchHttp({ type: "SEND" });
    axios
      .get("https://keeper-app-bd970-default-rtdb.firebaseio.com/notes.json")
      .then((response) => {
        dispatchHttp({ type: "RESPONSE" });
        const loadedUsers = [];
        for (const key in response.data) {
          loadedUsers.push({
            id: key,
            title: response.data[key].title,
            content: response.data[key].content,
            date_of_creation: response.data[key].date_of_creation,
          });
        }
        dispatch({
          type: "SET",
          notes: loadedUsers,
        });
        console.info(loadedUsers);
        // console.log(response.data);
        // console.info(userNotes);
      })
      .catch((error) => {
        dispatchHttp({ type: "ERROR" });

        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNoteHandler} />

      {userNotes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            date_of_creation={noteItem.date_of_creation}
            onDelete={removeNoteHandler}
          />
        );
      })}
    </div>
  );
}

export default App;
