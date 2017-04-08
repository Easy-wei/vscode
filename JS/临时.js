
		if (x ==0 ) {return 0}
		x = x / com;
		y = y / com;
		var j = math.abs(x) % math.abs(y);
		var k = (math.abs(x) - math.abs(j)) / math.abs(y);
		return (x * y > 0) ? (j === 0) ? (b == ``) ? k + a : `\\dfrac{` + k + a + `}{` + b + `}` :
			`\\dfrac{` + math.abs(x) + a + `}{` + math.abs(y) + b + `}` :
			(j === 0) ? (b == ``) ? `-` + k + a : `\\dfrac{` + k + a + `}{` + b + `}` : `-\\dfrac{` + math.abs(x) + `}{` + math.abs(y) + `}`;
	},
	tex: function (x, y) {
		return tex(math_visuals.fraction.str(x, y));
	},
};

function polynomial() {
	var array = Array.prototype.slice.call(arguments);
	var array_to_str;
	for (var j = 0; j < array.length - 1; j++) {
		if (array[0] === 0) {
			array.splice(0, 1);
			if (typeof (array[0]) == 'string') {
				array.splice(0, 1);
			}
		} else break;
	}
	array[0] = ((typeof (array[0]) == 'string') ? array[0] : math_visuals.num_form.head(array[0]));
	for (var i = 1; i < array.length; i++) {
		if (typeof (array[i]) == 'number') {
			if (typeof (array[i + 1]) == `string`) {
				if (array[i] === 0) {
					array[i] = ``;
					if (typeof (array[i + 1]) == 'string') {
						array[i + 1] = ``;
					}
				} else {
					array[i] = math_visuals.num_form.body(array[i]);
				}
			} else array[i] = math_visuals.num_form.end(array[i]);
		}
	}
	array_to_str = array.join(``);
	return array_to_str;
}

