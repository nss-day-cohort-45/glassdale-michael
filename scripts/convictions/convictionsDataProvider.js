/*
 *   convictionsDataProvider module fetches an array of conviction objects from the Glassdale API,
 *   fills the array, convictions, and then copies the array to export for use elsewhere.
 */

// Sets empty array for getConvictions to place the parsed data in.
let convictions = [];

// Returns a copy of the array convictions to be used later.
export const useConvictions = () => {
    convictions.sort(
        (currentConvictionObject, nextConvictionObject) => {

            if (currentConvictionObject.name < nextConvictionObject.name) { return -1; }
            if (currentConvictionObject.name > nextConvictionObject.name) { return 1; }
            return 0;
        }
    )
    return convictions.slice();
};

// Fetches a JSON string of criminals data, converts it to a JavaScript array named convictions.
export const getConvictions = () => {
    return fetch("https://criminals.glassdale.us/crimes")
        .then(response => response.json())
        .then(
            parsedConvictions => {
                convictions = parsedConvictions
            }
        )
};