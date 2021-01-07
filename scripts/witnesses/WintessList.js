import { witness } from "./Witness.js";
import { useWitnesses } from "./witnessesDataProvider.js";

// WitnessList module that renders a list of witness HTML elements to .listContainer.

const eventHub = document.querySelector("#container");
const targetListContainerContentElement = document.querySelector("#listContainer");

// Renders individual witnessObjects onto the DOM by being called in a for/of loop by the function witnessList.
const render = witnessObject => {
    targetListContainerContentElement.innerHTML += witness(witnessObject);
}
/*
 *  Remove all criminals and runs the function render to render all witnesses elements 
 *  to the article element (.listContainer) when the button element (#button--witnessList) is "clicked". 
*/
const witnessList = () => {
    targetListContainerContentElement.innerHTML = "";
    const arrayOfWitnessObjects = useWitnesses();
    for (const witnessObject of arrayOfWitnessObjects) {
        render(witnessObject);
    }
}
/*
 *  Listens for the custom event, witnessListGenerate, to set the article element (.listContainer) to empty,
 *  and render a list of witnesses to the DOM in (.listContainer).
*/
eventHub.addEventListener("witnessListGenerate", event => {
    witnessList()
})