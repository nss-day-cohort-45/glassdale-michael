/*
 *   The sortArrayByLastName function accepts an array and returns the array in alphabetical order by last name.
 */

export const sortArrayByLastName = (arrayToBeSorted) => {
    return arrayToBeSorted.sort(
        (currentObject, nextObject) => {
            const [currentObjectFirstName, currentObjectLastName] = currentObject.name.split(" ");
            const [nextObjectFirstName, nextObjectLastName] = nextObject.name.split(" ");

            if (currentObjectLastName < nextObjectLastName) { return -1; }
            if (currentObjectLastName > nextObjectLastName) { return 1; }
            return 0;
        }
    )
}