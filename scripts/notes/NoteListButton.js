/*
 *   NoteListButton renders a button labeled, Toggle Notes, that lists
 *   all notes in notes.json via the "notesListToggle" custom event.
 */

const eventHub = document.querySelector("#container");
const targetContentContainer = document.querySelector("#buttonContainer");

// Inserts a button, Toggle Notes, onto the DOM in the header (#headerContainer).
export const NotesListButton = () => {
    targetContentContainer.innerHTML += `
    <button id="button--toggleNotesList">Toggle Notes</button>
    `
};

/*
*   Listens for a "click" event and dispatches the custom event, notesListToggle, to the eventHub
*   to set the container (#notesListContainer) to empty or to render a list of notes to the DOM.
*/
targetContentContainer.addEventListener(
    "click",
    e => {
        if (e.target.id === ("button--toggleNotesList")) {
            const noteListToggleEvent = new CustomEvent("notesListToggle");
            eventHub.dispatchEvent(noteListToggleEvent);
        }
    });