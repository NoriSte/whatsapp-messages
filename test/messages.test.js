/*
funziona anche con contatti con i quali non si ha mai chattato
*/

const puppeteer = require("puppeteer");
require("pptr-testing-library/extend");
let browser;
let page;

const config = {
  findInputTitle: "Cerca o inizia una nuova chat"
};

const messages = [
  [
    "Valentina Menaballi",
    `Ciao amore!!

anche oggi farai parte di alcuni test 😁`
  ],
  [
    "Antonio Riva",
    `Riceverai un pò di messaggi automatici da parte mia Ravio, non ti preoccupare e ignora questi messaggi, poi ti spiegherò 😁`
  ]
];

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    userDataDir: ".tmp"
    // executablePath: "/Applications/Google Chrome.app"
  });
  page = await browser.newPage();
});
afterAll(async () => {
  // await page.close();
  // await browser.close();
});

describe(`Whatsapp messages`, () => {
  test(`The user authorizes Whatsapp Web`, async () => {
    await page.goto(`https://web.whatsapp.com`);
    await page.waitForSelector(`input[title="${config.findInputTitle}"]`, { timeout: 0 });
  }, 60000);
  describe.each(messages)("Message to %s", (user, message) => {
    test(`The user exists`, async () => {
      await page.focus(`input[title="${config.findInputTitle}"]`);
      await page.evaluate(
        selector => (document.querySelector(selector).value = ""),
        `input[title="${config.findInputTitle}"]`
      );
      await page.type(`input[title="${config.findInputTitle}"]`, user);
      await page.waitForSelector(`span[title="${user}"]`, { timeout: 2000 });
      await page.click(`span[title="${user}"]`);
    }, 5000);
  });
});
