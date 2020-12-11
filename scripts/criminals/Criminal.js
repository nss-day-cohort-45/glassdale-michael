/*
*   Criminal component exports the function, Criminal, that returns a string of HTML giving
*   structure to criminal card(s) when given a criminal object as the parameter to the argument.
*/

const eventHub = document.querySelector("#container");
const targetListContainer = document.querySelector("#listContainer");

let color;
const colorArray = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "violet"
];

// Function, criminal, that accepts an argument, criminalObject, and returns a string of an HTML element.
export const Criminal = (criminalObject, randomColorThemeState) => {
    const [firstName, lastName] = criminalObject.name.split(" ");

    if (randomColorThemeState) {
        let randomNumber = Math.floor(Math.random() * 6);
        color = colorArray[randomNumber]
    } else {
        switchFunction(criminalObject.conviction);
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
targetListContainer.addEventListener(
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
targetListContainer.addEventListener("click", e => {
    if (e.target.id.startsWith("hideCriminal--"))
        e.target.parentElement.remove();
});

const switchFunction = (conviction) => {
    switch (conviction) {
        case "arson":
            color = "orange";
            break;
        case "murder":
            color = "crimson";
            break;
        case "grand theft":
            color = "green";
            break;
        case "vandalism":
            color = "cadetblue";
            break;
        case "assault":
            color = "red";
            break;
        case "battery":
            color = "maroon";
            break;
        case "conspiracy to commit murder":
            color = "yellow";
            break;
        case "tax evasion":
            color = "antiquewhite";
            break;
        case "theft":
            color = "darkorchid";
            break;
        case "assault with a deadly weapon":
            color = "coral";
            break;
        case "manslaughter":
            color = "violet";
            break;
        case "blackmail":
            color = "mediumseagreen";
            break;
        case "bribery":
            color = "blue";
            break;
        case "burglary":
            color = "lightgreen";
            break;
        case "forgery":
            color = "darkolivegreen";
            break;
        case "fraud":
            color = "deeppink";
            break;
        case "mail fraud":
            color = "fuchsia";
            break;
        case "larceny":
            color = "darksalmon";
            break;
        case "kidnapping":
            color = "paleturquoise";
            break;
        case "extortion":
            color = "goldenrod";
            break;
        case "false imprisonment":
            color = "palevioletred";
            break;
        case "criminal negligence":
            color = "rebeccapurple";
            break;
        case "child abuse":
            color = "skyblue";
            break;
        case "animal abuse":
            color = "rosybrown";
    };
};