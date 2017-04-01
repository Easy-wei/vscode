function polynomial() {
	var array = Array.prototype.slice.call(arguments);
	var array_to_str;
	if (array[0] === 0) {
		array.splice(0, 1);
		i -= 1;
		if (typeof (array[0]) == 'string') {
			array.splice(0, 1);
			i -= 1;
		}
	}
	array[0] = ((typeof (array[0]) == 'string') ? array[0] : math_visuals.num_form.head(array[0]))
	for (var i = 1; i < array.length - 1; i++) {
		array[i] = ((typeof (array[0]) == 'string') ? array[i] : (array[i] === 0) ? (`` && array[i + 1] = ``) : math_visuals.num_form.body(array[i]));
	}
	array[array.length - 1] = ((typeof (array[array.length - 1]) == 'string') ? array[array.length - 1] : math_visuals.num_form.end(array[array.length - 1]))
	array_to_str = array.join(``);
	return array_to_str;
}