## D.C. election results scraper

Use this Node.js tool to scrape election results for each D.C. precinct off of the D.C. Board of Elections results website. On election night, downloadable results are not available from the Board of Elections, so a scraper is handy for collecting the returns as they roll in.

This scraper works with the version of the Board of Elections [results site](https://www.dcboee.org/election_info/election_results/v3/2016/June-14-Primary-Election/) that debuted on June 14, 2016, when the 2016 Democratic primary was held.

To fork this scraper for future elections, create a new object in the `settings` object in the `config.js` file, then alter the value assigned to `exports.election`.

## Features

In addition to scraping the number of votes each candidate received in each precinct, this tool adds up:
- the total number of votes cast in each precinct in each race
- the total number of votes cast for each candidate in each race
- the total number of votes cast citywide in each race
This tool does not include "under votes" (ballots where no selection was made in the race) and "over votes" (ballots where too many selections were made in the race, rendering them invalid) in the totals that it calculates. In contrast, the Board of Elections does include under votes and over votes when displaying the percentage of total votes that each candidate received.

The scraper stores all the vote numbers in a JavaScript object, along with some metadata. When the scrape completes, the object is written to a JSON file in the `public` directory and also to a JSON file with a unique name in the `log` directory.

## Maps

The results from the 2016 Democratic primary can be seen on interactive maps [here](http://www.washingtoncitypaper.com/news/article/20782581/maps-results-from-dcs-2016-democractic-primary).

## Credits

This was created by Zach Rausnitz for Washington City Paper. It is based in part on [Chris Given's Ruby scraper](https://github.com/cmgiven/dcboe-scraper) for D.C. elections that worked with a version of the Board of Elections results site last used for D.C.'s 2015 special election.

## License

See LICENSE.