/*
*   ConvictionSelect module renders a select element which lists all 
*   convictions in the Glassdale PD API in alphabetical order to provide
*   the user the ability to filter the criminal list by conviction type.
*/

import { getConvictions, useConvictions } from "./convictionsDataProvider.js";

const eventHub = document.querySelector("#container");
const contentTargetContainer = document.querySelector("#convictionFilter");
let appStateConvictions = [];

// renders a select element (#crimeSelect), and maps over an array of convictions for select options.
const render = () => {
    contentTargetContainer.innerHTML = `
        <select class="dropdown" id="crimeSelect">
                <option value="0">Please select a crime...</option>
                ${appStateConvictions.map(c => {
        return `<option id="crimeId--${c.id}" value="${c.id}" class="crimeSelectOption">${c.name}</option>`
    }).join("")
        }
            </select>
    `
};

// Accesses an array of conviction objects by invoking useConvictions, fills the convictions array, and invokes render.
export const ConvictionSelect = () => {
    getConvictions()
        .then(() => {
            appStateConvictions = useConvictions();
            render();
        });
};

// Dispatches a custom event, crimeSelected, and passes on the id of the crime via the chosenCrime detail.
contentTargetContainer.addEventListener(
    "change",
    e => {
        if (e.target.id === "crimeSelect") {
            let chosenConvictionId = e.target.value;
            let changeConvictionEvent = new CustomEvent("crimeSelected", {
                detail: {
                    chosenConvictionId
                }
            })
            eventHub.dispatchEvent(changeConvictionEvent);
        }
    }
);

/*
 *  Listens for the custom event, convictionsSelectReset, to set the select element to the default value.
*/
eventHub.addEventListener("convictionsSelectReset", e => {
    document.querySelector("#crimeSelect").value = "0";
    document.querySelector("#crimeSelect").disabled = false;
});

/*
 *  Listens for the custom event, witnessListGenerate, to set the ConvictionSelect to disabled.
*/
eventHub.addEventListener("witnessListGenerate", event => {
    document.querySelector("#crimeSelect").disabled = true;
})