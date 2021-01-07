/*
 *   The CriminalList module renders a list of criminal HTML elements to #listContainer, depending
 *   on whether the full array or a filtered array is given as a parameter to the render function.
*/

import { useCriminals } from "./criminalsDataProvider.js";
import { useConvictions } from "../convictions/convictionsDataProvider.js";
import { useOfficers } from "../officers/officersDataProvider.js";
import { Criminal } from "./Criminal.js";
import { CriminalConvictionKey } from "./CriminalConvictionKey.js";

const eventHub = document.querySelector("#container");
const targetContentContainer = document.querySelector("#listContainer");
const targetContentKeyContainer = document.querySelector("#listKeyContainer");

let filterState = false;
let filterByBothState = false;
let selectedCrimeIdState = null;
let selectedOfficerIdState = null;
let randomColorThemeState = true;

/*
*   Criminal List gathers an array of criminal objects from useCriminals, clears the target container,
*   and maps over the array of criminal objects invoking Criminal to return an array of HTML representations
*   or criminal cards using .join("") to remove the commas in the array.
*/

export const CriminalList = () => {
    const appStateCriminals = useCriminals();
    targetContentContainer.innerHTML = "";
    targetContentContainer.innerHTML = appStateCriminals.map(c => Criminal(c, randomColorThemeState)).join("");
    CriminalConvictionKeyList(appStateCriminals);
}

// Render filtered criminals and dialog elements after filtering with changeConviction or changeOfficer custom event.
const FilteredCriminalList = (filteredArray) => {
    targetContentContainer.innerHTML = "";
    targetContentContainer.innerHTML = filteredArray.map(c => Criminal(c, randomColorThemeState)).join("");
    CriminalConvictionKeyList(filteredArray);
}

/*
*   Conviction Key List renders a color key to the DOM to allow users to quickly identify 
*   which conviction type the criminal has been convicted of.
*/

const CriminalConvictionKeyList = (appStateCriminals) => {
    if (randomColorThemeState) {
        targetContentKeyContainer.innerHTML = "";
    } else {
        targetContentKeyContainer.innerHTML = "";
        const convictions = [...new Set(appStateCriminals.map(c => c.conviction))];

        targetContentKeyContainer.innerHTML = convictions.sort().map(c => CriminalConvictionKey(c)).join("");
    }
}

/*
*   filterByOfficer filters appStateCriminals by arresting officer, and invokes the function, FilteredCriminalList, with the array as an argument.
*/

const filterByOfficer = () => {
    const appStateCriminals = useCriminals();
    const appStateOfficers = useOfficers();

    const officerName = appStateOfficers.find(c => c.id === selectedOfficerIdState).name;
    const filteredCriminalArray = appStateCriminals.filter(c => c.arrestingOfficer === officerName);
    FilteredCriminalList(filteredCriminalArray);
}

/*
*   filterByConviction filters appStateCriminals by conviction, and invokes the function, FilteredCriminalList, with the array as an argument.
*/

const filterByConviction = () => {
    const appStateCriminals = useCriminals();
    const appStateConvictions = useConvictions();

    const convictionName = appStateConvictions.find(c => c.id === selectedCrimeIdState).name;
    const filteredCriminalArray = appStateCriminals.filter(c => c.conviction === convictionName);
    FilteredCriminalList(filteredCriminalArray);
}

/*
*   filterByBoth filters appStateCriminals by both arresting officer and conviction, 
*   and invokes the function, FilteredCriminalList, with the array as an argument.
*/

const filterByBoth = () => {
    const appStateCriminals = useCriminals();
    const appStateOfficers = useOfficers();
    const appStateConvictions = useConvictions();

    const officerName = appStateOfficers.find(c => c.id === selectedOfficerIdState).name;
    const convictionName = appStateConvictions.find(c => c.id === selectedCrimeIdState).name;
    const filteredCriminalArray = appStateCriminals.filter(c => c.arrestingOfficer === officerName && c.conviction === convictionName);
    FilteredCriminalList(filteredCriminalArray);
}

/*
 *  Listens for the custom event, criminalListGenerate, to set the container (#listContainer) to empty, 
 *  invokes the function CriminalList to rerender the full array of criminals to the DOM, and
 *  resets the officer & conviction select elements to their default value. 
*/
eventHub.addEventListener("criminalListGenerate", e => {
    CriminalList();

    selectedCrimeIdState = null;
    selectedOfficerIdState = null;
    filterState = false;
    filterByBothState = false;

    const resetOfficerEvent = new CustomEvent("officerSelectReset")
    eventHub.dispatchEvent(resetOfficerEvent);

    const resetConvictionsEvent = new CustomEvent("convictionsSelectReset")
    eventHub.dispatchEvent(resetConvictionsEvent);
});

/*
 *  Listens for the custom event, crimeSelected, to set the container (#listContainer) to empty, 
 *  and invokes the function FilteredCriminalList to render the filtered array of criminals to the DOM. 
*/
eventHub.addEventListener("crimeSelected", e => {
    const selectedCrimeId = parseInt(e.detail.key);

    if (selectedCrimeId === 0) {
        CriminalList();
        filterState = false;
        selectedCrimeIdState = null;

        const resetOfficerEvent = new CustomEvent("officerSelectReset")
        eventHub.dispatchEvent(resetOfficerEvent);
    } else {
        selectedCrimeIdState = selectedCrimeId;
        filterState = true;

        if (filterByBothState) {
            if (selectedOfficerIdState === null || selectedCrimeIdState === null) {
                return;
            } else {
                filterByBoth();
            }
        } else {
            filterByConviction();

            const resetOfficerEvent = new CustomEvent("officerSelectReset")
            eventHub.dispatchEvent(resetOfficerEvent);
        }
    };
});

/*
 *  Listens for the custom event, officerSelected, to set the container (#listContainer) to empty, 
 *  and invokes the function FilteredCriminalList to render the filtered array of criminals to the DOM. 
*/
eventHub.addEventListener("officerSelected", e => {
    const selectedOfficerId = parseInt(e.detail.key);

    if (selectedOfficerId === 0) {
        CriminalList();
        filterState = false;
        selectedOfficerIdState = null;

        const resetConvictionsEvent = new CustomEvent("convictionsSelectReset")
        eventHub.dispatchEvent(resetConvictionsEvent);
    } else {
        selectedOfficerIdState = selectedOfficerId;
        filterState = true;

        if (filterByBothState) {
            if (selectedOfficerIdState === null || selectedCrimeIdState === null) {
                return;
            } else {
                filterByBoth();
            }
        } else {
            filterByOfficer();

            const resetConvictionsEvent = new CustomEvent("convictionsSelectReset")
            eventHub.dispatchEvent(resetConvictionsEvent);
        }
    };
});

/*
 *  Listens for the custom event, filterCheckboxClicked, to set the container (#listContainer) to empty, 
 *  and invokes the function FilteredCriminalList to render the filtered array of criminals to the DOM. 
*/
eventHub.addEventListener("filterCheckboxClicked", e => {
    filterByBothState = !filterByBothState

    if (!filterByBothState) {
        CriminalList();

        const resetOfficerEvent = new CustomEvent("officerSelectReset")
        eventHub.dispatchEvent(resetOfficerEvent);

        const resetConvictionsEvent = new CustomEvent("convictionsSelectReset")
        eventHub.dispatchEvent(resetConvictionsEvent);

        filterState = false;
        selectedCrimeIdState = null;
        selectedOfficerIdState = null;
    }
});

/*
*  Listens for the custom event, radioClicked, and sets the state of the background color theme,
*  sets the list container to empty, and rerenders the criminal list.
*/

eventHub.addEventListener("radioClicked", e => {
    randomColorThemeState = e.detail.option;
    if (!filterState) {
        CriminalList();
    } else {
        if (filterByBothState && (selectedOfficerIdState !== null && selectedCrimeIdState !== null) && (selectedOfficerIdState !== 0 && selectedCrimeIdState !== 0)) {
            filterByBoth();
        } else if (selectedOfficerIdState !== null && selectedOfficerIdState !== 0) {
            filterByOfficer();
        } else {
            filterByConviction();
        };
    };
});

/*
 *  Listens for the custom event, witnessListGenerate, to set the section (#listKeyContainer) to empty.
*/
eventHub.addEventListener("witnessListGenerate", event => {
    targetContentKeyContainer.innerHTML = "";
})