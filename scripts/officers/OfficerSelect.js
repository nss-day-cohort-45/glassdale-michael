/*
*   OfficerSelect module renders a select option element which lists all 
*   officers in the Glassdale PD API in alphabetical order to provide
*   the user the ability to filter the criminal list by arresting officer.
*/

import { useOfficers } from "./officersDataProvider.js";

const eventHub = document.querySelector("#container");
const contentTargetContainer = document.querySelector("#officerFilter");

// OfficerSelect renders a list of options in the dropdown menue element (#officerSelect).
export const OfficerSelect = () => {
    const officers = useOfficers();
    contentTargetContainer.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            ${officers.map(o => {
        const [firstName, lastName] = o.name.split(" ");
        return `<option id="officerId--${o.id}" value="${o.id}" class="officersMenueItem">${lastName}, ${firstName}</option>`
    }).join("")
        }
        </select>
    `;
};


// Dispatches a custom event, officerSelected, and passes on the id of the officer via the chosenOfficerId detail.
contentTargetContainer.addEventListener("change", e => {
    if (e.target.id === "officerSelect") {
        let chosenOfficerId = e.target.value;
        let changeOfficerEvent = new CustomEvent("officerSelected", {
            detail: {
                key: chosenOfficerId
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
});