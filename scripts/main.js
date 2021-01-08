import { ConvictionSelect } from "./convictions/ConvictionSelect.js";
import { CriminalList } from "./criminals/CriminalList.js";
import { CriminalListButton } from "./criminals/CriminalListButton.js";
import { CriminalListFilterCheckbox } from "./criminals/CriminalListFilterCheckbox.js";
import { CriminalThemeRadios } from "./criminals/CriminalThemeRadios.js";
import { FacilityListButton } from "./facilities/FacilityListButton.js";
import { NoteFormButton } from "./notes/NoteFormButton.js";
import { NotesListButton } from "./notes/NoteListButton.js";
import { OfficerSelect } from "./officers/OfficerSelect.js";
import { WitnessListButton } from "./witnesses/WitnessListButton.js";
import "./criminals/CriminalAssociatesDialog.js";
import "./facilities/Facility.js";
import "./facilities/FacilityList.js";
import "./notes/NoteForm.js";
import "./notes/NoteList.js";
import "./witnesses/WintessList.js";
import "./witnesses/Witness.js";

CriminalList();

CriminalListFilterCheckbox();
ConvictionSelect();
OfficerSelect();
CriminalThemeRadios();

CriminalListButton();
NoteFormButton();
NotesListButton();
WitnessListButton();
FacilityListButton();