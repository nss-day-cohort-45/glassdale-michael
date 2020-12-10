import { getCriminals } from "./criminals/criminalsDataProvider.js";
import { CriminalList } from "./criminals/CriminalList.js";
import { CriminalListButton } from "./criminals/CriminalListButton.js";
import "./criminals/Dialog.js";

getCriminals()
    .then(CriminalList);

CriminalListButton();