var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var config = require('./config.js');
var election = config.election,
	election_path = config.settings[election].election_path,
	races = config.settings[election].races;

var precinct = first_precinct = config.first_precinct,
	last_precinct = config.last_precinct;

var results = {}; // this object will be written to a JSON file when all scraping is done
for (var race in races) {
	results[races[race].race_name] = {};
	results[races[race].race_name]['TOTAL'] = {};
}
results.metadata = {};

var is_error_free = true,
	start_stamp = Date.now(),
	start_time = new Date;

(function scrape() {
	if (precinct <= last_precinct) {
		request('https://www.dcboee.org/election_info/election_results/v3/' + election_path + '?hdn_results_tab=p&hdn_precinct=' + precinct, function (error, response, html) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(html);
				if (precinct == 1) {
					results.metadata.precincts_reporting = $('.col-md-6:contains("Precincts Counted: ")').html().trim().split(': ')[1];
					console.log('Precincts reporting: ' + results.metadata.precincts_reporting);
				}
				console.log('Scraping precinct ' + precinct);
				for (var race in races) {
					var race_name = races[race].race_name;
					results[race_name]['p_' + precinct] = {};
					var this_precinct_total_votes = 0;
					for (var i = 0; i < races[race].candidates.length; i++) {
						var selector = 'table:contains("' + race_name + '") td:contains("' + races[race].candidates[i] + '")';
						var votes = null;
						if ($(selector).length) {
							votes = Number($(selector).next().html().replace(/\D/g,''));
						}
						if (votes != null) {
							this_precinct_total_votes += votes;
							results[race_name]['p_' + precinct][races[race].candidates[i]] = votes;
						}
					}
					results[race_name]['p_' + precinct]['Total'] = this_precinct_total_votes;
				}
			} else {
				console.log(error);
				is_error_free = false;
			}
			precinct++;
			scrape(); // scrape again once the current scrape has finished
		});
	} else {
		var end_stamp = Date.now(),
			end_time = new Date;

		results.metadata.start_time = start_time.toString();
		results.metadata.end_time = end_time.toString();
		results.metadata.scrape_duration = (end_stamp - start_stamp) / 1000 + ' seconds';
		results.metadata.races = races;

		for (var race in races) {
			var race_name = races[race].race_name;
			var candidates = races[race].candidates;
			for (var j = 0; j < candidates.length; j++) {
				results[race_name]['TOTAL'][candidates[j]] = 0;
			}
			var total_of_totals = 0;
			for (var i = first_precinct; i <= last_precinct; i++) {
				var precinct_results = results[race_name]['p_' + i];
				total_of_totals += precinct_results['Total'];
				for (var j = 0; j < candidates.length; j++) {
					if (precinct_results[candidates[j]]) {
						results[race_name]['TOTAL'][candidates[j]] += precinct_results[candidates[j]];
					}
				}
			}
			results[race_name]['TOTAL']['Total'] = total_of_totals;
		}

		if (is_error_free) {
			fs.writeFile('public/javascripts/results/scrape_' + election + '.json', JSON.stringify(results), function (err) {
				var scrape_message = err ? err : 'Scrape successful';
				console.log(scrape_message);
				fs.writeFile('log/scrape_' + start_stamp + '.json', JSON.stringify(results, null, '\t'), function (err) {
					var log_message = err ? err : 'Scrape logged';
					console.log(log_message);
				});
			});
		}
	}
}());