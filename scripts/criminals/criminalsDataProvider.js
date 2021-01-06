/*
 *   The criminalDataProvider module fetches an array of criminal objects, fills
 *   an array, criminals, and then copies the array to be exported with useCriminals for use elsewhere.
 */

import { sortArrayByLastName } from "../utils/sortArrayByLastName.js";

// Sets empty array for getCriminals to place the parsed data in.
let criminals = [];

// Returns a copy of the array criminals to be used later.
export const useCriminals = () => {
    return sortArrayByLastName(criminals).slice();
};

// Fetches a JSON string of criminals data and then converts it to a JavaScript array.
export const getCriminals = () => {
    return fetch("https://criminals.glassdale.us/criminals")
        .then(response => response.json())
        .then(
            parsedCriminals => {
                criminals = parsedCriminals
            }
        );
};