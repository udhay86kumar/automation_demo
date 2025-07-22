import { CheckModuleType } from "./checkModuleType.js";
import { PassageActivity } from "./modules/passageActivity.js";
import { StudentInstruction } from "./modules/studentInstruction.js";
import { MultipleChoice } from "./modules/multipleChoice.js"
 
 
export const InsertContent = async (lessonFrame, jsondata, page, j) => {
  // open each modules and add content
  await lessonFrame.waitForSelector(".contentObjectCard");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // click each module
  const modules = await lessonFrame.$$(".contentObjectCard");
  const module = modules[j];
  // Check module type
  if (module) {
    const moduleAttributeValue = await module.evaluate((el) =>
      el.getAttribute("data-type")
    );
    const ModuleType = CheckModuleType(moduleAttributeValue);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await module.click();
    switch (ModuleType) {
      case "ArticleQuestion":
        await PassageActivity(lessonFrame, jsondata, page, j);
        break;
      case "StudentInstruction":
        await StudentInstruction(lessonFrame, jsondata, j);
        break;
      case "Multichoice":
        await MultipleChoice(lessonFrame,jsondata,page,j)
      default:
        console.log("No specific module type found, skipping...");
        break;
    }
  }
};