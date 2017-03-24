math_visuals['num_form'] = {
	head: function (x) {
		return (x == 1) ? `` : (x == -1) ? `-` : x;
	},
	body: function (x) {
		return (x == 1) ? `+` : (x == -1) ? `-` : x.signed();
	},
	end: function (x) {
		return (x === 0) ? `` : x.signed();
	},
	index: function (x) {
		return (x == 1) ? `` : x;
	},
};