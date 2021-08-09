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

        // players with international and coaching careers have multiple results tabs
        // these tabs are in different order for NBA and WNBA players (╯°□°）╯︵ ┻━┻
        if ((await page.$('div.search-item > div.search-item-name > a')) !== null) {
            if ((await page.$('#wnba_players-tab > a')) !== null) {
                await page.evaluate(() => document.querySelector('#wnba_players-tab > a').click())
                await page.waitForSelector('#wnba_players > div.search-item > div.search-item-name > strong > a')
                await page.evaluate(() => document.querySelector('#wnba_players > div.search-item > div.search-item-name > strong > a').click())
            } else {
                await page.evaluate(() => document.querySelector('.search-item-name > a').click())
            }
        }
        
        // scrapes per season data in main table
        // await page.waitForSelector('#per_game > tbody > tr')
        await page.waitForSelector('[id^="per_game"] > tbody > tr.full_table')

        const tableHeadings = await page.$$eval('[id^="per_game"] > thead > tr', rows => {
            return Array.from(rows, row => {
                const heads = row.querySelectorAll('th');
                return Array.from(heads, head => head.innerText)
            })
        })

        // regex used here because the tables are named differently for NBA and WNBA players
        const rows = await page.$$eval('[id^="per_game"] > tbody > tr.full_table', rows => {
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('th, td');
                return Array.from(columns, column => column.innerText);
            })
        });

        // create a new object of all teams player played for
        // this will be used in the team colors object
        const teams = new Set();
        const headings = tableHeadings[0];
        // console.log('headings: ')
        // console.log(headings)
        
        // the table head of a WNBA player reads 'Team' for team
        // the table head of an NBA player reads 'Tm' for team
        // because fuck you, that is why
        if (headings.indexOf('Team') !== -1) {
            console.log('Team')
            // take the entry of each array under 'Team' or 'Tm'
            const teamIndex = headings.indexOf('Team')
            console.log(teamIndex)
            for (let row of rows) {
                console.log(row)
                teams.add(row[teamIndex])
            }
        } else if (headings.indexOf('Tm') !== -1) {
            console.log('Tm')
            const teamIndex = headings.indexOf('Tm')
            console.log(teamIndex)
            for (let row of rows) {
                console.log(row)
                teams.add(row[teamIndex])
            }
        }

        console.log(teams)
        // for (let row of rows) {
            // teams.add(row(teamIndex));
        // }
        // console.log(rows)
        return [
            rows,
            headings,
            teams
        ];


}
// };

module.exports = scrapeStats;