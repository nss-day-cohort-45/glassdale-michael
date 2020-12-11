/*
*  CriminalThemeRaidos module creates two radio input devices, inserts them onto the DOM, and
*  creates a listen event for the user's interaction which dictates the color theme in Criminal.js
*/

const eventHub = document.querySelector("#container");
const targetContentContainer = document.querySelector("#themeRadios");

export const CriminalThemeRadios = () => {
    targetContentContainer.innerHTML = `
        <p id="radioDivLabel">Criminal Card Background Color Theme</p>
        <input type="radio" id="randomRadio" name="color" value="random" checked>
        <label for="randomRadio">Random</label><br>
        <input type="radio" id="organizedRadio" name="color" value="organized">
        <label for="organizedRadio">Organized</label><br>
    `
};

targetContentContainer.addEventListener("click", e => {
    if (e.target.id === "randomRadio") {
        const radioClicked = new CustomEvent("radioClicked", {
            detail: {
                option: true
            }
        })
        eventHub.dispatchEvent(radioClicked);
    } else if (e.target.id === "organizedRadio") {
        const radioClicked = new CustomEvent("radioClicked", {
            detail: {
                option: false
            }
        })
        eventHub.dispatchEvent(radioClicked);
    };
});