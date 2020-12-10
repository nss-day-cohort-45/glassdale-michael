/*
*   Note module which exports the function, Note, that renders HTML elements giving
*   structure to note objects when looped through an array provided by useNotes.
*/

const eventHub = document.querySelector("#container");
const contentTargetContainer = document.querySelector("#notesListContainer");
/*
*   Exports the function, Note, that accepts two parameters, 
*   a note object and a criminal object, and returns a string of HTML.
*/

export const Note = (noteObject, criminalObject) => {
    const [firstName, lastName] = criminalObject.name.split(" ");
    return `
    <section class="note" id="note--${noteObject.id}">
        <h4 class="note__suspect"><span class="bold">Suspect</span>: ${lastName}, ${firstName}</h4>
        <p class="note__timestamp"><span class="bold">Note Entry Date</span>: ${noteObject.date}</p>
        <p class="note__text">${noteObject.noteText}</p>

        <button id="toggleNote--${noteObject.id}" class="toggleNoteButton">Hide Note</button>
        
        <button id="deleteNote--${noteObject.id}" class="deleteNoteButton">Delete Note</button>

        <button id="editNote--${noteObject.id}" class="editNoteButton">Edit Note</button>
    </section>
    `;
};

// Listens for a "click" event and hides a corresponding note.
contentTargetContainer.addEventListener('click', e => {
    if (e.target.id.startsWith('toggleNote--')) {
        e.target.parentElement.classList.add("hidden");
    };
});

/*
 *  Listens for a "click" event and creates a custom event "deleteNoteEvent",
 *  which sends the note.id as the detail for the event.
*/
contentTargetContainer.addEventListener("click", e => {
    if (e.target.id.startsWith("deleteNote--")) {
        const [prefix, chosenNoteId] = e.target.id.split("--");
        const deleteNote = new CustomEvent("deleteNoteEvent", {
            detail: {
                note: chosenNoteId,
            }
        })
        eventHub.dispatchEvent(deleteNote);
    };
});

/*
 *  Listens for a "click" event and dispatches the custom event, editNoteEvent,
 *  to the eventHub to fill the note form with the corresponding note's data.
*/
contentTargetContainer.addEventListener(
    "click",
    e => {
        if (e.target.id.startsWith("editNote--")) {
            const [prefix, noteId] = e.target.id.split("--");
            const editNote = new CustomEvent("editNoteButtonClicked", {
                detail: {
                    key: noteId
                }
            })
            eventHub.dispatchEvent(editNote);
        };
    });