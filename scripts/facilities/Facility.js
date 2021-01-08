/*
 *  Facility module with securityLevel the function, Facility, which returns a string of HTML to form 
 *  facility card elements when looped through an array of facitliy objects. 
*/
export const Facility = (facilityObject) => {
    return `
    <div id="facility--${facilityObject.id}" class="facility">
        <h4 id="facilityName__${facilityObject.id}"><span class="bold">Name</span>: ${facilityObject.facilityName}</h4>
        <p><span class="bold">Security Level</span>: ${facilityObject.securityLevel}</p>
        <p><span class="bold">Capacity</span>: ${facilityObject.capacity}</p>
        
        ${facilityObject.currentCriminals.length > 0 ? currentCriminalsRender(facilityObject.currentCriminals) : ""}
        ${facilityObject.previousCriminals.length > 0 ? previousCriminalsRender(facilityObject.previousCriminals) : ""}
    </div>
    `
}

const currentCriminalsRender = (criminals) => {
    return `
    <div>
            <h4>Presently Incarcerated</h4>
            <ul>
                ${criminals.map(c => {
        const [firstName, lastName] = c.name.split(" ");
        return `<li>${lastName}, ${firstName}</li>`
    }).join("")}
            </ul>
        </div>
    `
}

const previousCriminalsRender = (criminals) => {
    return `
    <div>
            <h4>Previously Incarcerated</h4>
            <ul>
                ${criminals.map(c => {
        const [firstName, lastName] = c.name.split(" ");
        return `<li>${lastName}, ${firstName}</li>`
    }).join("")}
            </ul>
        </div>
    `
}