// const puppeteer = require('puppeteer');

// const scrapeStats = async (pageURL, pName) => {

//     const browser = await puppeteer.launch({
//         headless: false,
//         slowMo: 100
//     });

//     const page = await browser.newPage();

const scrapeStats = async (pageURL, page, pName) => {

        await page.goto(pageURL);

        // types player name in input field and submits
        await page.waitForSelector('input');
        await page.evaluate(
            (pName) => {
                window.pName = pName
            },
            pName
        );
        await page.$eval('input[name = "search"]', (search) => (search.value = window.pName));
        await page.click('input[type="submit"]');

        // clicks first link in results
        await page.click('#players > div.search-item > div.search-item-name > a')
        
        // scrapes per season data in main table
        await page.waitForSelector('#per_game > tbody > tr')

        const rows = await page.$$eval('#per_game > tbody > tr.full_table', rows => {
            console.log('inside rows $$eval')
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, column => column.innerText);
            })
        });

        // await browser.close();
        const teams = new Set();
        for (let row of rows) {
            // here we take the 2nd entry of each array
            teams.add(row[1]);
        }
        // console.log(teams);
        return [
            rows,
            teams
        ];


}

// scrape(pageURL).catch(console.error);
// };

module.exports = scrapeStats;