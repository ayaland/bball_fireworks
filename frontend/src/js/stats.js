// const puppeteer = require('puppeteer');

// const scrape = async () => {
//     const browser = await puppeteer.launch({
//         headless: false,
//         slowMo: 500
//     });
//     const page = await browser.newPage();
//     await page.goto('http://www.basketball-reference.com');
    
//     await page.waitFor('input[name=search]');
    
//     await page.$eval('input[name = search]', nameField => nameField.value = pName);
//     await page.click('input[type="submit"]');
//     await page.waitForSelector('#totals')
//     // await browser.close();
// };

// module.exports = scrape;