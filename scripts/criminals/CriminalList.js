import { useCriminals } from "./criminalsDataProvider.js";
import { useConvictions } from "../convictions/convictionsDataProvider.js";
import { Criminal } from "./Criminal.js";

/*
 *   The CriminalList module renders a list of criminal HTML elements to #listContainer, depending
 *   on whether the full array or a filtered array is given as a parameter to the render function.
*/

const eventHub = document.querySelector("#container");
const targetListContainer = document.querySelector("#listContainer");

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
 *  and invokes the function CriminalList to rerender the full array of criminals to the DOM. 
*/
eventHub.addEventListener("criminalListGenerate", e => {
    CriminalList();
})

/*
 *  Listens for the custom event, crimeSelected, to set the container (#listContainer) to empty, 
 *  and invokes the function FilteredCriminalList to render the filtered array of criminals to the DOM. 
*/
eventHub.addEventListener("crimeSelected", e => {
    const appStateCriminals = useCriminals();
    const appStateConvictions = useConvictions();
    const selectedCrimeId = parseInt(e.detail.key);

    if (selectedCrimeId === 0) {
        CriminalList();
    } else {
        const convictionName = appStateConvictions.find(c => c.id === selectedCrimeId).name
        const filteredCriminalArray = appStateCriminals.filter(c => c.conviction === convictionName);
        FilteredCriminalList(filteredCriminalArray);
    }
})