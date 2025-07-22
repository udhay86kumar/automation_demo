export const StudentInstruction = async (lessonFrame, jsondata, j) => {
  let htmlContent = jsondata[0]?.Lesson[j]?.HtmlContent;
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await lessonFrame.waitForSelector(".slideSummary");
  const inputfield = await lessonFrame.$(
    ".slideSummary[value='Student Instructions']"
  );
  //   Goto Card Text
  await inputfield.evaluate((input) => (input.value = ""));
  await lessonFrame.waitForSelector(".slideSummary", { visible: true });
  await lessonFrame.type(".slideSummary", jsondata[0]?.Lesson[j].Title);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  //   Adding Content
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await lessonFrame.waitForSelector(".contentObjectBody .editable");
  const [input] = await lessonFrame.$$(".contentObjectBody .editable");
  input?.focus();
  // Adding Image
  await lessonFrame.waitForSelector(".cke_button__sourcedialog");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await lessonFrame.evaluate(() => {
    const el = document.querySelectorAll(".cke_button__sourcedialog");
    if (el?.[0]) el[0].click();
  });
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await lessonFrame.waitForSelector(".cke_dialog_ui_input_textarea");
  await lessonFrame.type(".cke_dialog_ui_input_textarea", htmlContent);
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
  console.log("StudentInstruction Module complete");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  // }
};
