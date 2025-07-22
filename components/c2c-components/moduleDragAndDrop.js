import { InsertContent } from "./insertContent.js";

export const ModuleDragAndDrop = async (lessonFrame, jsondata, page) => {
  const lessonLength = jsondata[0]?.Lesson?.length;
  // await lessonFrame.waitForSelector(".contentObjectCard");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const moduleCount = await lessonFrame.$$eval(
    ".contentObjectCard",
    (els) => els.length
  );
  if (lessonLength !== moduleCount) {
    // Drag and Drop Modules
    for (let j = moduleCount; j < lessonLength; j++) {
      const ModuleName = jsondata[0]?.Lesson[j].ModuleName;
      await lessonFrame.waitForSelector(`[data-type="${ModuleName}"]`, {
        visible: true,
      });
      await lessonFrame.waitForSelector(`.listItemPlaceholder.emptySection`, {
        visible: true,
      });
      const source = await lessonFrame.$(`[data-type="${ModuleName}"]`);
      const target = await lessonFrame.$(".listItemPlaceholder.emptySection");
      if (!source || !target) {
        throw new Error("Source or target element not found");
      }
      await source.evaluate((el) =>
        el.scrollIntoView({ behavior: "auto", block: "center" })
      );
      await target.evaluate((el) =>
        el.scrollIntoView({ behavior: "auto", block: "center" })
      );
      const sourceBox = await source.boundingBox();
      const targetBox = await target.boundingBox();
      if (!sourceBox || !targetBox) {
        throw new Error("Could not get bounding boxes");
      }
      const startPoint = {
        x: sourceBox.x + sourceBox.width / 2,
        y: sourceBox.y + sourceBox.height / 2,
      };
      const endPoint = {
        x: targetBox.x + targetBox.width / 2,
        y: targetBox.y + targetBox.height / 2,
      };
      await page.mouse.move(startPoint.x, startPoint.y);
      await page.mouse.down();
      await page.mouse.move(endPoint.x, endPoint.y, { steps: 20 });
      await new Promise((r) => setTimeout(r, 1000));
      await page.mouse.up();
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await InsertContent(lessonFrame, jsondata, page, j);
    }
  }
};
