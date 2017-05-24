frac = {
	str: function (a, b) {
		var com = math_tools.gcd(math.abs(a), math.abs(b));
		if (b === 0) {
			throw "the denominator can not be 0";
		}
		a = a / com;
		b = b / com;
		var j = math.abs(a) % math.abs(b);
		var k = (math.abs(a) - math.abs(j)) / math.abs(b);
		return (a * b >= 0) ? (j === 0) ? k : `\\dfrac{` + math.abs(a) + `}{` + math.abs(b) + `}` :
			(j === 0) ? -k : `-\\dfrac{` + math.abs(a) + `}{` + math.abs(b) + `}`;
	},
	body: function (a, b) {
		if (a == b) {
			return `+`;
		} else if (a == -b) {
			return `-`;
		} else if (a * b > 0) {
			return `+` + frac.str(a, b);
		} else {
			return frac.str(a, b);
		}
	},
	end: function (a, b) {
		if (a === 0) {
			return ``;
		} else if (a * b > 0) {
			return `+` + frac.str(a, b);
		} else {
			return frac.str(a, b);
		}
	}
};