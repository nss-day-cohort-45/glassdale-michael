// NoteList module that renders a list of note HTML elements to #notesListContainer.

import { useNotes, getNotes } from './notesDataProvider.js';
import { Note } from './Note.js';
import { useCriminals } from '../criminals/criminalsDataProvider.js';


const eventHub = document.querySelector("#container");
const targetContentContainer = document.querySelector("#notesListContainer");

let visibility = false;

/*
 *  Function that takes an array of note objects and for each note renders a note component, and then
 *  calls EditNoteDialogElement and renders a dialog box component within the note as an edit form.
*/


// Function that invokes noteRender to list all notes to DOM.
const NoteList = () => {
    targetContentContainer.innerHTML = `
        <button id="button--listAllNotes">Show All Notes</button>
    `

    const appStateNotes = useNotes();
    const appStateCriminals = useCriminals();

    targetContentContainer.innerHTML += appStateNotes.map(cno => {
        const criminal = appStateCriminals.find(c => c.id === cno.criminalId);
        return Note(cno, criminal);
    }).join("")
};

/*
 *  Listens for the custom event, toggleAllNotesClicked, to render a list of notes to the DOM
 *  in the section element (.notesContainer) by running the NoteList function.
*/
eventHub.addEventListener("notesListToggle", e => {
    visibility = !visibility

    if (visibility) {
        NoteList();
    } else {
        targetContentContainer.innerHTML = "";
    };
});

/*
*   Listens for the custom event, noteStateChanged, on the eventHub
*   and calls the function noteRender to re-evaluate the notes array.
*/
eventHub.addEventListener("noteStateChanged", e => {
    if (visibility) {
        NoteList();
    };
});

/*
*   Listens for a "click" event on the button (#button--listAllNotes),
*   and calls the function NoteList to re-render the notesList.
*/
targetContentContainer.addEventListener("click", e => {
    if (e.target.id === "button--listAllNotes") {
        NoteList();
    };
});