/*
 *   witnessesDataProvider module that fetches an array of witness objects, fills the array, witnesses,
 *   and then copies the array with the funciton, useWitnesses, and exports it for use elsewhere.
 */

// Sets empty array for getWitnesses to place the parsed data in.
let witnesses = [];

// Returns a copy of the array witnesses to be used later.
export const useWitnesses = () => {
    return witnesses.slice();
}

// Fetches a JSON string of witnessess data and then converts it to a JavaScript array.
export const getWitnesses = () => {
    return fetch("https://criminals.glassdale.us/witnesses")
        .then(response => response.json())
        .then(
            parsedWitnesses => {
                witnesses = parsedWitnesses
            }
        );
}