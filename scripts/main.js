import { getCriminals } from "./criminals/criminalsDataProvider.js";
import { getConvictions } from "./convictions/convictionsDataProvider.js";

import { ConvictionSelect } from "./convictions/ConvictionSelect.js";
import { CriminalList } from "./criminals/CriminalList.js";
import { CriminalListButton } from "./criminals/CriminalListButton.js";
import "./criminals/Dialog.js";

getCriminals()
    .then(CriminalList);
getConvictions()
    .then(ConvictionSelect);

CriminalListButton();