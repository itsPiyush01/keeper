import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import "./CreateArea.css";

function CreateArea(props) {
	const [isExpanded, setExpanded] = useState(false);
	const [note, setNote] = useState({
		title: "",
		content: "",
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setNote((prevNote) => {
			return {
				...prevNote,
				[name]: value,
			};
		});
	};

	const submitNote = (event) => {
		event.preventDefault();
		props.onAdd(note);
		setNote({
			title: "",
			content: "",
			date: "",
		});
	};

	const expand = () => {
		setExpanded(true);
	};

	return (
		<div>
			<form className="create-note" onSubmit={submitNote}>
				{isExpanded && (
					<input
						name="title"
						onChange={handleChange}
						value={note.title}
						placeholder="Title"
					/>
				)}

				<textarea
					name="content"
					onClick={expand}
					onChange={handleChange}
					value={note.content}
					placeholder="Take a note..."
					rows={isExpanded ? 3 : 1}
				/>
				<Zoom in={isExpanded}>
					<Fab
						onClick={submitNote}
						disabled={note.content === "" && note.title === "" ? true : false}
					>
						<AddIcon />
					</Fab>
				</Zoom>
			</form>
		</div>
	);
}

export default CreateArea;
