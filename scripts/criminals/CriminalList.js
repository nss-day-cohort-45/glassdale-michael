// ------------------------------------------------------------------------------------------------------------------------------------//
//                              I TEND TO STYLE MY MODULES WITH THE SAME STRUCTURE, THIS HELPS ME STAY ORGANIZED                       //
//                                                            - IMPORT STATEMENTS                                                      //
//                                                            - DOM NODE REFERENCES                                                    //
//                                                            - GLOBAL VARIABLES                                                       //
//                                                            - FUNCTIONS                                                              //
//                                                            - LISTEN EVENTS                                                          //
//                              THIS JUST MAKES SENSE TO ME, THERE IS NO 'RIGHT' WAY TO DO IT. ALL I SUGGEST,                          //
//                                  IS THAT YOU SET A STANDARD FOR YOURSELF, AND THAT YOU FOLLOW IT.                                   //
// ------------------------------------------------------------------------------------------------------------------------------------//

/*
 *   The CriminalList module renders a list of criminal HTML elements to #listContainer, depending
 *   on whether the full array or a filtered array is given as a parameter to the render function.
*/

// ------------------------------------------------------------------------------------------------------------------------------------//
//                                                            - IMPORT STATEMENTS                                                      //
// ------------------------------------------------------------------------------------------------------------------------------------//
/*  
 *   import all the functions we will utilize from other modules.
 *   Utilize that tab key! Let auto complete finish whenever possible (saves on spelling errors 😁)
*/
import { getCriminals, useCriminals } from "./criminalsDataProvider.js";
import { getConvictions, useConvictions } from "../convictions/convictionsDataProvider.js";
import { getOfficers, useOfficers } from "../officers/officersDataProvider.js";
import { Criminal } from "./Criminal.js";
import { CriminalConvictionKey } from "./CriminalConvictionKey.js";
import { NoResults } from "../utils/NoResults.js";

// ------------------------------------------------------------------------------------------------------------------------------------//
//                                                            - DOM NODE REFERENCES                                                    //
// ------------------------------------------------------------------------------------------------------------------------------------//
/*  
 *   Declare the DOM nodes we will utilize for listen events and functions emptying OR filling our containers.
 *   eventHub is utilized for listening for custom events we've created elsewhere and dispatched to here. This limits listen event triggers.
 *   targetContentContainer's DOM node is for our list Container. It is utilized in this module for our criminal list.
 *   targetKeyContentContainer's DOM node is for our color key that is displayed when the theme is set to organized.
*/
const eventHub = document.querySelector("#container");
const targetContentContainer = document.querySelector("#listContainer");
const targetKeyContentContainer = document.querySelector("#listKeyContainer");

// ------------------------------------------------------------------------------------------------------------------------------------//
//                                                            - GLOBAL VARIABLES                                                       //
// ------------------------------------------------------------------------------------------------------------------------------------//
/*
 *   Declare empty arrays for each of our data's application state. We will fill these arrays later after our
 *   getResource & useResource functions have returned the data we require. This is not desireable when our data
 *   is especially dynamic. If there is a chance our data could be changing regularly, it is best to make calls
 *   regularly rather than initially loading and storing data that could quickly become stale.
*/
let appStateCriminals = [];
let appStateOfficers = [];
let appStateConvictions = [];

/*
 *   Declare global variables that require use throughout the module. This is useful when one function in the module
 *   may need to let another funtion in the module know the state of the app has changed. I like to think of this
 *   as utilizing listen events but within a single module. This helps us get around the issue of scope, where one function
 *   may need to talk to another function that opporates outside of the scope it has declared (within it's curly brackets).
 *   
 *   filterState is going to let our app know that the user is attempting to filter the criminal list by either arresting officer or conviction type.
 *   It is useful as a quick check to see if we can simply render the full list of criminals or if we need to check other variables.
 *   
 *   filterByBothState is going to let our app know that the user is attempting to filter the criminal list by both arresting officer or conviction type.
 *   It is useful as a quick check to see if we should attempt to filter by both select elements or simply one select element.
 * 
 *   selectedCrimeIdState will hold the value of the conviction type's id. It is gathered by the detail of our custom event, crimeSelected.
 * 
 *   selectedOfficerIdState will hold the value of the arresting officer's id. It is gathered by the detail of our custom event, officerSelected.
 * 
 *   randomColorThemeState will hold the boolean value of our background color theme (true: random or false: organized).
*/
let filterState = false;
let filterByBothState = false;
let selectedCrimeIdState = null;
let selectedOfficerIdState = null;
let randomColorThemeState = true;

// ------------------------------------------------------------------------------------------------------------------------------------//
//                                                            - FUNCTIONS                                                              //
// ------------------------------------------------------------------------------------------------------------------------------------//
/*
 *   CriminalList invokes the getResource functions (getCriminals, getOfficers, getConvictions), to fetch the resources we require.
 *   After our app has fetched the data, we utilize the useResource functions (useCriminals, useOfficers, useConvictions) to set the
 *   state of our data. We must first invoke the getFunctions because they require time as they await the results of their fetch requests.
 *   If we invoke our useFunctions first, they will return an empty array.
 *   Once we have our appStateResources set in global variable arrays, we invoke the function render. 
*/
export const CriminalList = () => {
    getCriminals()
        .then(getOfficers)
        .then(getConvictions)
        .then(() => {
            appStateCriminals = useCriminals();
            appStateOfficers = useOfficers();
            appStateConvictions = useConvictions();
            render();
        });
}

/*  
 *   Render clears the target list container and maps over the array of all criminal objects invoking Criminal each
 *   itteration, which returns an array of HTML which we .join("") to one string to remove the commas.
*/
const render = () => {
    // Clear our list container, targetContentContainer, by setting the inner html to an empty string (not needed, but I like to be thorough).
    targetContentContainer.innerHTML = "";

    // Right side of the '=' (equal sign) evaluates first!
    // appStateCriminals.map utilizes the .map method on our array of criminals
    // As we iterate over this array, we take each criminal object, represented with 'c', and pass it and the randomColorThemeState (boolean value) to our Criminal function as arguments.
    // This results in an array of HTML which we .join("") to one string to remove the commas.

    // Left side of the '=' (equal sign) evaluates second!
    // We then take the resulting string of HTML and insert it at the reference node, targetContentContainer, with innerHTML.
    targetContentContainer.innerHTML = appStateCriminals.map(c => Criminal(c, randomColorThemeState)).join("");

    // We then pass the initial array of criminal objects to our function, CriminalConvictionKeyList, as an argument.
    CriminalConvictionKeyList(appStateCriminals);
}

// FilteredCriminalList accepts an array of criminal objects that has been filtered and it then does the same thing as the render function (but with our filtered array).
const FilteredCriminalList = (filteredArray) => {
    // First we check to see if our array has results
    if (filteredArray.length === 0) {

        // If there were no results that matched our filter, we will display a notice that there were no results.
        // Right side of the '=' (equal sign) evaluates first!
        // The function, NoResults, returns a message that nothing matched the search parameters.

        // Left side of the '=' (equal sign) evaluates second!
        // We then take the resulting string of HTML and insert it at the reference node, targetContentContainer, with innerHTML.
        targetContentContainer.innerHTML = NoResults();

    } else {

        // If there were results that matched our filter, we will display the results!
        // Clear our list container, targetContentContainer, by setting the inner html to an empty string (not needed, but I like to be thorough).
        targetContentContainer.innerHTML = "";

        // Right side of the '=' (equal sign) evaluates first!
        // filteredArray.map utilizes the .map method on our array of filtered criminals that FilteredCriminalList was given as an argument.
        // As we iterate over this array, we take each criminal object, represented with 'c', and pass it and the randomColorThemeState (boolean value) to our Criminal function.
        // This results in an array of HTML which we .join("") to one string to remove the commas.

        // Left side of the '=' (equal sign) evaluates second!
        // We then take the resulting string of HTML and insert it at the reference node, targetContentContainer, with innerHTML.
        targetContentContainer.innerHTML = filteredArray.map(c => Criminal(c, randomColorThemeState)).join("");
    };

    // We then pass the initial array of criminal objects to our function, CriminalConvictionKeyList, as an argument.
    // Regarless of if we have a filled array or not, we still want to utilize this function, as it initially clears the color Key.
    CriminalConvictionKeyList(filteredArray);
}

/*
 *   CriminalConvictionKeyList renders a color key to the DOM to allow users to quickly identify which conviction
 *   type the criminal has been convicted of if they are viewing the 'Organized' background color themes.
*/
const CriminalConvictionKeyList = (appStateCriminals) => {
    // First we check to see if the theme is random (aka, if randomColorThemeState === true) because a color key is
    // only useful when a user has selected 'Organized' background colors (aka, if randomColorThemeState === false).
    if (randomColorThemeState) {

        // If the theme is random, we clear the inner HTML by setting it to an empty string since we don't want a color key.
        targetKeyContentContainer.innerHTML = "";
    } else {
        // This code runs if randomColorThemeState === false (aka, a user has selected 'Organized' background colors).
        // Clear our list container, targetKeyContentContainer, by setting the inner html to an empty string (not needed, but I like to be thorough).
        targetKeyContentContainer.innerHTML = "";

        // This is new: [...new Set(someArray.map(variable => variable.property))]
        // This returns an array of the values of variable.property, but it is especially useful because the array will only result in unique values.
        // Here is a blog on the process: https://flaviocopes.com/how-to-get-unique-properties-of-object-in-array/
        // Our array, convictions, should be a list of all conviction types represented in our criminal list (check your console log to see what convictions evaluates as).
        const convictions = [...new Set(appStateCriminals.map(c => c.conviction))];
        console.log("convictions array evaluates as: " + convictions.sort())

        // Right side of the '=' (equal sign) evaluates first!
        // We sorty the array alphabetically and then map over the array with convictions.sort().map().
        // Each conviction name, 'c', is given as an argument to CriminalConvictionKey, which returns an array of HTML,
        // that contains a div and p tag with a background color associated with a conviction type.
        // This results in an array of HTML which we .join("") to one string to remove the commas.

        // Left side of the '=' (equal sign) evaluates second!
        // We then take the resulting string of HTML and insert it at the reference node, targetKeyContentContainer, with innerHTML.
        targetKeyContentContainer.innerHTML = convictions.sort().map(c => CriminalConvictionKey(c)).join("");
    }
}

/*
 *   filterByOfficer filters appStateCriminals by arresting officer, and invokes the function, FilteredCriminalList, with the array as an argument.
*/
const filterByOfficer = () => {
    // Right side of the '=' (equal sign) evaluates first!
    // appStateOfficers.find().name iterates over our array of officer objects, 'o', and then returns the 'name' property of the found officer
    // object that has a matching 'id' property that is identical to the value selectedOfficerIdState evaluates to. This global variable is
    // set when a user makes a change to the filter by officer select element.
    const officerName = appStateOfficers.find(o => o.id === selectedOfficerIdState).name;

    // appStateCriminals.filter() iterates over our array of criminal objects, 'c', and returns all criminal objects 
    // where the property, 'arrestingOfficer', is equal to the value officerName evaluates to.
    const filteredCriminalArray = appStateCriminals.filter(c => c.arrestingOfficer === officerName);

    // The final array, filteredCriminalArray, is given to the function FilteredCriminalList as an argument.
    // FilteredCriminalList is responsible for rendering the array to the DOM.
    FilteredCriminalList(filteredCriminalArray);
}

/*
 *   filterByConviction filters appStateCriminals by conviction, and invokes the function, FilteredCriminalList, with the array as an argument.
*/
const filterByConviction = () => {
    // Right side of the '=' (equal sign) evaluates first!
    // appStateConvictions.find().name iterates over our array of conviction objects, 'c', and then returns the 'name' property of the found conviction
    // object that has a matching 'id' property that is identical to the value selectedCrimeIdState evaluates to. This global variable is
    // set when a user makes a change to the filter by conviction select element.
    const convictionName = appStateConvictions.find(c => c.id === selectedCrimeIdState).name;

    // appStateCriminals.filter() iterates over our array of criminal objects, 'c', and returns all criminal objects 
    // where the property, 'conviction', is equal to the value convictionName evaluates to.
    const filteredCriminalArray = appStateCriminals.filter(c => c.conviction === convictionName);

    // The final array, filteredCriminalArray, is given to the function FilteredCriminalList as an argument.
    // FilteredCriminalList is responsible for rendering the array to the DOM.
    FilteredCriminalList(filteredCriminalArray);
}

/*
 *   filterByBoth filters appStateCriminals by both arresting officer and conviction, 
 *   and invokes the function, FilteredCriminalList, with the array as an argument.
*/
const filterByBoth = () => {
    // Right side of the '=' (equal sign) evaluates first!
    // appStateOfficers.find().name iterates over our array of officer objects, 'o', and then returns the 'name' property of the found officer
    // object that has a matching 'id' property that is identical to the value selectedOfficerIdState evaluates to. This global variable is
    // set when a user makes a change to the filter by officer select element.
    const officerName = appStateOfficers.find(o => o.id === selectedOfficerIdState).name;

    // appStateConvictions.find().name iterates over our array of conviction objects, 'c', and then returns the 'name' property of the found conviction
    // object that has a matching 'id' property that is identical to the value selectedCrimeIdState evaluates to. This global variable is
    // set when a user makes a change to the filter by conviction select element.
    const convictionName = appStateConvictions.find(c => c.id === selectedCrimeIdState).name;

    // appStateCriminals.filter() iterates over our array of criminal objects, 'c', and returns all criminal objects 
    // where the property, 'conviction', is equal to the value convictionName evaluates to AND where the property, 'arrestingOfficer', is equal to the value officerName evaluates to.
    // BOTH properties must match both criteria for the criminal object, 'c', to be returned to the array, filteredCriminalArray.
    const filteredCriminalArray = appStateCriminals.filter(c => c.arrestingOfficer === officerName && c.conviction === convictionName);

    // The final array, filteredCriminalArray, is given to the function FilteredCriminalList as an argument.
    // FilteredCriminalList is responsible for rendering the array to the DOM.
    FilteredCriminalList(filteredCriminalArray);
}


// ------------------------------------------------------------------------------------------------------------------------------------//
//                                                          - LISTEN EVENTS                                                            //
// ------------------------------------------------------------------------------------------------------------------------------------//
/*
 *  Listens for the custom event, criminalListGenerate, to invoke the function, render, to rerender the full array of criminals to the DOM.
*/
eventHub.addEventListener("criminalListGenerate", e => {
    // Invoke the function, render, in order to rerender the full array of criminals to the DOM.
    render();

    // Reset global variables to their initial values, as the button, "Show All Criminals", is used to reset the app to it's initial, unfiltered stage.
    selectedCrimeIdState = null;
    selectedOfficerIdState = null;
    filterState = false;
    filterByBothState = false;
});

/*
 *  Listens for the custom event, crimeSelected, which checks various global variables (filterState & filterByBothState)
 *  to determine which filter and/or render function to invoke to render HTML representations of criminals to the DOM. 
*/
eventHub.addEventListener("crimeSelected", e => {
    // First we store the value of the id of the associated conviction type from the detail of the event: e.detail.chosenConvictionId
    const selectedCrimeId = parseInt(e.detail.chosenConvictionId);

    // Initially we check to see if the default value 'Please Select a Crime' was chosen
    if (selectedCrimeId === 0) {
        // If the default falue was chosen, we invoke render to render the full array of criminals to the DOM.
        render();

        // Then we reset the global variables, filterState & selectedCrimeIdState, to their initial values.
        // This is because the view, or state, of the page has been reset by the user to the page's initial state
        // and the variables associated with those changes must be reset to reflect this.
        // Otherwise, the page view and the module's variables could become out of synch (what if they changed from another option?!).
        // Think of it this way: if the state of the page is the same as the initial render, 
        // then the state of the module's variables must ALSO be the same as initial load.
        filterState = false;
        selectedCrimeIdState = null;

        // Since we have reset the global variable, filterState, we must dispatch a custom event to the module,
        // OfficerSelect.js to tell the select element to reset to "Please Select an Officer". Otherwise,
        // we may end up with a variable, filterState, claiming there is no intent to filter, while another select element
        // claims otherwise.
        const resetOfficerEvent = new CustomEvent("officerSelectReset")
        eventHub.dispatchEvent(resetOfficerEvent);
    } else {
        // Since we are sure the select element, "Please Select a Crime", has changed to an actual crime (the value is something other than "0"),
        // we can now set our global variables to the proper values.
        selectedCrimeIdState = selectedCrimeId;
        filterState = true;

        // Before we now filter by conviction type, we must first check to see if the user is attempting to filter by BOTH options
        if (filterByBothState) {
            // If attempting to filter by both (aka, filterByBothState === true), then we check to see if the other affordance has already been chosen.
            if (selectedOfficerIdState === null) {
                // If the user has only selected filter by conviction so far, we will filter by conviction by invoking, filterByConviction.
                filterByConviction();
            }

            // If the user has already selected to filter by officer, then we will instead filter by both options by invoking, filterByBoth.
            filterByBoth();
        } else {
            // If the user has not selected the option to filter by both (aka, filterByBothState === false), we can simply chose to filter by conviction.
            filterByConviction();

            // Because we are sure that the user has chosen to:
            // 1) Filter by conviction type
            // 2) Chosen an actual conviction type
            // 3) Not chosen to filter by both
            // We can dispatch a customEvent to reset the "Please Select an Officer" select element if it is not set to default.
            // This will prevent the user from seeing both select elements seeming as if they are in use, when only one is in use.
            const resetOfficerEvent = new CustomEvent("officerSelectReset")
            eventHub.dispatchEvent(resetOfficerEvent);
        }
    };
});

/*
 *  Listens for the custom event, officerSelected, which checks various global variables (filterState & filterByBothState)
 *  to determine which filter and/or render function to invoke to render HTML representations of criminals to the DOM. 
*/
eventHub.addEventListener("officerSelected", e => {
    // First we store the value of the id of the associated arresting officer from the detail of the event: e.detail.chosenOfficerId
    const selectedOfficerId = parseInt(e.detail.chosenOfficerId);

    // Initially we check to see if the default value 'Please Select an Officer' was chosen
    if (selectedOfficerId === 0) {
        // If the default falue was chosen, we invoke render to render the full array of criminals to the DOM.
        render();

        // Then we reset the global variables, filterState & selectedOfficerIdState, to their initial values.
        // This is because the view, or state, of the page has been reset by the user to the page's initial state
        // and the variables associated with those changes must be reset to reflect this.
        // Otherwise, the page view and the module's variables could become out of synch (what if they changed from another option?!).
        // Think of it this way: if the state of the page is the same as the initial render, 
        // then the state of the module's variables must ALSO be the same as initial load.
        filterState = false;
        selectedOfficerIdState = null;

        // Since we have reset the global variable, filterState, we must dispatch a custom event to the module,
        // ConvictionSelect.js to tell the select element to reset to "Please Select a Crime". Otherwise,
        // we may end up with a variable, filterState, claiming there is no intent to filter, while another select element
        // claims otherwise.
        const resetConvictionsEvent = new CustomEvent("convictionsSelectReset")
        eventHub.dispatchEvent(resetConvictionsEvent);
    } else {
        // Since we are sure the select element, "Please Select an Officer", has changed to an actual officer (the value is something other than "0"),
        // we can now set our global variables to the proper values.
        selectedOfficerIdState = selectedOfficerId;
        filterState = true;

        // Before we now filter by arresting officer, we must first check to see if the user is attempting to filter by BOTH options
        if (filterByBothState) {
            // If attempting to filter by both (aka, filterByBothState === true), then we check to see if the other affordance has already been chosen.
            if (selectedCrimeIdState === null) {
                // If the user has only selected filter by officer so far, we will filter by officer by invoking, filterByOfficer.
                filterByOfficer();
            }

            // If the user has already selected to filter by conviction type, then we will instead filter by both options by invoking, filterByBoth.
            filterByBoth();
        } else {
            // If the user has not selected the option to filter by both (aka, filterByBothState === false), we can simply chose to filter by officer.
            filterByOfficer();

            // Because we are sure that the user has chosen to:
            // 1) Filter by arresting officer
            // 2) Chosen an actual arresting officer
            // 3) Not chosen to filter by both
            // We can dispatch a customEvent to reset the "Please Select a Crime" select element if it is not set to default.
            // This will prevent the user from seeing both select elements seeming as if they are in use, when only one is in use.
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
    // Because this event listener is tied to a checkbox with only two states, we can associate a boolean value to it.
    // On load, filterByBothState === false.
    // On load, the checkbox associated with it is unchecked.
    // As the checkbox is checked and unchecked, the boolean value is swaped between true and false (checked = true/unchecked = false)
    filterByBothState = !filterByBothState

    // While the checkbox itself is only tied to our global boolean value (for use in our filter & render functions), we can check
    // to see if it has been unchecked and thus reset our app state, both in the module (via global variables) & in page view (via select elements),
    // to ensure our select elements are not showing that we are filtering our list while our page view says otherwise.
    if (!filterByBothState) {
        // If filterByBothState === false (!false evaluates to true), then we invoke render to rerender a full criminal list to the DOM.
        render();

        // Since we have reset the global variable, filterState, we must dispatch custom events to the modules,
        // OfficerSelect.js & ConvictionSelect.js, to tell the select elements to reset to "Please Select..." (their default values).
        // Otherwise, we may end up with a variable, filterState, claiming there is no intent to filter, while a select element claims otherwise.
        const resetOfficerEvent = new CustomEvent("officerSelectReset")
        eventHub.dispatchEvent(resetOfficerEvent);

        const resetConvictionsEvent = new CustomEvent("convictionsSelectReset")
        eventHub.dispatchEvent(resetConvictionsEvent);

        // Then we reset the global variables filterState, selectedCrimeIdState, & selectedOfficerIdState to their initial values.
        // This is because the view, or state, of the page has been reset by the user to the page's initial state
        // and the variables associated with those changes must be reset to reflect this.
        // Otherwise, the page view and the module's variables could become out of synch (what if they changed from another option?!).
        // Think of it this way: if the state of the page is the same as the initial render, 
        // then the state of the module's variables must ALSO be the same as initial load.
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
    // First, we set our global variable, randomColorThemeState, to the proper boolean value which is gathered from our event detail: e.detail.option
    randomColorThemeState = e.detail.option;

    // Then we check to see if the user is attempting to filter (if filterState === false, then !filterState === true).
    // We are going to chose to rerender under every scenario because the user has chosen to change the background color of the criminal cards.
    // This requires us to rerender the currently displayed criminal list (no matter the choice of filter or lack thereof) to the DOM with new classes.
    if (!filterState) {
        // If filterState is false, then we are presenting an unfiltered array and simply invoke render to rerender the criminals to the DOM.
        render();
    } else {
        // Next, we check to see if the user has both chosen to filter by both AND chosen both filter options.
        if (filterByBothState && selectedOfficerIdState !== null && selectedCrimeIdState !== null) {
            // If so, we invoke the function, filterByBoth, in order to rerender the criminal array filtering by both options.
            filterByBoth();
            // Next, we check to see if the user has both chosen to filter by arresting officer (we could chose crime first, the order here doesn't matter).
        } else if (selectedOfficerIdState !== null) {
            // If so, we invoke the function, filterByOfficer, in order to rerender the criminal array filtering by arresting officer.
            filterByOfficer();
        } else {
            // Lastly, we invoke the function, filterByConviction, in order to rerender the criminal array filtering by conviction type (since it is the final option).
            filterByConviction();
        };
    };
});