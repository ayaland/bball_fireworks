const puppeteer = require('puppeteer');

const scrape = async (pageURL, pName) => {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 500
    });

    const page = await browser.newPage();

    try {
        await page.goto(pageURL);

        // types player name in input field and submits
        await page.waitForSelector('input');
        await page.evaluate(
            (pName) => {
                window.pName = pName
            },
            pName
        );
        await page.$eval('input[name = search', (search) => (search.value = window.pName));
        await page.click('input[type="submit"]');

        // clicks first link in results
        await page.click('#players > div.search-item > div.search-item-name > a')
        
        // scrapes per season data in main table
        await page.waitForSelector('#per_game > tbody');
        let rows = await page.$$eval('#per_game > tbody > tr', rows => {
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, column => column.innerText);
            })
        });
        // console.log(rows);
        await browser.close();
        
        for (let season of rows) {
            console.log(season[1]);
        }
        return rows;
    }
    
    catch (e) {
        console.log(e);
    }

// scrape(pageURL).catch(console.error);
};

module.exports = scrape;