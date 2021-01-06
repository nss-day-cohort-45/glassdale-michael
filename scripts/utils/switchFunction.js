/*
*   switchFunction exports the function, switchFunction, that returns a string
*   of a color for use in CSS to match with a conviction type.
*/

export const switchFunction = (conviction) => {
    switch (conviction) {
        case "arson":
            return "orange";
        case "murder":
            return "crimson";
        case "grand theft":
            return "green";
        case "vandalism":
            return "cadetblue";
        case "assault":
            return "coral";
        case "battery":
            return "maroon";
        case "conspiracy to commit murder":
            return "yellow";
        case "tax evasion":
            return "antiquewhite";
        case "theft":
            return "darkorchid";
        case "assault with a deadly weapon":
            return "red";
        case "manslaughter":
            return "violet";
        case "blackmail":
            return "mediumseagreen";
        case "bribery":
            return "blue";
        case "burglary":
            return "lightgreen";
        case "forgery":
            return "darkolivegreen";
        case "fraud":
            return "deeppink";
        case "mail fraud":
            return "fuchsia";
        case "larceny":
            return "darksalmon";
        case "kidnapping":
            return "paleturquoise";
        case "extortion":
            return "goldenrod";
        case "false imprisonment":
            return "palevioletred";
        case "criminal negligence":
            return "rebeccapurple";
        case "child abuse":
            return "skyblue";
        case "animal abuse":
            return "rosybrown";
    };
};