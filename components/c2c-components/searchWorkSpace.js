export const SearchWorkSpace = async (jsondata, page) => {
  const workspaceName = jsondata[0].WorkspaceName;

  await new Promise((resolve) => setTimeout(resolve, 2000));
  await page.waitForSelector("#searchTerms");
  await page.type("#searchTerms", workspaceName);
  await page.waitForSelector(`.resourceCardName[title='${workspaceName}']`, {
    visible: true,
  });
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await page.click(`.resourceCardName[title='${workspaceName}']`);
  // Enter into the workspace
  await page.waitForSelector("iframe");
  const iframeElement = await page.$("iframe");
  const frame = await iframeElement.contentFrame();
  if (!frame) throw new Error("iframe content not found");
  return frame;
};
