const scrapeStats = async (pageURL, page, pName) => {

        await page.goto(pageURL);
        // console.log('scrapeStats')

        // types player name in input field and submits
        await page.waitForSelector('input');
        await page.evaluate(
            (pName) => {
                window.pName = pName
            },
            pName
        );
        await page.$eval('input[name = "search"]', 
            (search) => (search.value = window.pName));
        await page.click('input[type="submit"]');

        // clicks first link in results if there are any
        if ((await page.$('#players > div.search-item > div.search-item-name > a')) !== null) {
            console.log('found link')
            await page.evaluate(() => document.querySelector('#players > div.search-item > div.search-item-name > a').click())
        }
        
        // some players do not have links page, goes directly to stats
        
        // scrapes per season data in main table
        await page.waitForSelector('#per_game > tbody > tr')

        const rows = await page.$$eval('#per_game > tbody > tr.full_table', rows => {
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('th, td');
                return Array.from(columns, column => column.innerText);
            })
        });

        // create a new object of all teams player played for
        // this will be used in the team colors object
        const teams = new Set();
        for (let row of rows) {
            // here we take the 3rd entry of each array
            teams.add(row[2]);
        }
        // console.log(rows)
        return [
            rows,
            teams
        ];


}
// };

module.exports = scrapeStats;