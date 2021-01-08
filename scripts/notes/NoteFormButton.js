/*
 *   NoteFormButton renders a button labeled, Toggle Note Form, that toggles
 *   a form for entering and editing notes to be saved to the notes.json file.
 */

const eventHub = document.querySelector("#container");
const targetContentContainer = document.querySelector("#buttonContainer__noteForm");

export const NoteFormButton = () => {
    targetContentContainer.innerHTML += "<button id='button--toggleNoteForm'>Toggle Note Form</button>"
};

targetContentContainer.addEventListener("click", e => {
    if (e.target.id === "button--toggleNoteForm") {
        const customEvent = new CustomEvent("toggleNoteFormButtonClicked")
        eventHub.dispatchEvent(customEvent)
    };
});