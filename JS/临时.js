  var v1 = math_tools.rand_int(1, 9);
  do {
      var v2 = math_tools.rand_int(1, 9);
      var v3 = math_tools.rand_int(1, 9);
  }
  while (v3 - v2 > 4 || v2 > v3 || v3 == v2 || v3 - v2 == 3);

  f = function (x) {
      return v1 * math.pow(x, 2);
  };
  var equation = `\\mathrm{y}=` + math_visuals.num_form.head(v1) + `x^{2}`;

  var gaint = math.round((f(v3) / 10 - f(v2) / 10) / (v3 - v2), 2);


  var ans_equation = `\\mathrm{y}=` + gaint + `x` + (math.round(f(v2 / 10) - gaint * (v2 / 10), 3)).signed();
  self.text = function () {
      return `Find the gradient and the equation of the chord joining the points on the curve ~` + equation + `~
with coordinates ~(` + v2 / 10 + `,` + f(v2) / 100 + `)~ and ~(` + v3 / 10 + `,` + f(v3) / 100 + `)~
gradient~\\rightarrow~[answer]
~\\mathrm{y}\\rightarrow~[answer keyboard='full_xy']`;
  };

  self.post_load = function () {};

  self.step_js = function (wrong_answer, step) {};

  self.step = function (wrong_answer, step) {
      var steps = [
          `The gradient of the chord is ~\\dfrac{` + f(v3) / 100 + (-f(v2) / 100) + `}{` + v3 / 10 + (-v2 / 10).signed() + `}=` + gaint + `~`,
          `So the equation of the chord is ~\\mathrm{y}-` + math.round(f(v2 / 10), 2) + `=` + gaint + `(x-` + v2 / 10 + `)` + `~`,
          `~` + ans_equation + `~`,
      ];
      return steps[step];
  };


  self.misconception = function (answer) {
      return 0; // Default
  };

  self.correct_answers = function () {
      return;
  };