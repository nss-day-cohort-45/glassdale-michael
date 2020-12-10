/*
 *   CriminalListFilterButton renders a button labeled, Fiter Criminals by Both Options, that 
 *   filters all criminals in the Glassdale PD API via the "filterButtonClicked" custom event.
 */

const eventHub = document.querySelector("#container");
const targetContentContainer = document.querySelector("#filterButton");

// Inserts a button, Show All Criminals, onto the DOM in the header element (#headerContainer).
export const CriminalListFilterButton = () => {
    targetContentContainer.innerHTML = `
    <button id="button--filterCriminalList">Fiter Criminal List by Both Options</button>
    `
};

/*
*   Listens for a "click" event and dispatches the custom event, filterButtonClicked, to the eventHub
*   to set the article element (#listContainer) to empty and render a list of criminals to the DOM in (#listContainer).
*/
targetContentContainer.addEventListener(
    "click",
    e => {
        if (e.target.id === ("button--filterCriminalList")) {
            const criminalListFilterEvent = new CustomEvent("filterButtonClicked");
            eventHub.dispatchEvent(criminalListFilterEvent);
        }
    });