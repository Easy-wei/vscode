var k = math_tools.rand_int(2, 5);
var j = math_tools.rand_int(2, 5);

xy = [[` x`],[` y`]];
yx = [[` y`],[` x`]];

a1 = [[k, 0],[0, k]];
a2 = [[0, k],[k, 0]];
a3 = [[`\\dfrac{1}{` + k + `}`, 0],[0, `\\dfrac{1}{` + k + `}`]];
a4 = [
  [0, `\\dfrac{1}{` + k + `}`],
  [`\\dfrac{1}{` + k + `}`, 0]
];
trans = [a1, a2, a3, a4];
var j = math.floor(trans.length * math.random());

var show;
var step;
var ans;

switch (j) {
  case 0:
    show = `This transformation is an enlargement, scale factor [answer style='inline'] and centre ` + tex(`(0,0)`);

    step = math_visuals.matrix.tex(trans[j]) + math_visuals.matrix.tex(xy) + tex(`=\\,`) +

      math_visuals.matrix.tex([
        [k + `\\times x+0\\times y`],
        [`0\\times x+` + k + `\\times y`]
      ]) + `<br><br>` +

      tex(`=\\,`) + math_visuals.matrix.tex([
        [k + `x`],
        [k + `y`]
      ]) + `<br><br>` +

      tex(`\\therefore\\,\\,`) + `The transformation is therefore an enlargement, scale factor ` + k + ` and centre ` + tex(`(0,0)`);
    ans = [k];
    break;
  case 1:
    step = math_visuals.matrix.tex(trans[j]) + math_visuals.matrix.tex(xy) + tex(`=\\,`) +

      math_visuals.matrix.tex([
        [`0\\times x+` + k + `\\times y`],
        [k + `\\times x+0\\times y`]
      ]) + `<br><br>` +

      tex(`=\\,`) + math_visuals.matrix.tex([
        [k + `y`],
        [k + `x`]
      ]) + `<br>` +

      `This transformation is therefore a reflection  in the line ` + `<br>` + tex(`y=\\,x`) +

      `<br> followed by an enlargemengt, scale factor ` + k + ` and centre ` + tex(`(0,0)`);

    show = `This transformation is a reflection  in the line ` + `<br>` +

      tex(`y=\\,`) + `[answer style='inline']` + tex(`x`) +

      `<br> followed by an enlargemengt, scale factor [answer style='inline'] and centre ` + tex(`(0,0)`);
    ans = [1, k];
    break;
  case 2:
    step = math_visuals.matrix.tex(trans[j]) + math_visuals.matrix.tex(xy) + tex(`=\\,`) +

      math_visuals.matrix.tex([
        [`\\dfrac{1}{` + k + `}\\times x+0\\times y`],
        [`0\\times x+\\dfrac{1}{` + k + `}\\times y`]
      ]) + `<br><br>` +

      tex(`=\\,`) + math_visuals.matrix.tex([
        [`\\dfrac{x}{` + k + `}`],
        [`\\dfrac{y}{` + k + `}`]
      ]) + `<br>` +

      `The transformation is therefore an enlargement,scale factor ` + tex(`\\dfrac{1}{` + k + `}`) + ` and centre ` + tex(`(0,0)`);

    show = `This transformation is an enlargement, scale factor [answer style='inline'] and centre ` + tex(`(0,0)`);

    ans = [1 / k];
    break;
  case 3:
    step = math_visuals.matrix.tex(trans[j]) + math_visuals.matrix.tex(xy) + tex(`=\\,`) +

      math_visuals.matrix.tex([
        [`0\\times x+\\dfrac{1}{` + k + `}\\times y`],
        [`\\dfrac{1}{` + k + `}\\times x+0\\times y`]
      ]) + `<br><br>` +

      tex(`=\\,`) + math_visuals.matrix.tex([
        [`\\dfrac{y}{` + k + `}`],
        [`\\dfrac{x}{` + k + `}`]
      ]) + `<br>` +

      `This transformation is therefore a reflection  in the line ` + `<br>` + tex(`y=\\,x`) +

      `<br> followed by an enlargemengt, scale factor ` + k + ` and centre ` + tex(`(0,0)`);

    show = `This transformation is a reflection in the line <br>` +

      tex(`y=\\,`) + `[answer style='inline']` + tex(`x`) +

      `<br> followed by an enlargemengt, scale factor [answer style='inline'] and centre(0,0)`;
    ans = [1, 1 / k];
    break; /**/
}

self.text = function () {
  return `Describe fully the geometric transformations represented by the this matrix` +

    `<br><br>` + math_visuals.matrix.tex(trans[j]) + `[exercise_only]<br><br>` + show + `[/exercise_only]`;
};
a = step;
self.step = function (wrong_answer, step) {
  steps = [
    a
  ];
  return steps[step];
};

self.misconception = function (answer) {
  return 0; // Default
};

self.correct_answers = function () {
  return ans;
};