/*
*   ConvictionSelect module renders a select element which lists all 
*   convictions in the Glassdale PD API in alphabetical order to provide
*   the user the ability to filter the criminal list by conviction type.
*/

import { useConvictions } from "./convictionsDataProvider.js";

const eventHub = document.querySelector("#container");
const contentTargetContainer = document.querySelector("#convictionFilter");

/*  Accesses an array of criminal objects by invoking useCriminals and
*   renders a list of options in the dropdown menue element (#crimeSelect).
*/
export const ConvictionSelect = () => {
    const convictions = useConvictions();
    contentTargetContainer.innerHTML = `
        <select class="dropdown" id="crimeSelect">
                <option value="0">Please select a crime...</option>
                ${convictions.map(c => {
        return `<option id="crimeId--${c.id}" value="${c.id}" class="crimeSelectOption">${c.name}</option>`
    }).join("")
        }
            </select>
    `
};

// Dispatches a custom event, crimeSelected, and passes on the id of the crime via the chosenCrime detail.
contentTargetContainer.addEventListener(
    "change",
    e => {
        if (e.target.id === "crimeSelect") {
            let chosenCrime = e.target.value;
            let changeConvictionEvent = new CustomEvent("crimeSelected", {
                detail: {
                    key: chosenCrime
                }
            })
            eventHub.dispatchEvent(changeConvictionEvent);
        }
    }
);