import { getCriminals } from "./criminals/criminalsDataProvider.js";
import { getConvictions } from "./convictions/convictionsDataProvider.js";
import { getOfficers } from "./officers/officersDataProvider.js";
import { getNotes } from "./notes/notesDataProvider.js";
import { getWitnesses } from "./witnesses/witnessesDataProvider.js";

import { ConvictionSelect } from "./convictions/ConvictionSelect.js";
import { CriminalList } from "./criminals/CriminalList.js";
import { CriminalListButton } from "./criminals/CriminalListButton.js";
import { CriminalListFilterCheckbox } from "./criminals/CriminalListFilterCheckbox.js";
import { CriminalThemeRadios } from "./criminals/CriminalThemeRadios.js";
import { NoteFormButton } from "./notes/NoteFormButton.js";
import { NotesListButton } from "./notes/NoteListButton.js";
import { OfficerSelect } from "./officers/OfficerSelect.js";
import { witnessListButton } from "./witnesses/WitnessListButton.js";
import "./criminals/CriminalAssociatesDialog.js";
import "./notes/NoteForm.js";
import "./notes/NoteList.js";
import "./witnesses/WintessList.js";
import "./witnesses/Witness.js";

getCriminals()
    .then(getNotes)
    .then(CriminalList)

getConvictions()
    .then(ConvictionSelect);

getOfficers()
    .then(OfficerSelect);

getWitnesses()
    .then(witnessListButton)

CriminalListFilterCheckbox();
CriminalThemeRadios();
CriminalListButton();
NoteFormButton();
NotesListButton();
