  do {
  	var v1 = math_tools.rand_int(-8, 8, [0, 1, -1]);
  	var v3 = math_tools.rand_int(2, 9);
  }
  while (v1 == v3);

  var v2 = math_tools.rand_int(2, 9);

  var part1 = math_visuals.polynomial(v1) + `x` + (v2).signed();

  self.text = function () {
  	return `Carry out the following indefinite integrations, and state the values of ~x~ for which your answer is valid. 
~\\bold{d)}\\,\\,\\,\\displaystyle\\int{\\dfrac{` + v3 + `}{` + part1 + `}` + `}dx~
		[answer keyoard='equation_ln_x']`;
  };

  self.text_js = function () {};

  self.step_js = function (wrong_answer, step) {};

  self.step = function (wrong_answer, step) {
  	var steps = [
  		`~\\displaystyle\\int{\\dfrac{1}{` + part1 + `}x}dx~`,
  		`~=\\,` + math_visuals.fraction.str(v3, v1) + `\\displaystyle\\int{\\dfrac{1}{` + part1 + `}d(` + part1 + `)}~`,
  		`~=\\,` + ((v1 == -v3) ? `-` : math_visuals.fraction.str(v3, v1)) + `\\ln{(` + part1 + `)}~`,
  	];
  	return steps[step];
  };

  self.misconception = function (answer) {
  	return 0; // Default
  };
  var ans = v3 / v1 + `*ln(` + v1 + `*{x}` + v2.signed() + `))`;
  self.correct_answers = function () {
  	return [ans];
  };