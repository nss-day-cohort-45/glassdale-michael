/*
 *   CriminalListButton renders a button labeled, Show All Criminals, that lists
 *   all criminals in the Glassdale PD API via the "criminalListGenerate" custom event.
 */

const eventHub = document.querySelector("#container");
const targetContentContainer = document.querySelector("#buttonContainer__criminalList");

// Inserts a button, Show All Criminals, onto the DOM in the header element (#headerContainer).
export const CriminalListButton = () => {
    targetContentContainer.innerHTML += `
    <button id="button--criminalList">Show All Criminals</button>
    `
};

/*
*   Listens for a "click" event and dispatches the custom event, criminalListGenerate, to the eventHub
*   to set the article element (#listContainer) to empty and render a list of criminals to the DOM in (#listContainer).
*/
targetContentContainer.addEventListener("click", e => {
    if (e.target.id === ("button--criminalList")) {
        const criminalListGenerateEvent = new CustomEvent("criminalListGenerate");
        eventHub.dispatchEvent(criminalListGenerateEvent);

        const resetOfficerSelect = new CustomEvent("officerSelectReset")
        eventHub.dispatchEvent(resetOfficerSelect);

        const resetConvictionsSelect = new CustomEvent("convictionsSelectReset")
        eventHub.dispatchEvent(resetConvictionsSelect);

        const resetFilterCheckbox = new CustomEvent("filterCheckboxReset")
        eventHub.dispatchEvent(resetFilterCheckbox);
    }
});