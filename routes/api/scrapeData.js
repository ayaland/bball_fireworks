const puppeteer = require('puppeteer');

const scrape = async (pageURL, colorsURL, pName) => {

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100
    });

    const page = await browser.newPage();
    // const page = await browser.goto(pageURL);

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
        await page.waitForSelector('#per_game > tbody > tr')
        // .then (() => {
            // console.log("selector found");
            // let rows = await page.$$eval('#per_game > tbody > tr', rows => {
            //     return Array.from(rows, row => {
            //         const columns = row.querySelectorAll('td');
            //         return Array.from(columns, column => column.innerText);
            //     })
            // })
        // });
        let rows = await page.$$eval('#per_game > tbody > tr', rows => {
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, column => column.innerText);
            })
        })
        // await page.goto(colorsURL);

    
        // console.log(rows);
        // await browser.close();
        const teams = new Set();
        for (let season of rows) {
            teams.add(season[1]);
        }
        console.log(teams);
        return rows;
    }
    
    catch (e) {
        console.log(e);
    }

// scrape(pageURL).catch(console.error);
};

module.exports = scrape;