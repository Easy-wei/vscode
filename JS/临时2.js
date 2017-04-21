math_visuals["quadratic"] = {
	//when use the function of math_visuals.quadratic, you need test the number of answer : 1 or 2',
	str: function (a, b, c) { //
		var k = math.pow(b, 2) - 4 * a * c;
		if (k > 0) {
			var k1 = math_visuals.root.integer_part(k);
			var k2 = math_visuals.root.sqrt_part(k);
			var com = math.gcd(b, k1, 2 * a);
			if (math.pow(k1, 2) == k) {
				return [math_visuals.fraction.str((-b + k1), 2 * a), math_visuals.fraction.str((-b - k1), 2 * a)];
			}
			b = b / com;
			k1 = k1 / com;
			var k3 = math.abs(a * 2 / com);
			return (a > 0) ? (k3 == 1) ? [(-b) + math_visuals.num_form.body(k1) + k2, (-b) + math_visuals.num_form.body(-k1) + k2] : [`\\dfrac{` + (-b) + math_visuals.num_form.body(k1) + k2 + `}{` + k3 + `}`, `\\dfrac{` + (-b) + math_visuals.num_form.body(-k1) + k2 + `}{` + k3 + `}`] :
				(k3 == 1) ? [(b) + math_visuals.num_form.body(-k1) + k2, (b) + math_visuals.num_form.body(k1) + k2] : [`\\dfrac{` + (-b) + math_visuals.num_form.body(k1) + k2 + `}{` + k3 + `}`, `\\dfrac{` + (b) + math_visuals.num_form.body(k1) + k2 + `}{` + k3 + `}`];
		} else if (k === 0) {
			return [math_visuals.fraction.str(-b, 2 * a)];
		}
	},
	tex: function (a, b, c) {
		return tex(math_quadratic.str(a, b, c));
	},
};