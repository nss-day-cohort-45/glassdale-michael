/*
*   NoteForm module renders a form to enter and edit notes.
*/

import { saveNote, editNote, useNotes } from "./notesDataProvider.js";
import { useCriminals } from "../criminals/criminalsDataProvider.js";

const eventHub = document.querySelector("#container");
const targetContentContainer = document.querySelector("#noteFormContainer");

let visibility = false;
let editState = false;
let editStateId = null;

/*
 *  NoteForm renders a form to the DOM at (#noteFormContainer), if either
 *  visibility is set to true or an edit note button has been clicked.
 */
const NoteForm = () => {
    const appStateCriminals = useCriminals();

    targetContentContainer.innerHTML = `
    <section id="noteFormContainer">
    <form id="noteForm">
        <label for="note--date">Date:</label>
        <input type="date" id="note--date" name="note--date"></br>
        <label for="note--suspect">Suspect:</label>
        <select id="note--suspect">
            <option value="0">Please Choose a Criminal...</option>
        ${appStateCriminals.map(c => {
        const [firstName, lastName] = c.name.split(" ");
        return `<option value="${c.id}">${lastName}, ${firstName}</option>`
    }).join("")
        }
        </select></br>
        <label for="note--text">Note:</label></br>
        <textarea id="note--text"></textarea></br>

    </form>
        <button id="saveNote">Save Note</button>
    </section>
    `
}

// Function that resets the form, #noteForm, when invoked.
export const resetNoteForm = () => {
    const noteFormTarget = document.getElementById("noteForm");
    noteFormTarget.reset();
};

/*
 *  Adds a "click" event listener to the button element (#saveNote) that collects the user entered data 
 *  of the form element (#noteForm) and runs the function saveNote to submit the data. 
*/
targetContentContainer.addEventListener("click", e => {
    if (e.target.id === "saveNote") {
        e.preventDefault();
        const date = document.getElementById("note--date").value;
        const criminalId = parseInt(document.getElementById("note--suspect").value);
        const noteText = document.getElementById("note--text").value;

        if (editState) {
            const note = {
                "date": date,
                "noteText": noteText,
                "criminalId": criminalId,
                "id": editStateId
            }
            editNote(note).then(() => {
                visibility = !visibility;
                editState = !editState;
                targetContentContainer.innerHTML = "";
            });

        } else {
            if (date === "" || criminalId === "" || noteText === "") {
                alert("Please fully fill out the form before submitting a note. Thank you.");
            } else {
                const newNote = {
                    "date": date,
                    "noteText": noteText,
                    "criminalId": criminalId
                }
                saveNote(newNote).then(() => {
                    visibility = !visibility;
                    targetContentContainer.innerHTML = "";
                });
            }
        };
    };
});

// Listens for a "click" event listener on the button element (#showNoteForm) which toggles the NoteForm visibility.
eventHub.addEventListener("toggleNoteFormButtonClicked", e => {
    visibility = !visibility

    if (visibility) {
        NoteForm();
    }
    else {
        targetContentContainer.innerHTML = "";
        editState = false;
    };
});

// Listens for a "click" event listener on the button element (#showNoteForm) which toggles the NoteForm visibility.
eventHub.addEventListener("editNoteButtonClicked", e => {
    visibility = true;
    editState = true;

    const noteId = parseInt(e.detail.key);
    const appStateNotes = useNotes();
    const note = appStateNotes.find(n => n.id === noteId);

    NoteForm();

    editStateId = noteId;
    document.getElementById("note--date").value = note.date;
    document.getElementById("note--suspect").value = note.criminalId;
    document.getElementById("note--text").value = note.noteText;
});