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