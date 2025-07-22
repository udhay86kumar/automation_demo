import dotenv from "dotenv";
dotenv.config();
import { BrowserPage } from "./utils/browserPage.js";
import { LaunchBrowser } from "./utils/launchBrowser.js";
// Lesson Data
import lessondata from "./LessonData_1.json" with { type: "json" };
// C2C components
import { SearchWorkSpace } from "./components/c2c-components/searchWorkSpace.js";
import { LessonCreation } from "./components/c2c-components/lessonCreation.js";
import { ModuleDragAndDrop } from "./components/c2c-components/moduleDragAndDrop.js";


const jsondata = lessondata;
// env imports
let jwtToken = process.env.JWTTOKEN;

let launchBrowser = await LaunchBrowser();
let page = await BrowserPage(launchBrowser, jwtToken);
let frame = await SearchWorkSpace(jsondata, page);
let lessonFrame = await LessonCreation(frame, jsondata);
let moduleDragAndDrop = await ModuleDragAndDrop(lessonFrame, jsondata, page);
