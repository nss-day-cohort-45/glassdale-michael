/*
 *   The CriminalList module renders a list of criminal HTML elements to #listContainer, depending
 *   on whether the full array or a filtered array is given as a parameter to the render function.
*/

import { useCriminals } from "./criminalsDataProvider.js";
import { useConvictions } from "../convictions/convictionsDataProvider.js";
import { useOfficers } from "../officers/officersDataProvider.js";
import { Criminal } from "./Criminal.js";

const eventHub = document.querySelector("#container");
const targetListContainer = document.querySelector("#listContainer");

let selectedCrimeIdState = null;
let selectedOfficerIdState = null;

/*
*   Criminal List gathers an array of criminal objects from useCriminals, clears the target container,
*   and maps over the array of criminal objects invoking Criminal to return an array of HTML representations
*   or criminal cards using .join("") to remove the commas in the array.
*/

export const CriminalList = () => {
    const appStateCriminals = useCriminals();
    targetListContainer.innerHTML = "";
    targetListContainer.innerHTML = appStateCriminals.map(c => Criminal(c)).join("")
}

// Render filtered criminals and dialog elements after filtering with changeConviction or changeOfficer custom event.
const FilteredCriminalList = (filteredArray) => {
    targetListContainer.innerHTML = "";
    targetListContainer.innerHTML = filteredArray.map(c => Criminal(c)).join("")
}

/*
 *  Listens for the custom event, criminalListGenerate, to set the container (#listContainer) to empty, 
 *  invokes the function CriminalList to rerender the full array of criminals to the DOM, and
 *  resets the officer & conviction select elements to their default value. 
*/
eventHub.addEventListener("criminalListGenerate", e => {
    CriminalList();

    document.querySelector("#officerSelect").value = "0";
    document.querySelector("#crimeSelect").value = "0";

    selectedCrimeIdState = null;
    selectedOfficerIdState = null;
});

/*
 *  Listens for the custom event, crimeSelected, to set the container (#listContainer) to empty, 
 *  and invokes the function FilteredCriminalList to render the filtered array of criminals to the DOM. 
*/
eventHub.addEventListener("crimeSelected", e => {
    const appStateCriminals = useCriminals();
    const appStateConvictions = useConvictions();
    const selectedCrimeId = parseInt(e.detail.key);
    selectedCrimeIdState = selectedCrimeId;

    if (selectedCrimeId === 0) {
        CriminalList();
    } else {
        const convictionName = appStateConvictions.find(c => c.id === selectedCrimeId).name
        const filteredCriminalArray = appStateCriminals.filter(c => c.conviction === convictionName);
        FilteredCriminalList(filteredCriminalArray);
    };
});

/*
 *  Listens for the custom event, officerSelected, to set the container (#listContainer) to empty, 
 *  and invokes the function FilteredCriminalList to render the filtered array of criminals to the DOM. 
*/
eventHub.addEventListener("officerSelected", e => {
    const appStateCriminals = useCriminals();
    const appStateOfficers = useOfficers();
    const selectedOfficerId = parseInt(e.detail.key);
    selectedOfficerIdState = selectedOfficerId;

    if (selectedOfficerId === 0) {
        CriminalList();
    } else {
        const officerName = appStateOfficers.find(c => c.id === selectedOfficerId).name
        const filteredCriminalArray = appStateCriminals.filter(c => c.arrestingOfficer === officerName);
        FilteredCriminalList(filteredCriminalArray);
    };
});

/*
 *  Listens for the custom event, filterButtonClicked, to set the container (#listContainer) to empty, 
 *  and invokes the function FilteredCriminalList to render the filtered array of criminals to the DOM. 
*/
eventHub.addEventListener("filterButtonClicked", e => {
    const appStateCriminals = useCriminals();
    const appStateOfficers = useOfficers();
    const appStateConvictions = useConvictions();

    const officerName = appStateOfficers.find(c => c.id === selectedOfficerIdState).name
    const convictionName = appStateConvictions.find(c => c.id === selectedCrimeIdState).name
    const filteredCriminalArray = appStateCriminals.filter(c => c.arrestingOfficer === officerName && c.conviction === convictionName);
    FilteredCriminalList(filteredCriminalArray);
});