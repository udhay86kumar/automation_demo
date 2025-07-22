export const PassageActivity = async (lessonFrame, jsondata, page, j) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await lessonFrame.waitForSelector(".slideSummary");
  const inputfield = await lessonFrame.$(
    ".slideSummary[value='Passage Activity']"
  );
  //   Goto Card Text
  await inputfield.evaluate((input) => (input.value = ""));
  await lessonFrame.waitForSelector(".slideSummary", { visible: true });
  await lessonFrame.type(".slideSummary", jsondata[0]?.Lesson[j].Title);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  //   Adding Content
  await lessonFrame.waitForSelector(".contentDisplayContainer .editable");
  const [input] = await lessonFrame.$$(".contentDisplayContainer .editable");
  input?.focus();
  await lessonFrame.waitForSelector(".cke_button__ogmentimage");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await lessonFrame.evaluate(() => {
    const el = document.querySelectorAll(".cke_button__ogmentimage");
    if (el?.[1]) el[1].click();
  });
  // Image iframe handling
  const uploadIframe = await lessonFrame.$("iframe");
  const uploadf = await uploadIframe.contentFrame();
  if (!uploadf) throw new Error("iframe content not found");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // select the workspace
  await uploadf.waitForSelector("#selectWorkspaceButton");
  await uploadf.evaluate(() => {
    const radio = document.getElementById("selectWorkspaceButton");
    if (radio) radio.click();
  });
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // Search for Images
  await uploadf.waitForSelector("#searchTerms");
  const valueToSelect = jsondata[0]?.Lesson[j].ImagesName;
  await uploadf.type("#searchTerms", valueToSelect);
  await uploadf.waitForSelector(".resourceListWrapper");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // Add Images
  const items = await uploadf.$$(".resourceListWrapper");
  for (const item of items) {
    const nameHandle = await item.$(".shoppingListName");
    const nameText = await uploadf.evaluate(
      (el) => el.textContent.trim(),
      nameHandle
    );
    if (nameText === valueToSelect + ".JPG") {
      const checkbox = await item.$('input[type="checkbox"]');
      await new Promise((resolve) => setTimeout(resolve, 3000));
      if (checkbox) {
        await uploadf.evaluate(
          (el) => el.scrollIntoView({ behavior: "auto", block: "center" }),
          checkbox
        );
        await uploadf.evaluate((el) => el.click(), checkbox);
      }
      break;
    }
  }
  // click the Done button, after select the Image
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await uploadf.waitForSelector("#shoppingDoneButton", { visible: true });
  await new Promise((resolve) => setTimeout(resolve, 4000));
  await uploadf.waitForSelector("#shoppingDoneButton", { visible: true });
  await uploadf.evaluate(() => {
    const el = document.querySelector("#shoppingDoneButton");
    if (el) el.click();
  });
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // Add submodules
  const subModules = jsondata[0]?.Lesson[j]?.subModules || [];
  for (let x = 0; x < subModules.length; x++) {
    await lessonFrame.waitForSelector(".contentDisplayContainer", {
      visible: true,
    });
    const source = await lessonFrame.$(
      `[data-type="${jsondata[0]?.Lesson[j]?.subModules[0]?.ModuleName}"]`
    );
    const target = await lessonFrame.$(".contentDisplayContainer");
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
    await lessonFrame.waitForSelector(
      ".slideSummary[value='Student Instructions']",
      {
        visible: true,
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // Adding GoToCard Text
    const subinputfield = await lessonFrame.$(
      ".slideSummary[value='Student Instructions']"
    );
    await subinputfield.evaluate((input) => (input.value = ""));
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await lessonFrame.type(
      ".slideSummary[value='Student Instructions']",
      jsondata[0]?.Lesson[j]?.subModules[0]?.Title
    );
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await lessonFrame.waitForSelector(".coBody .contentObjectBody .editable");
    const [childinput] = await lessonFrame.$$(
      ".coBody .contentObjectBody .editable"
    );
    childinput?.focus();
    // Adding Image
    await lessonFrame.waitForSelector(".cke_button__sourcedialog");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await lessonFrame.evaluate(() => {
      const el = document.querySelectorAll(".cke_button__sourcedialog");
      if (el?.[2]) el[2].click();
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await lessonFrame.waitForSelector(".cke_dialog_ui_input_textarea");
    await lessonFrame.type(
      ".cke_dialog_ui_input_textarea",
      jsondata[0]?.Lesson[j]?.subModules[0]?.Content
    );
    await lessonFrame.waitForSelector(".cke_dialog_ui_button_ok");
    await lessonFrame.evaluate(() => {
      const el = document.querySelector(".cke_dialog_ui_button_ok");
      if (el) el.click();
    });
    // Click the Save Button
    await new Promise((resolve) => setTimeout(resolve, 4000));
    await lessonFrame.waitForSelector("#saveContentEditorButton", {
      visible: true,
    });
    await lessonFrame.evaluate(() => {
      const el = document.querySelector("#saveContentEditorButton");
      if (el) el.click();
    });
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // await lessonFrame.waitForSelector(".dialog-footer");
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    // await lessonFrame.evaluate(() => {
    //   const el = document.querySelector(".dialog-footer .saveButton");
    //   if (el) el.click();
    // });
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Passage Activity Module complete");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // }
  }
};
