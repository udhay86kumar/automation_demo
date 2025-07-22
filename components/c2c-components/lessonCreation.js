export const LessonCreation = async (frame, jsondata) => {
  // Lesson Creation
  const lessonName = jsondata[0]?.LessonName;
  await frame.waitForSelector(".resourceListName", { visible: true });
  const lessonexists = await frame.evaluate((name) => {
    const el = document.querySelector(`.resourceListName[title='${name}']`);
    if (el) return true;
  }, lessonName);
  if (!lessonexists) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await frame.waitForSelector("#addNewResourceButton", { visible: true });
    await frame.click("#addNewResourceButton");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await frame.waitForSelector("#contentType-lesson", { visible: true });
    await frame.click("#contentType-lesson");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await frame.waitForSelector("#contentItemName", { visible: true });
    await frame.type("#contentItemName", lessonName);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await frame.waitForSelector("#createContentItemFormObjectSaveButton", {
      visible: true,
    });
    await frame.click("#createContentItemFormObjectSaveButton");
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  await frame.waitForSelector("body");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // Search and click Lesson
  await frame.waitForSelector("#searchTerms");
  await frame.type("#searchTerms", lessonName);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  if (lessonexists) {
    await frame.evaluate((name) => {
      const el = document.querySelector(`.resourceListName[title='${name}']`);
      if (el) el.click();
    }, lessonName);
  }
  // Lesson Iframe
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const lessonIframe = await frame.$("iframe");
  const lessonf = await lessonIframe.contentFrame();
  await new Promise((resolve) => setTimeout(resolve, 4000));
  await lessonf.waitForSelector("a.k-button", {
    visible: true,
  });
  // const closepopup = await lessonf.evaluate(() => {
  //   const el = document.querySelector(`a.k-button`);
  //   if (el) return true;
  // });
  // // close the tag popup
  // if (closepopup) {
  //   console.log("Closing the tag popup");
  await lessonf.evaluate(() => {
    const el = document.querySelector("a.k-button");
    if (el) el.click();
  });
  // }
  if (!lessonf) throw new Error("iframe content not found");
  return lessonf;
};
