var v1 = math_tools.rand_int(-9, 9, [0]);
var v2 = math_tools.rand_int(2, 9);
var v3 = 2;

var d = function (y = `\\mathrm{y}`, x = `x`) {
	return `\\dfrac{\\mathrm{d}` + y + `}{\\mathrm{d}` + x + `}`;
};

self.text = function () {
	return `Differentiate ~\\mathrm{y}=\\sqrt{` + v1 + v2.signed() + `\\sqrt{` + `x}` + `}~ 
             with respect to ~x~.
	[answer keyboard='full_xy']`;
};

self.post_load = function () {};

self.step_js = function (wrong_answer, step) {};

self.step = function (wrong_answer, step) {
	var steps = [
		`~\\mathrm{y}=(` + v1 + v2.signed() + `\\sqrt{x})^{\\frac{1}{2}}~`,
		`Substitute ~u=` + v1 + v2.signed() + `\\sqrt{x}~, so ~\\mathrm{y}=u^{\\frac{1}{2}}~`,
		`~` + d(`\\mathrm{y}`, `u`) + `=\\dfrac{1}{2}u^{-\\frac{1}{2}}=\\dfrac{1}{2}(` + v1 + v2.signed() + `\\sqrt{x})^{-\\frac{1}{2}}~`,
		`~` + d() + `=` + v2 + `\\times{\\dfrac{1}{2}}x^{-\\frac{1}{2}}~`,
		`So ~` + d() + `=` + d(`\\mathrm{y}`, `u`) + `\\times` + d(`u`) + `=\\dfrac{1}{2}(` + v1 + v2.signed() + `\\sqrt{x})^{-\\frac{1}{2}}\\times` + v2 + `\\times{\\dfrac{1}{2}}x^{-\\frac{1}{2}}~`,
		`~=` + ((v2 == 4) ? `` : math_visuals.fraction.str(v2, 4)) + `(` + v1 + v2.signed() + `\\sqrt{x})^{-\\frac{1}{2}}x^{-\\frac{1}{2}}~`,
		`~=` + ((v2 == 4) ? `` : math_visuals.fraction.str(v2, 4)) + `\\dfrac{1}{\\sqrt{` + v1 + v2.signed() + `\\sqrt{x}}}\\dfrac{1}{\\sqrt{x}}~`,
	];
	return steps[step];
};


self.misconception = function (answer) {
	return 0; // Default
};

var ans = new expression(v2 / 4 + `/math.sqrt({x})` + `/math.sqrt(` + v1 + v2.signed() + `*math.sqrt({x})`);

self.correct_answers = function () {
	return ans;
};