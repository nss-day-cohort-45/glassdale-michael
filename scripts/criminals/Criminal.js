/*
*   Criminal component exports the function, Criminal, that returns a string of HTML giving
*   structure to criminal card(s) when given a criminal object as the parameter to the argument.
*/

import { colorThemeSwitchFunction } from "../utils/colorThemeSwitchFunction.js";

const eventHub = document.querySelector("#container");
const targetContentContainer = document.querySelector("#listContainer");

// Function, criminal, that accepts an argument, criminalObject, and returns a string of an HTML element.
export const Criminal = (criminalObject, randomColorThemeState) => {
    const [firstName, lastName] = criminalObject.name.split(" ");

    let color;
    const colorArray = [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "violet"
    ];

    if (randomColorThemeState) {
        let randomNumber = Math.floor(Math.random() * 6);
        color = colorArray[randomNumber]
    } else {
        color = colorThemeSwitchFunction(criminalObject.conviction);
    };

    return `
    <div id="criminalCard--${criminalObject.id}" class="criminal ${color}">
        <h4 id="criminalCard__name"><span class="bold">Name</span>: ${lastName}, ${firstName}</h4>
        <div class="criminalCard__information">
            <p class="information--age"><span class="bold">Age</span>: ${criminalObject.age}</p>
            <p class="information--crime"><span class="bold">Crime</span>: ${criminalObject.conviction}</p>
            <p class="information--incarceration">
            <span class="bold">Incarceration start</span>: ${new Date(criminalObject.incarceration.start).toLocaleDateString()}</br>
            <span class="bold">Incarceration end</span>: ${new Date(criminalObject.incarceration.end).toLocaleDateString()}
            </p>

            <button id="associates--${criminalObject.id}">Associate Alibis</button>

        </div>

        <button id="hideCriminal--${criminalObject.id}">Remove Criminal From Current List</button>
    </div>
    `
}

/*
 *  Listens for a "click" event and dispatches the custom event, assiciatesButtonClicked,
 *  to the eventHub to open a dialog box with a list of known associates and a corresponding alibi.
*/
targetContentContainer.addEventListener(
    "click",
    e => {
        if (e.target.id.startsWith("associates--")) {
            const [prefix, chosenCriminalId] = e.target.id.split("--");
            const openDialogBox = new CustomEvent("assiciatesButtonClicked", {
                detail: {
                    criminal: chosenCriminalId
                }
            });
            eventHub.dispatchEvent(openDialogBox);
        };
    });
/*
*   Listens for a "click" event listener on the button element that starts with (#hideCriminal--),
*   which sets the corresponding criminal card to display: none, by adding the class "hidden".
*/
targetContentContainer.addEventListener("click", e => {
    if (e.target.id.startsWith("hideCriminal--"))
        e.target.parentElement.remove();
});