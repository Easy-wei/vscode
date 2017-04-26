//Page120Exercise6.step

self.ordered_answer = true;
do {
  v1 = math_tools.rand_int(1, 6);
  v2 = math_tools.rand_int(25, 46);
  v3 = math_tools.rand_int(25, 46);
  v4 = math_tools.rand_int(25, 46);
}
while (v1 > v2);
j = math_tools.rand_int(-4, 4, [0, -1, 1]);
k = math_tools.rand_int(-4, 4, [0]);
l = math_tools.rand_int(-4, 4, [0]);

function sum_tex(a, n, r, s) {
  return tex(`\\displaystyle\\sum\_{` + r + `=` + a + `}^{` + n + `}` + s);
}

function sum_a(a, n) {
  var sum = 0;
  for (var i = a; i < n + 1; i++) {
    sum += i * i + k;
  }
  return sum;
}


self.text = function () {
  return `Find.` + `<br><br>` + sum_tex(1, `2n`, `r`, `(` + j + `r` + k.signed() + `)^2`) +

    tex(`=`) + tex(`[answer style='inline' keyboard='polynomial_n']`) + `<br><br>` +

    ` Giving your answer in its simplest form`;
};

var sum_formula = {
  f1: "Using the " + sum_tex(1, `n`, `r`, `r`) + tex(`=\\,\\dfrac{n}{2}(n+1)`) + `to calculate<br><br>`,
  f2: `Using the formula ` + sum_tex(1, `n`, `r`, `r^2`) + tex(`=\\,\\dfrac{n}{6}(n+1)(2n+1)`) +
    `to calculate<br><br>`,
  f3: `Using the formula ` + sum_tex(1, `n`, `r`, `r^3`) + tex(`=\\,\\dfrac{n^{2}}{4}(n+1)^{2}\\space`) +
    `to calculate<br><br>`,
  r1: function (n) {
    return tex(`\\dfrac{` + n + `}{2}(` + n + `+` + 1 + `)`);
  },
  r2: function (n) {
    return tex(`\\dfrac{` + n + `}{6}(` + n + `+1)((2\\times` + n + `)+1)`);
  },
  r3: function (n) {
    return tex(`\\dfrac{` + n + `^{2}}{4}(` + n + `+1)^2`);
  },
};

com = math.gcd(8 * j * j, (6 * j * j + 12 * j * k), (6 * k * k + 6 * j * k + j * j));

com2 = math.gcd(8 * j * j, (6 * k * k + 6 * j * k + j * j));

var step_ans;
var ans;
switch (6 * j * j + 12 * j * k) {
  case 0:
    step_ans = tex(`=\\,`) + ((com2 == 3) ? `` : math_visuals.fraction.tex(com2, 3)) + tex(`n(` + 8 * j * j / com2 + `n^2` + ((6 * k * k + 6 * j * k + j * j) / com2).signed() + `)`);
    
	ans =new expression( com / 3 + `*{n}` + `*(` + 8 * j * j / com + `*math.pow({n},2)` + ((6 * k * k + 6 * j * k + j * j) / com).signed() + `)`);
    
	break;
	
  default:
    
	step_ans = tex(`=\\,`) + ((com == 3) ? `` : math_visuals.fraction.tex(com, 3)) + tex(`n(` + 8 * j * j / com + `n^2` + ((6 * j * j + 12 * j * k === 0) ? `` : ((6 * j * j + 12 * j * k) / com).signed() + `n`) + ((6 * k * k + 6 * j * k + j * j) / com).signed() + `)`);
    
	ans = new expression(com / 3 + `*{n}` + `*(` + 8 * j * j / com + `*math.pow({n},2)` + ((6 * j * j + 12 * j * k) / com).signed() + `*{n}` + ((6 * k * k + 6 * j * k + j * j) / com).signed() + `)`);
    
	break;
}

self.step_js = function (){};

self.step = function (wrong_answer, step) {
  steps = [
    sum_tex(1, `2n`, `r`, `(` + j + `r` + k.signed() + `)^2`) + tex(`\\,=\\,`) + sum_tex(1, `2n`, `r`, `(` + j * j + `r^2` + (2 * j * k).signed() + `r` + (k * k).signed() + `)`),

    tex(`=\\,`) + sum_tex(1, `2n`, `r`, j * j + `r^2`) + tex(`\\,+\\,`) + sum_tex(1, `2n`, `r`, (2 * j * k) + `r`) + tex(`\\,+\\,`) + sum_tex(1, `2n`, `r`, k * k),

    tex(`=\\,` + j * j) + sum_tex(1, `2n`, `r`, `r^2`) + tex(`\\,` + (2 * j * k).signed()) + sum_tex(1, `2n`, `r`, `r`) + tex(`\\,` + (k * k).signed()) + sum_tex(1, `2n`, `r`, 1),

    tex(`=\\,` + j * j + `\\times`) + sum_formula.r2(`2n`) + tex(`\\,` + (2 * j * k).signed() + `\\times`) + sum_formula.r1(`2n`) + tex(`\\,` + (k * k).signed() + `\\times 2n`),

    step_ans,
  ];
  return steps[step];
};
self.misconception = function (answer) {
  return 0;
};

self.correct_answers = function () {
  return [ans];
};