Number.prototype.signed = function () {
	return (this < 0 ? "" + this : "+" + this);
};

get_vmin = function () {
	return Math.min(Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 100, Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 100);
}
get_vh = function () {
	return Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 100;
}
get_vw = function () {
	return Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 100;
}

term = function (input, type) {
	var self = this;
	self.value = math.complex(input);
	self.type = (typeof type == "undefined" ? "" : type);

	self.__defineGetter__('r', function () {
		return self.value.re;
	});
	self.__defineGetter__('i', function () {
		return self.value.im;
	});
	self.__defineGetter__('t', function () {
		return self.type;
	});
	self.__defineGetter__('real', function () {
		return (self.value.im < 0.0000000001 && self.value.im > -0.0000000001);
	});
	self.__defineGetter__('str', function () {
		return self.toString();
	});
	self.__defineGetter__('sign', function () {
		return self.toString();
	});

	self.valueOf = function () {
		return self.value;
	}

	self.toString = function () {
		if (typeof self.value == "number") {
			return math_tools.round(self.value, 2).toString() + self.type;
		} else {
			return math.complex(math_tools.round(self.value.re, 2), math_tools.round(self.value.im, 2)).toString() + self.type;
		}
	}

	// Add
	self.a = function () {
		var res = this.value;
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i].value === "undefined") {
				res = math.add(res, arguments[i]);
			} else {
				res = math.add(res, arguments[i].value);
			}
		}
		return new term(res);
	};

	// Subtract
	self.s = function () {
		var res = this.value;
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i].value === "undefined") {
				res = math.subtract(res, arguments[i]);
			} else {
				res = math.subtract(res, arguments[i].value);
			}
		}
		return new term(res);
	};

	// Multiply
	self.m = function () {
		var res = this.value;
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i].value === "undefined") {
				res = math.multiply(res, arguments[i]);
			} else {
				res = math.multiply(res, arguments[i].value);
			}
		}
		return new term(res);
	};

	// Divide
	self.d = function () {
		var res = this.value;
		for (var i = 0; i < arguments.length; i++) {
			if (typeof arguments[i].value === "undefined") {
				res = math.divide(res, arguments[i]);
			} else {
				res = math.divide(res, arguments[i].value);
			}
		}
		return new term(res);
	};

	// Power
	self.p = function (power) {
		power = (power instanceof term ? power : new term(power));
		return new term(math.pow(this.value, power.value));
	}

	// Root
	self.root = function (root) {
		root = (typeof root === "undefined" ? new term(2) : root);
		root = (root instanceof term ? root : new term(root));
		return self.p(1 / root);
	}

	// Get the sign of the number
	self.signed = function () {
		if (typeof self.value == "number") {
			if (self.value == 0) {
				return "";
			}
			return self.value.signed();
		} else {
			if (self.value.re > 0) {
				var r = "+" + self.value.re;
			} else if (self.value.re == 0) {
				var r = ""
			} else {
				var r = "" + self.value.re;
			}
			if (self.value.im == 1) {
				var i = "+";
			} else if (self.value.im == -1) {
				var i = "-"
			} else if (self.value.im > 0) {
				var i = "+" + self.value.im;
			} else if (self.value.im == 0) {
				var i = ""
			} else {
				var i = "" + self.value.im;
			}

			if (r == "") {
				return i + "i";
			} else if (i != "") {
				return r + "" + i + "i";
			} else {
				return r;
			}
		}
	}
}

var expression = function (input) {
	var self = this;
	self.value = input;
	self.vars = self.value.match(/{(.)}/g);
	if (self.vars === null) {
		throw ('No variables found in expression, use term() instead.');
	}
	self.vars = $.unique(self.vars);
	for (key in self.vars) {
		self.vars[key] = self.vars[key].substring(1, 2);
	}

	self.__defineGetter__('str', function () {
		return self.toString();
	});

	self.toString = function () {
		return self.value;
	}

	self.eval = function (vars) {
		var temp = self.value;
		for (key in vars) {
			temp = temp.replace(new RegExp('{' + key + '}', 'g'), '(' + vars[key] + ')');
		}
		if (temp.indexOf('{') > -1) {
			throw ('Not all variable values declared');
		}
		return new term(math.eval(temp));
	}
}

terms_to_string = function () {
	var result = "";

	for (key in arguments) {
		var arg = (typeof arguments[key] == "number" ? new term(arguments[key]) : arguments[key]);
		var r = arg.value.re;
		var i = arg.value.im;
		var t = arg.type;
		var res = "";
		var parenthesis = (r != 0 && i != 0 && t != "");

		if (r != 0) {
			res += ((!parenthesis && result != "") && r > 0 ? "+" : "") + r + ("parenthesis" ? "" : t);
		}

		if (i != 0) {
			res += (result != "" && i > 0 ? "+" : "") + i + "i" + ("parenthesis" ? "" : t);
		}

		result += (parenthesis ? (result != "" && r > 0 ? "+" : "") + "(" + res + ")" + t : res);
	}

	return result;
}

var math_tools = {
	primes: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989, 4001, 4003, 4007, 4013, 4019, 4021, 4027, 4049, 4051, 4057, 4073, 4079, 4091, 4093, 4099, 4111, 4127, 4129, 4133, 4139, 4153, 4157, 4159, 4177, 4201, 4211, 4217, 4219, 4229, 4231, 4241, 4243, 4253, 4259, 4261, 4271, 4273, 4283, 4289, 4297, 4327, 4337, 4339, 4349, 4357, 4363, 4373, 4391, 4397, 4409, 4421, 4423, 4441, 4447, 4451, 4457, 4463, 4481, 4483, 4493, 4507, 4513, 4517, 4519, 4523, 4547, 4549, 4561, 4567, 4583, 4591, 4597, 4603, 4621, 4637, 4639, 4643, 4649, 4651, 4657, 4663, 4673, 4679, 4691, 4703, 4721, 4723, 4729, 4733, 4751, 4759, 4783, 4787, 4789, 4793, 4799, 4801, 4813, 4817, 4831, 4861, 4871, 4877, 4889, 4903, 4909, 4919, 4931, 4933, 4937, 4943, 4951, 4957, 4967, 4969, 4973, 4987, 4993, 4999, 5003, 5009, 5011, 5021, 5023, 5039, 5051, 5059, 5077, 5081, 5087, 5099, 5101, 5107, 5113, 5119, 5147, 5153, 5167, 5171, 5179, 5189, 5197, 5209, 5227, 5231, 5233, 5237, 5261, 5273, 5279, 5281, 5297, 5303, 5309, 5323, 5333, 5347, 5351, 5381, 5387, 5393, 5399, 5407, 5413, 5417, 5419, 5431, 5437, 5441, 5443, 5449, 5471, 5477, 5479, 5483, 5501, 5503, 5507, 5519, 5521, 5527, 5531, 5557, 5563, 5569, 5573, 5581, 5591, 5623, 5639, 5641, 5647, 5651, 5653, 5657, 5659, 5669, 5683, 5689, 5693, 5701, 5711, 5717, 5737, 5741, 5743, 5749, 5779, 5783, 5791, 5801, 5807, 5813, 5821, 5827, 5839, 5843, 5849, 5851, 5857, 5861, 5867, 5869, 5879, 5881, 5897, 5903, 5923, 5927, 5939, 5953, 5981, 5987, 6007, 6011, 6029, 6037, 6043, 6047, 6053, 6067, 6073, 6079, 6089, 6091, 6101, 6113, 6121, 6131, 6133, 6143, 6151, 6163, 6173, 6197, 6199, 6203, 6211, 6217, 6221, 6229, 6247, 6257, 6263, 6269, 6271, 6277, 6287, 6299, 6301, 6311, 6317, 6323, 6329, 6337, 6343, 6353, 6359, 6361, 6367, 6373, 6379, 6389, 6397, 6421, 6427, 6449, 6451, 6469, 6473, 6481, 6491, 6521, 6529, 6547, 6551, 6553, 6563, 6569, 6571, 6577, 6581, 6599, 6607, 6619, 6637, 6653, 6659, 6661, 6673, 6679, 6689, 6691, 6701, 6703, 6709, 6719, 6733, 6737, 6761, 6763, 6779, 6781, 6791, 6793, 6803, 6823, 6827, 6829, 6833, 6841, 6857, 6863, 6869, 6871, 6883, 6899, 6907, 6911, 6917, 6947, 6949, 6959, 6961, 6967, 6971, 6977, 6983, 6991, 6997, 7001, 7013, 7019, 7027, 7039, 7043, 7057, 7069, 7079, 7103, 7109, 7121, 7127, 7129, 7151, 7159, 7177, 7187, 7193, 7207, 7211, 7213, 7219, 7229, 7237, 7243, 7247, 7253, 7283, 7297, 7307, 7309, 7321, 7331, 7333, 7349, 7351, 7369, 7393, 7411, 7417, 7433, 7451, 7457, 7459, 7477, 7481, 7487, 7489, 7499, 7507, 7517, 7523, 7529, 7537, 7541, 7547, 7549, 7559, 7561, 7573, 7577, 7583, 7589, 7591, 7603, 7607, 7621, 7639, 7643, 7649, 7669, 7673, 7681, 7687, 7691, 7699, 7703, 7717, 7723, 7727, 7741, 7753, 7757, 7759, 7789, 7793, 7817, 7823, 7829, 7841, 7853, 7867, 7873, 7877, 7879, 7883, 7901, 7907, 7919]
};

math_tools["primes_below"] = function (number) {
	if (number > math_tools.primes[math_tools.primes.length - 1]) {
		throw ('Max size this function supports is ' + (math_tools.primes[math_tools.primes.length - 1]) + '.');
	}
	var i = 0;
	while (math_tools.primes[i] < number) {
		i += 1;
	}
	return math_tools.primes.slice(0, i);
}

math_tools["rand_int"] = function (min, max, exclude) {
	exclude = (typeof exclude === "undefined" ? [] : exclude);
	var res = Math.floor(Math.random() * (max - min + 1 - exclude.length)) + min;
	return (exclude.indexOf(res) > -1 ? max - exclude.indexOf(res) : res);
};

math_tools["rand_term"] = function (min, max, exclude) {
	return new term(math_tools.rand_int(min, max, exclude));
};

// Negative numbers round up (-7.5 -> -7)
math_tools["round"] = function (number, decimals) {
	if (decimals == null) {
		decimals = 0;
	}
	return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

// Negative numbers round down
math_tools["round_away"] = function (number, decimals) {
	var sign = 1 - 2 * (number < 0);
	return sign * math_tools.round(sign * number, decimals);
};

math_tools["quadratic"] = function (a, b, c) {
	if (typeof a === "number") {
		a = new term(a);
	}
	if (typeof b === "number") {
		b = new term(b);
	}
	if (typeof c === "number") {
		c = new term(c);
	}
	var det = b.p(2).s(a.m(4, c)).p(0.5).d(2, a);
	return [b.m(-1).d(2, a).a(det), b.m(-1).d(2, a).s(det)];
};

math_tools['polynomial'] = function () {
	return PolyReSolve(arguments);
}

math_tools["eigen_values"] = function (a, b, c, d) {
	if (typeof a === "number") {
		a = new term(a);
	}
	if (typeof b === "number") {
		b = new term(b);
	}
	if (typeof c === "number") {
		c = new term(c);
	}
	if (typeof d === "number") {
		d = new term(d);
	}
	return math_tools.quadratic(1, a.m(-1).a(d.m(-1)), a.m(-1).m(d.m(-1)).s(b.m(-1).m(c.m(-1))));
};

math_tools["gcd"] = function (a, b) {
	if (!b) {
		return a;
	}
	return math_tools.gcd(b, a % b);
};

var math_visuals = {}

math_visuals['fraction'] = {
	str: function (a, b) {
		var com = math_tools.gcd(math.abs(a), math.abs(b));
		if (b === 0) {
			throw "the denominator can not be 0";
		}
		a = a / com;
		b = b / com;
		var j = math.abs(a) % math.abs(b);
		var k = (math.abs(a) - math.abs(j)) / math.abs(b);
		return (a * b >= 0) ? (j === 0) ? `` + k : `\\dfrac{` + math.abs(a) + `}{` + math.abs(b) + `}` :
			(j === 0) ? `-` + k : `-\\dfrac{` + math.abs(a) + `}{` + math.abs(b) + `}`;
	},
	tex: function (a, b) {
		return tex(math_visuals.fraction.str(a, b));
	},
};


math_tools['ngcd'] = function () {
	var arry = Array.prototype.slice.call(arguments);
	var a = arry[0];
	for (var i = 0; i < arry.length; i++) {
		if (arry[i] == 1 || arry[i] === 0) {
			return 1;
		}
		a = math_tools.gcd(math.abs(arry[i]), a);
	}
	return a;
};

math_visuals.root = {
	process: function (n = ` n`) {
		var a = 1;
		var b = 1;
		if (typeof n === "string") {
			return [`\\sqrt{` + n + `}`, a, `\\sqrt{` + n + `}`];
		}
		if (n == 1) {
			return [1, 1, 1 + ``];
		}
		if (n === 0) {
			return [0, 0, 0 + ``];
		}
		var arry = math_tools.primes_below(math.ceil(math.sqrt(n) + 1));
		var arry2 = [];
		for (var i = 0; i < arry.length; i++) {
			for (var m = 0; m < n; m++) {
				if (n % (arry[i] * arry[i]) === 0) {
					arry2.push(arry[i]);
					n = n / (arry[i] * arry[i]);
				} else {
					break;
				}
			}
		}
		if (arry2.length === 0) {
			return [`\\sqrt{` + n + `}`, a, `\\sqrt{` + n + `}`];
		} else {
			for (var j = 0; j < arry2.length; j++) {
				b = arry2[j];
				a = a * b;
			}
			return (n == 1) ? [a, a, 1] : [a + `\\sqrt{` + n + `}`, a, `\\sqrt{` + n + `}`];
		}
	},
	str: function (n) {
		return `` + math_visuals.root.process(n)[0];
	},
	tex: function (n) {
		return tex(math_visuals.root.str(n));
	},
	integer_part: function (n) {
		return math_visuals.root.process(n)[1];
	},
	sqrt_part: function (n) {
		return math_visuals.root.process(n)[2];
	},
};

math_visuals["quadratic"] = {
	test: function (n) {
		return (n == 1) ? `` : (n == -1) ? `-` : n;
	},
	str: function (a, b, c, x = `x`) { //
		var k = math.pow(b, 2) - 4 * a * c;
		if (k > 0) {
			var k1 = math_visuals.root.integer_part(k);
			if (math.pow(k1, 2) == k) {
				return x + `^{}_1=\\,` + math_visuals.fraction.str((-b + k1), 2 * a) +
					`\\space\\space ` + x + `^{}_2=\\,` + math_visuals.fraction.str((-b - k1), 2 * a);
			}
			var k2 = math_visuals.root.sqrt_part(k);
			var com = math_ngcd(b, k1, 2 * a);
			b = b / com;
			k1 = k1 / com;
			var k3 = math.abs(a * 2 / com);
			return (a > 0) ? (k3 == 1) ? x + `^{}_1=\\,` + (-b) + `+` + math_visuals.quadratic.test(k1) + k2 + `\\space

                         ` + x + `^{}_2=\\,` + (-b) + `-` + math_visuals.quadratic.test(k1) + k2 :
				x + `^{}_1=\\,\\dfrac{` + (-b) + `+` + math_visuals.quadratic.test(k1) + k2 + `}{` + k3 + `}\\space
                         ` + x + `^{}_2=\\,\\dfrac{` + (-b) + `-` + math_visuals.quadratic.test(k1) + k2 + `}{` + k3 + `}` :
				(k3 == 1) ? x + `^{}_1=\\,` + (b) + `-` + math_visuals.quadratic.test(k1) + k2 + `\\space
                         ` + x + `^{}_2=\\,` + (b) + `+` + math_visuals.quadratic.test(k1) + k2 :
				x + `^{}_1=\\,-\\dfrac{` + (-b) + `+` + math_visuals.quadratic.test(k1) + k2 + `}{` + k3 + `}\\space
                         ` + x + `^{}_2=\\,\\dfrac{` + (b) + `+` + math_visuals.quadratic.test(k1) + k2 + `}{` + k3 + `}`;
		} else if (k === 0) {
			return x + `^{}_1=\\,` + math_visuals.fraction.str(-b, 2 * a);
		}
	},
	tex: function (a, b, c) {
		return tex(math_quadratic.str(a, b, c));
	},
};

math_visuals['matrix'] = {
	str: function (matrix) {
		return `\\begin{bmatrix}` + matrix.map(function (line) {
			return line.join(`&`);
		}).join(`\\cr`) + `\\end{bmatrix}`;
	},
	tex: function (matrix) {
		return tex(math_visuals.matrix.str(matrix));
	},
}

math_visuals['array_to_table'] = function (array) {
	return `<table border='1' cellspacing='0'  cellpadding='5'><tr><td>` + array.map(function (line) {
		return line.join(`</td><td>`);
	}).join(`</tr><tr><td>`) + `</td></tr></table>`;
}

function tex(result, not_inline) {
	var i;
	var keyboards = /\[answer( .*?)?\]/g.execAll(result);
	result = result.replace(/\[answer( .*?)?\]/g, '[input]');

	i = 0;
	replaced = true;
	while (replaced) {
		replaced = false;
		result = result.replace(new RegExp('\\[input]'), function () {
			replaced = true;
			return '{}\\text{i' + i + '}{}';
		});
		i += 1;
	}

	i = 0;
	replaced = true;
	while (replaced) {
		replaced = false;
		result = result.replace(new RegExp('\\[div]'), function () {
			replaced = true;
			return '\\text{d' + i + '}';
		});
		i += 1;
	}

	result = katex.renderToString(result);

	i = 0;
	replaced = true;
	while (replaced) {
		replaced = false;
		if (i > 9) {
			var str = '<span class="mord mathrm">' + Math.floor(i / 10) + '</span><span class="mord mathrm">' + (i % 10) + '</span>';
		} else {
			var str = '<span class="mord mathrm">' + i + '</span>';
		}

		if (i > keyboards.length - 1) {
			var replacement = '<span id="i' + i + '" class="book_math_input' + (not_inline ? "" : "_inline") + '"></span>';
		} else {
			var replacement = keyboards[i][0];
		}
		result = result.replace(new RegExp('<span class="text mord (text|script)style uncramped"><span class="mord mathrm">i</span>' + str + '</span>'), function () {
			replaced = true;
			return replacement;
		});
		i += 1;
	}

	i = 0;
	replaced = true;
	while (replaced) {
		replaced = false;
		if (i > 9) {
			var str = '<span class="mord mathrm">' + Math.floor(i / 10) + '</span><span class="mord mathrm">' + (i % 10) + '</span>';
		} else {
			var str = '<span class="mord mathrm">' + i + '</span>';
		}
		result = result.replace(new RegExp('<span class="text mord (text|script)style uncramped"><span class="mord mathrm">d</span>' + str + '</span>'), function () {
			replaced = true;
			return '<span id="d' + i + '""></span>';
		});
		i += 1;
	}
	return result;
}

function shuffle_array(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function time() {
	var d = new Date();
	return Math.floor(d.getTime() / 1000);
}

function compare_answers(input1, input2, prec, linear_multiples) {
	prec = (typeof prec === "undefined" ? 3 : prec);
	var precision = prec;

	if (input1 instanceof expression && input2 instanceof expression) {
		if (!input1.vars.equals(input2.vars)) {
			return false
		};

		// Get constants
		variables = {};
		if (linear_multiples === true) {
			// Get ratio
			for (key in input1.vars) {
				variables[input1.vars[key]] = 1;
			}

			var r1 = input1.eval(variables);
			var r2 = input2.eval(variables);

			var ratio = r1.d(r2);
		} else {
			var ratio = new term(1);
		}
		var zero_term = new term(0);
		var test = 0;
		var t1, t2;

		var factor = 100;
		while (test < 100) {
			variables = {};
			for (key in input1.vars) {
				variables[input1.vars[key]] = Math.random() * 2 * factor - factor;
			}

			t1 = input1.eval(variables);
			t2 = input2.eval(variables);

			var test_ratio = t1.d(t2);

			if (!isFinite(t2.r) || !isFinite(t2.i)) {
				factor = factor / 10;
				if (factor < 1) {
					throw ('Answer is too large!');
				}
				continue;
			}

			if (compare_answers(test_ratio, zero_term)) {
				if (!compare_answers(t1, t2, precision)) {
					return false;
				}
			} else {
				if (!compare_answers(test_ratio, ratio, precision)) {
					return false;
				}
			}

			test += 1;
		}
		return true;
	}

	if (input1 instanceof term && input2 instanceof term) {
		return (compare_answers(input1.r, input2.r, precision) && compare_answers(input1.i, input2.i, precision));
	}

	if (input1 instanceof term && typeof input2 === "number") {
		return compare_answers(input1.r, input2, precision);
	}

	if (typeof input1 === "number" && input2 instanceof term) {
		return compare_answers(input1, input2.r, precision);
	}

	if (typeof input1 !== typeof input2) {
		return false;
	}

	if (typeof input1 == "string" || typeof input1 == "number") {

		// This is needed because of floating point nonsense (specifically max - min = 0 if min too small)
		if (input1 < 0.0000001 && input1 > -0.0000001 && input2 < 0.0000001 && input2 > -0.0000001) {
			return true;
		}
		var i1 = parseFloat(input1);
		var i2 = parseFloat(input2);
		var max = Math.max(i1, i2);
		var min = Math.min(i1, i2);
		return max - min <= Math.abs(max) / Math.pow(10, precision);
	}

	/*
		if(typeof input1.value !== "undefined" && typeof input1.type !== "undefined" && typeof input2.value !== "undefined" && typeof input2.type !== "undefined"){
			return (compare_answers(input1.value.re,input2.value.re, precision) && compare_answers(input1.value.im, input2.value.im. precision) && input1.type === input2.type);
		}
	*/
	return false;
}

// Mainly for use with interactive modules

function lerp(array_1, array_2, mix) {
	var res = [];
	for (var key in array_1) {
		res.push(array_1[key] * (1 - mix) + array_2[key] * mix);
	}
	return res;
}

function touch_start(e) {
	try {
		if (typeof e.target.onclick === "function") {
			e.preventDefault();
			e.target.onclick();
		}
	} catch (err) {};
}

/*

function get_aret_position (oField) {

  // Initialize
  var iCaretPos = 0;

  // IE Support
  if (document.selection) {

    // Set focus on the element
    oField.focus();

    // To get cursor position, get empty selection range
    var oSel = document.selection.createRange();

    // Move selection start to 0 position
    oSel.moveStart('character', -oField.value.length);

    // The caret position is selection length
    iCaretPos = oSel.text.length;
  }

  // Firefox support
  else if (typeof oField.selectionStart==='number')
    iCaretPos = oField.selectionStart;

  // Return results
  return iCaretPos;
}
*/