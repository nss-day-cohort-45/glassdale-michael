/*
 *   CriminalListFilterCheckbox renders a Checkbox labeled, Fiter Criminals by Both Options, that 
 *   filters all criminals in the Glassdale PD API via the "filterCheckboxClicked" custom event.
 */

const eventHub = document.querySelector("#container");
const targetContentContainer = document.querySelector("#filterCheckbox");

// Inserts a Checkbox, Show All Criminals, onto the DOM in the header element (#headerContainer).
export const CriminalListFilterCheckbox = () => {
    targetContentContainer.innerHTML = `
    <label for="checkbox--filterCriminalList">Fiter Criminal List by Both Options:</label>
    <input type="checkbox" id="checkbox--filterCriminalList" name="checkbox--filterCriminalList" />
    `
};

/*
*   Listens for a "click" event and dispatches the custom event, filterCheckboxClicked, to the eventHub
*   to set the article element (#listContainer) to empty and render a list of criminals to the DOM in (#listContainer).
*/
targetContentContainer.addEventListener("click", e => {
    if (e.target.id === ("checkbox--filterCriminalList")) {
        const criminalListFilterEvent = new CustomEvent("filterCheckboxClicked", {
            detail: {
                checked: e.target.checked
            }
        });
        eventHub.dispatchEvent(criminalListFilterEvent);
    }
});