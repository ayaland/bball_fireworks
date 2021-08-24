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
        
        // regex used here because the tables are named differently for NBA and WNBA players
        await page.waitForSelector('[id^="per_game"] > tbody > tr.full_table')
        
        // scrapes headings of stats table since they are both different AND 
        // in different order for NBA and WNBA players
        const tableHeadings = await page.$$eval('[id^="per_game"] > thead > tr', rows => {
            return Array.from(rows, row => {
                const heads = row.querySelectorAll('th');
                return Array.from(heads, head => head.innerText)
            })
        })
        const headings = tableHeadings[0];
        
        // scrapes per season data in main table
        const rows = await page.$$eval('[id^="per_game"] > tbody > tr.full_table', rows => {
            console.log('inside rows')
            return Array.from(rows, row => {
                const columns = row.querySelectorAll('th, td');
                return Array.from(columns, column => column.innerText);
            })
        });

        // create a new object of all teams player played for
        // this will be used in the team colors object
        const teams = new Set();
        
        // the table head of a WNBA player reads 'Team' for team
        // the table head of an NBA player reads 'Tm' for team
        // because fuck you, that is why
        let league;
        if (headings.indexOf('Team') !== -1) {
            // take the entry of each array under 'Team' or 'Tm'
            const teamIndex = headings.indexOf('Team')
            league = 'WNBA';
            for (let row of rows) {
                teams.add(row[teamIndex])
            }
        } else if (headings.indexOf('Tm') !== -1) {
            const teamIndex = headings.indexOf('Tm')
            league = 'NBA'
            for (let row of rows) {
                teams.add(row[teamIndex])
            }
        }

        return {
            'seasons': rows,
            'headings': headings,
            'teams': teams,
            'league': league,
        };


}

module.exports = scrapeStats;