/*
*   NoteForm module renders a form to enter and edit notes.
*/

import { saveNote, editNote, useNotes } from "./notesDataProvider.js";
import { getCriminals, useCriminals } from "../criminals/criminalsDataProvider.js";

const eventHub = document.querySelector("#container");
const targetContentContainer = document.querySelector("#noteFormContainer");
let appStateCriminals = [];
let appStateNotes = [];
let visibility = false;
let editState = false;
let editStateId = null;

/*
 *  Renders a form to the DOM at (#noteFormContainer), if either
 *  visibility is set to true or an edit note button has been clicked.
 */
const render = () => {
    targetContentContainer.innerHTML = `
    <section id="noteFormContainer">
    <form id="noteForm">
        <label for="note--date">Date:</label>
        <input type="date" id="note--date" name="note--date"></br>
        <label for="note--suspect">Suspect:</label>
        <select id="note--suspect">
            <option value="">Please Choose a Criminal...</option>
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

// Accesses an array of criminal objects by invoking useCriinals, fills the appStateCriminals array, and invokes render.
const NoteForm = () => {
    getCriminals()
        .then(() => {
            appStateCriminals = useCriminals();
            appStateNotes = useNotes();

            render();

            if (editStateId !== null) {
                const note = appStateNotes.find(n => n.id === editStateId);

                document.querySelector("#note--date").value = note.date;
                document.querySelector("#note--suspect").value = note.criminalId;
                document.querySelector("#note--text").value = note.noteText;
            }
        });
}

// Function that resets the form, #noteForm, when invoked.
export const resetNoteForm = () => {
    const noteFormTarget = document.querySelector("#noteForm");
    noteFormTarget.reset();
};

/*
 *  Adds a "click" event listener to the button element (#saveNote) that collects the user entered data 
 *  of the form element (#noteForm) and runs the function saveNote to submit the data. 
*/
targetContentContainer.addEventListener("click", e => {
    if (e.target.id === "saveNote") {
        e.preventDefault();
        const date = document.querySelector("#note--date").value;
        const criminalId = parseInt(document.querySelector("#note--suspect").value);
        const noteText = document.querySelector("#note--text").value;

        if (editState) {
            if (date === "" || criminalId === 0 || noteText === "") {
                alert("Please fully fill out the form before submitting a note. Thank you.");
            } else {
                const note = {
                    "date": date,
                    "noteText": noteText,
                    "criminalId": criminalId,
                    "id": editStateId
                }
                editNote(note).then(() => {
                    visibility = !visibility;
                    editState = !editState;
                    editStateId = null;
                    targetContentContainer.innerHTML = "";
                });
            }
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
    editStateId = null;
    editState = false;

    if (visibility) {
        NoteForm();
    }
    else {
        targetContentContainer.innerHTML = "";
    };
});

// Listens for a "click" event listener on the button element (#showNoteForm) which toggles the NoteForm visibility.
eventHub.addEventListener("editNoteButtonClicked", e => {
    visibility = true;
    editState = true;
    editStateId = parseInt(e.detail.chosenNoteId);

    NoteForm();
});