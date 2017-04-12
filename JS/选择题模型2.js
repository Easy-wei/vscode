var v1 = math_tools.rand_int(1, 9);
var v2 = math_tools.rand_int(1, 9);
var v3 = math_tools.rand_int(1, 9);

var primes_array = math_tools.primes_below(10);
do {
	var prime = primes_array[math.floor(Math.random() * primes_array.length)];
	var prime2 = primes_array[math.floor(Math.random() * primes_array.length)];
}
while (prime == prime2);
self.options = 4; // Default is 8

self.text = function () {
	return `下面计算正确的是`;
};

self.post_load = function () {};

self.step_js = function (wrong_answer, step) {};

self.wrong_answer = function (number) {
	var v3 = math_tools.rand_int(1, 3);
	switch (v3) {
		case 1:
			wrong_ans = tex(`(a^{` + math_visuals.num_form.index(v1) + `})^{` + v2 + `}=a^{` + math_visuals.num_form.index(v1 + v2) + `}`);
			break;
		case 2:
			wrong_ans = tex(`a^{` + math_visuals.num_form.index(v3) + `}\\div{a^{` + math_visuals.num_form.index(v1) + `}}=` + (v3 - v1));
			break;
		case 3:
			wrong_ans = tex(`a^{` + math_visuals.num_form.index(v2) + `}+a^{` + math_visuals.num_form.index(v2) + `}=a^{` + math_visuals.num_form.index(2 * v2) + `}`);
			break;
	}
	return wrong_ans;
};

self.step = function (wrong_answer, step) {
	var steps = [
		"First do this",
		"Then do that",
	];
	return steps[step];
};

self.misconception = function (answer) {
	return 0; // Default
};

self.correct_answers = function () {
	return tex(math_visuals.num_form.head(v3) + `a-` + math_visuals.num_form.head(v2) + `a=` + math_visuals.num_form.head(v3 - v2) + `a`);
};