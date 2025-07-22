export const MultipleChoice = async (lessonFrame, jsondata, page, j) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  await lessonFrame.waitForSelector(".slideSummary");
  const inputfield = await lessonFrame.$(
    ".slideSummary[value='MultipleChoice']"
  );
  //   Goto Card Text
  await inputfield.evaluate((input) => (input.value = ""));
  await lessonFrame.waitForSelector(".slideSummary", { visible: true });
  await lessonFrame.type(".slideSummary", jsondata[0]?.Lesson[j].Title);
  await new Promise((resolve) => setTimeout(resolve, 3000));
    // Adding Content
  await QuestionFrame.waitForSelector(".testItemStem .editable");
  const [input] = await QuestionFrame.$$(".testItemStem .editable");
  input?.focus();
  await lessonFrame.waitForSelector(".cke_button__ogmentimage");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await lessonFrame.evaluate(() => {
    const el = document.querySelectorAll(".cke_button__ogmentimage");
    if (el?.[1]) el[1].click();
  });
 
};