/*
 *   officerDataProvider module fetches an array of officer objects from the Glassdale API, fills 
 *   the array officers, and then copies the array and exports it for use elsewhere with, useOfficers.
 */

import { sortArrayByLastName } from "../utils/sortArrayByLastName.js";

// Set empty array for getOfficers to place the parsed data in.
let officers = [];

// Returns a copy of the array officers to be used later.
export const useOfficers = () => {
    return sortArrayByLastName(officers).slice();
};

// Fetches a JSON string of officers data and then converts it to a JavaScript array.
export const getOfficers = () => {
    return fetch("https://criminals.glassdale.us/officers")
        .then(response => response.json())
        .then(
            parsedOfficers => {
                officers = parsedOfficers
            }
        );
};