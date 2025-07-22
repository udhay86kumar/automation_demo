import puppeteer from "puppeteer";

export const LaunchBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 60000,
    args: ["--start-fullscreen", "--window-size=1920,1080"],
    // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        executablePath: '/usr/bin/google-chrome',

    headless: false,
    defaultViewport: null,
    slowMo: 10,
    devtools: false,
  });
  return browser;
};
