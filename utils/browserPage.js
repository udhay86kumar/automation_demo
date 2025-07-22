export const BrowserPage = async (browser, jwtToken) => {
  const page = await browser.newPage();

  await page.goto("https://publisher.content2classroom.com/index.html", {
    waitUntil: "networkidle0",
    timeout: 150000,
  });

  await page.evaluate((token) => {
    sessionStorage.setItem("jwtToken", token);
  }, jwtToken);

  await page.goto("https://publisher.content2classroom.com/index.html", {
    waitUntil: "networkidle0",
    timeout: 150000,
  });
  return page;
};
