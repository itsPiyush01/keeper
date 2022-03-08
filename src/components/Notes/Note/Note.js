import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import dateFormatter from "../../../utility/dateFormatter";
import "./Note.css";
import { StyledNote } from "./Note.Style";
import NotePopup from "../NotePopup/NotePopup";

function Note(props) {
	let content = props.content;
	if (content.length > 200) {
		content = content.substr(0, 100) + " ...";
	}

	function handleDelete(e) {
		props.onDelete(props.id);
		alert("Are you sure ");
		e.stopPropagation();
	}

	const NoteRef = React.useRef(null);
	const { index, active, handleClick } = props;
	const handleNoteClick = () => {
		handleClick(index);
	};

	// handleClick(17);
	React.useEffect(() => {
		const b = NoteRef.current;
		const a = b.querySelector(".active-class");
		a.style.left = b.offsetLeft + "px";
		// a.style.top = b.clientTop + "px";
		a.style.top = b.offsetTop + "px";
		a.style.width = b.offsetWidth + "px";
		a.style.height = b.clientHeight + "px";
	}, []);
	// TODO: FIX Popup effect
	// const [scrollTop, setScrollTop] = useState(0);
	// useEffect(() => {
	// 	console.log("Hello");
	// 	const onScroll = (e) => {
	// 		setScrollTop(e.target.documentElement.scrollTop);
	// 		// setScrolling(e.target.documentElement.scrollTop > scrollTop);
	// 	};

	// 	window.addEventListener("scroll", onScroll);
	// 	if (props.index === 0) {
	// 		console.info(b.offsetTop);
	// 		console.info(event.clientY);
	// 	}

	// 	return () => window.removeEventListener("scroll", onScroll);
	// }, [scrollTop]);

	return (
		<React.Fragment>
			<StyledNote active={active} onClick={handleNoteClick} ref={NoteRef}>
				<div className="note">
					<h1>{props.title}</h1>
					<p>{content}</p>
					{/* <button onClick={handleDelete} className="delete__button">
						<DeleteIcon />
					</button> */}
					<h6 className="note__date">
						Edited: {dateFormatter(props.date_of_creation)}
					</h6>
				</div>

				<NotePopup
					title={props.title}
					content={props.content}
					date_of_creation={props.date_of_creation}
					id={props.id}
					close={() => {
						props.handleClick(undefined);
					}}
				/>
			</StyledNote>
		</React.Fragment>
	);
}

export default Note;
