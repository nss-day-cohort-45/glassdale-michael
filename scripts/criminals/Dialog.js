/*
 *   Dialog renders a dialog element in the dialogContainer
 *   with an unordered list of known associate(s) & alibi(s).
 */

import { useCriminals } from "./criminalsDataProvider.js";

const eventHub = document.querySelector("#container");
const targetTargetContainer = document.querySelector("#dialogContainer");

// Dialog renders the dialog element to the DOM for the specific criminal when invoked.
const Dialog = (criminalObject) => {
    const [firstName, lastName] = criminalObject.name.split(" ");
    targetTargetContainer.innerHTML = `
        <dialog id="dialog">
            <h4><span class="bold">Name</span>: ${lastName}, ${firstName}</h4>
            <ul>
            ${criminalObject.known_associates.map(c => {
        return `<li>Associate: ${c.name} | Alibi: ${c.alibi}</li>`
    }).join("")
        }
            </ul>
            <button class="button--close" id="dialog--close">Close</button>
        </dialog>
        `
}

// Listens for the custom event, assiciatesButtonClicked, to render and open the dialog box.
eventHub.addEventListener("assiciatesButtonClicked", e => {
    const criminalsArray = useCriminals();
    const criminalId = parseInt(e.detail.criminal);
    const foundCriminal = criminalsArray.find(c => c.id === criminalId)
    Dialog(foundCriminal);
    const theDialog = document.querySelector("#dialog");
    theDialog.showModal();
});

// Listens for a "click" event on the "Close" button and closes the dialog box.
targetTargetContainer.addEventListener(
    "click",
    e => {
        if (e.target.id === "dialog--close") {
            const theDialog = document.querySelector("#dialog");
            theDialog.close();
        }
    }
)