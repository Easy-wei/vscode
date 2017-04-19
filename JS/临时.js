  var v1 = math_tools.rand_int(1, 9);
  var v2 = math_tools.rand_int(1, 9);

  function inte(x, y = `x`, low = ``, hight = ``) {
      return `\\displaystyle\\int_{` + low + `}^{` + hight + `}{` + x + `\\,\\,\\mathrm{d}` + y + `}`;
  }

  var part1 = `x`;
  var part1_1 = `1`;
  var part2 = `-\\dfrac{\\mathrm{e}^{` + (-v1) + `x}}{` + v1 + `}`;
  var part2_1 = `\\mathrm{e}^{` + (-v1) + `x}`;
  var part3 = `x^{2}`;
  var part3_1 = `2x`;

  self.text = function () {
      return `Find~` + inte(part1 + part2_1, `x`, 0, `\\infty`) + `~, and ~` + inte(part3 + part2_1, `x`, 0, `\\infty`) + `~,
	[answer keyboard='{{"1","2","3","4","5","6","7","8","9","0"},{".","e","i","+","-","*","/"},{"^","frac","root","cos","sin","tan","()"},{"x_var","y_var","s_var","left","right","del"}}']`;
  };

  self.post_load = function () {};

  self.step_js = function (wrong_answer, step) {};

  self.step = function (wrong_answer, step) {
      var steps = [
          `Begin by finding the integral from ~0~ to ~\\mathrm{s}~, and then consider their limits as ~\\mathrm{s}\\rightarrow\\infty~.`,
          `For both integrals take ~\\dfrac{\\mathrm{d}v}{\\mathrm{d}x}=\\mathrm{e}^{-ax}~, so ~v=` + part2 + `~.`,
          `~` + inte(part1 + part2_1, `x`, 0, `\\mathrm{s}`) + `=\\big[` + part1 + `\\times` + part2 + `\\big]^{\\mathrm{s}}_{0}-` + inte(part1_1 + `\\times` + part2, `x`, 0, `\\mathrm{s}`) + `~`,
          `~-\\dfrac{1}{` + v1 + `}\\mathrm{se}^{-as}-\\dfrac{1}{` + v1 * v1 + `}\\mathrm{e}^{` + (-v1) + `s}+\\dfrac{1}{` + v1 * v1 + `}~.`,
          `~~`,
      ];
      return steps[step];
  };


  self.misconception = function (answer) {
      return 0; // Default
  };

  var ans = new expression(`{x}+{y}`);

  self.correct_answers = function () {
      return ans;
  };