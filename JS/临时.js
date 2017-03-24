num_form = {
	head: function (x) {
		return (x == 1) ? `` : (x == -1) ? `-` : x;
	},
	body: function (x) {
		return (x == 1) ? `+` : (x == -1) ? `-` : x.signed();
	},
	end: function (x) {
		return (x === 0) ? `` : (x).signed();
	},
	index: function (x) {
		return (x == 1) ? `` : x;
	},
};

function polynomial() {
	var array = Array.prototype.slice.call(arguments);
	var a;
	array[0] = num_form.head(array[0]);
	for (var i = 1; i < array.length - 1; i++) {
		array[i] = num_form.body(array[i])+`x^{`+num_form.index(array.length-1-i)+`}`;
	}
}