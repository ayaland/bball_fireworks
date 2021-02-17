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
        await page.$eval('input[name = "search"]', 
            (search) => (search.value = window.pName));
        await page.click('input[type="submit"]');

        // some players do not have links page, goes directly to stats
        // await page.waitForNavigation({ waitUntil: 'networkidle0' });

        // clicks first link in results
        await page.click('#players > div.search-item > div.search-item-name > a')
        
        // scrapes per season data in main table
        await page.waitForSelector('#per_game > tbody > tr')

        const rows = await page.$$eval('#per_game > tbody > tr.full_table', rows => {
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, column => column.innerText);
            })
        });

        const teams = new Set();
        for (let row of rows) {
            // here we take the 2nd entry of each array
            teams.add(row[1]);
        }

        return [
            rows,
            teams
        ];


}
// };

module.exports = scrapeStats;