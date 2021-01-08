/*
*   OfficerSelect module renders a select option element which lists all 
*   officers in the Glassdale PD API in alphabetical order to provide
*   the user the ability to filter the criminal list by arresting officer.
*/

import { getOfficers, useOfficers } from "./officersDataProvider.js";

let appStateOfficers = [];
const eventHub = document.querySelector("#container");
const contentTargetContainer = document.querySelector("#officerFilter");

// renders a select element (#officerSelect), and maps over an array of officers for select options.
const render = () => {
    contentTargetContainer.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            ${appStateOfficers.map(o => {
        const [firstName, lastName] = o.name.split(" ");
        return `<option id="officerId--${o.id}" value="${o.id}" class="officersMenueItem">${lastName}, ${firstName}</option>`
    }).join("")
        }
        </select>
    `;
};

// Accesses an array of officer objects by invoking useOfficers, fills the officers array, and invokes render.
export const OfficerSelect = () => {
    getOfficers()
        .then(() => {
            appStateOfficers = useOfficers();
            render();
        });
};


// Dispatches a custom event, officerSelected, and passes on the id of the officer via the chosenOfficerId detail.
contentTargetContainer.addEventListener("change", e => {
    if (e.target.id === "officerSelect") {
        let chosenOfficerId = e.target.value;
        let changeOfficerEvent = new CustomEvent("officerSelected", {
            detail: {
                chosenOfficerId
            }
        })
        eventHub.dispatchEvent(changeOfficerEvent);
    }
});

/*
*  Listens for the custom event, officerSelectReset, to set the select element to the default value.
*/
eventHub.addEventListener("officerSelectReset", e => {
    document.querySelector("#officerSelect").value = "0";
    document.querySelector("#officerSelect").disabled = false;
});

/*
 *  Listens for the custom event, otherListGenerate, to set the OfficerSelect to disabled.
*/
eventHub.addEventListener("otherListGenerate", e => {
    document.querySelector("#officerSelect").disabled = true;
})