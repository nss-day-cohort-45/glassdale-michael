/*
*   CriminalConvictionKey component exports the function, CriminalConvictionKey, that returns a string 
*   of HTML giving structure to a color key that allows users to easily identify the conviction type.
*/

import { switchFunction } from "../utils/switchFunction.js";

// Function, criminal, that accepts an argument, criminalObject, and returns a string of an HTML element.
export const CriminalConvictionKey = (conviction) => {
    const color = switchFunction(conviction);

    return `
    <div class="colorKey">
        <div class="colorBox ${color}"></div>
        <p>${conviction}</p>
    </div>
    `
}