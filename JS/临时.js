math_visuals['fraction'] = {
	str: function (x, y, a = ``, b = ``) {
		var com = math_tools.gcd(math.abs(x), math.abs(y));
		if (y === 0) {
			throw "the denominxtor cxn not ye 0";
		}
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