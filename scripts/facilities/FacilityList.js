// FacilityList module that renders a list of witness HTML elements to .listContainer.
import { getCriminals, useCriminals } from "../criminals/criminalsDataProvider.js";
import { getCriminalFacilities, useCriminalFacilities } from "./criminalFacilityDataProvider.js";
import { getFacilities, useFacilities } from "./facilitiesDataProvider.js";
import { Facility } from "./Facility.js";

const eventHub = document.querySelector("#container");
const targetListContainerContentElement = document.querySelector("#listContainer");
const targetKeyContentContainer = document.querySelector("#listKeyContainer");

let appStateCriminals = [];
let appStateFacilities = [];
let appStateCriminalFacilities = [];

// Renders a list of facilityObjects onto the DOM.
const render = () => {
    targetListContainerContentElement.innerHTML = appStateFacilities.map(f => {
        const facilityCriminalRelationships = appStateCriminalFacilities.filter(cf => cf.facilityId === f.id);
        const relatedCriminalsArray = facilityCriminalRelationships.map(cfr => appStateCriminals.find(c => c.id === cfr.criminalId));
        const now = Date.now();

        f.currentCriminals = relatedCriminalsArray.filter(rc => {
            const incarcerationEnd = new Date(rc.incarceration.end)
            const timeInMilliseconds = incarcerationEnd.getTime()
            return timeInMilliseconds > now
        });
        f.previousCriminals = relatedCriminalsArray.filter(rc => {
            const incarcerationEnd = new Date(rc.incarceration.end)
            const timeInMilliseconds = incarcerationEnd.getTime()
            return timeInMilliseconds < now
        });

        return Facility(f)
    }).join("");
}

/*
 *  Runs the function render to render all facility objects to the article element 
 *  (.listContainer) when the button element (#button--facilityList) is "clicked".
*/
const FacilityList = () => {
    targetKeyContentContainer.innerHTML = "";
    targetListContainerContentElement.innerHTML = "";
    getFacilities()
        .then(getCriminalFacilities)
        .then(getCriminals)
        .then(() => {
            appStateCriminals = useCriminals();
            appStateFacilities = useFacilities();
            appStateCriminalFacilities = useCriminalFacilities();
            render();
        });
}

/*
 *  Listens for the custom event, facilityListGenerate, to set the article element (.listContainer) to empty,
 *  and render a list of facilities to the DOM in (.listContainer).
*/
eventHub.addEventListener("facilityListGenerate", e => {
    FacilityList();
})