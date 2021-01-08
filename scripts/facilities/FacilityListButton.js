/*
 *   FacilityListButton module that renders a Show Facilities HTML button element
 *   which lists all facilities in the Glassdale PD API
 */

const eventHub = document.querySelector("#container");
const targetContentElement = document.querySelector("#buttonContainer__facilityList");

// Inserts a button, Facilities, onto the DOM in the header element (.headerContainer).
export const FacilityListButton = () => {
    targetContentElement.innerHTML += `
    <button id="button--facilityList">Facilities</button>
    `
}

/*
 *  Listens for a "click" event and dispatches the custom event, facilityListGenerate & disableAffordanceEvent, to the eventHub
 *  to set the article element (.listContainer) to empty and render a list of facilities to the DOM in (.listContainer). 
*/
targetContentElement.addEventListener("click", e => {
    if (e.target.id === ("button--facilityList")) {
        const facilityListGenerateEvent = new CustomEvent("facilityListGenerate");
        eventHub.dispatchEvent(facilityListGenerateEvent);

        const disableAffordanceEvent = new CustomEvent("disableAffordanceEvent");
        eventHub.dispatchEvent(disableAffordanceEvent);
    }
});