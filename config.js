var settings = {
	'2016_primary' : {
		'election_path':'2016/June-14-Primary-Election',
		'races' : {
			'ward_four': {
				'race_name': 'MEMBER OF THE COUNCIL WARD FOUR',
				'candidates': ['Leon T. Andrews, Jr.', 'Ron Austin', 'Calvin H. Gurley', 'Brandon Todd', 'WRITE-IN'],
				'shortened_names': {
					'Leon T. Andrews, Jr.': 'Andrews',
					'Ron Austin': 'Austin',
					'Calvin H. Gurley': 'Gurley',
					'Brandon Todd': 'Todd'
				}
			},
			'ward_seven': {
				'race_name': 'MEMBER OF THE COUNCIL WARD SEVEN',
				'candidates': ['Yvette M. Alexander', 'Delmar Chesley', 'Vincent C. Gray', 'Grant Thompson', 'WRITE-IN'],
				'shortened_names': {
					'Yvette M. Alexander': 'Alexander',
					'Delmar Chesley': 'Chesley',
					'Vincent C. Gray': 'Gray',
					'Grant Thompson': 'Thompson'
				}
			},
			'ward_eight': {
				'race_name': 'MEMBER OF THE COUNCIL WARD EIGHT',
				'candidates': ['Maurice T. Dickens', 'Bonita Goode', 'Aaron Holmes', 'LaRuby May', 'Trayon "Ward Eight" White', 'WRITE-IN'],
				'shortened_names': {
					'Maurice T. Dickens': 'Dickens',
					'Bonita Goode': 'Goode',
					'Aaron Holmes': 'Holmes',
					'LaRuby May': 'May',
					'Trayon "Ward Eight" White': 'White'
				}
			},
			'at_large': {
				'race_name': 'AT-LARGE MEMBER OF THE COUNCIL',
				'candidates': ['David Garber', 'Vincent Orange', 'Robert White', 'WRITE-IN'],
				'shortened_names': {
					'David Garber': 'Garber',
					'Vincent Orange': 'Orange',
					'Robert White': 'White'
				}
			},
			'president': {
				'race_name': 'DEMOCRATIC PRESIDENTIAL PREFERENCE',
				'candidates': ['Hillary Clinton', 'Bernie Sanders', '"Rocky" Roque De La Fuente', 'WRITE-IN'],
				'shortened_names': {
					'Hillary Clinton': 'Clinton',
					'Bernie Sanders': 'Sanders',
					'"Rocky" Roque De La Fuente': 'De La Fuente'
				}

			}
		}
	}
};

exports.settings = settings;
exports.election = '2016_primary', exports.first_precinct = 1, exports.last_precinct = 143;