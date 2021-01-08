/*
 *   WitnessListButton module that renders a Witness Statements HTML button element
 *   which lists all witnesses and their statements in the my Glassdale PD API
 */

const eventHub = document.querySelector("#container");
const targetContentElement = document.querySelector("#buttonContainer__witnessList");

// Inserts a button, Witness Statements, onto the DOM in the header element (.headerContainer).
export const WitnessListButton = () => {
    targetContentElement.innerHTML += `
    <button id="button--witnessList">Witness Statements</button>
    `
}

/*
*  Listens for a "click" event and dispatches the custom events, witnessListGenerate & disableAffordanceEvent, to the eventHub
*  to set the article element (.listContainer) to empty and render a list of witnesses to the DOM in (.listContainer). 
*/
targetContentElement.addEventListener("click", e => {
    if (e.target.id === ("button--witnessList")) {
        const witnessListGenerateEvent = new CustomEvent("witnessListGenerate");
        eventHub.dispatchEvent(witnessListGenerateEvent);

        const disableAffordanceEvent = new CustomEvent("disableAffordanceEvent");
        eventHub.dispatchEvent(disableAffordanceEvent);
    }
})