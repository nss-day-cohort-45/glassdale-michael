import { getCriminals } from "./criminals/criminalsDataProvider.js";
import { getConvictions } from "./convictions/convictionsDataProvider.js";
import { getOfficers } from "./officers/officersDataProvider.js";

import { ConvictionSelect } from "./convictions/ConvictionSelect.js";
import { CriminalList } from "./criminals/CriminalList.js";
import { CriminalListButton } from "./criminals/CriminalListButton.js";
import { OfficerSelect } from "./officers/OfficerSelect.js";
import "./criminals/Dialog.js";

getCriminals()
    .then(CriminalList);
getConvictions()
    .then(ConvictionSelect);
getOfficers()
    .then(OfficerSelect);

CriminalListButton();