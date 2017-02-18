//page 21 1F Q1

self.ordered_answer = true;
var_1 = math_tools.rand_int(-10, 10);
var_2 = math_tools.rand_int(-10, 10);

a = new term(var_1 + `+` + var_2 + `i`);
b = var_1 * var_1 + var_2 * var_2;
r = math.sqrt(b);
theta = math.atan(var_2 / var_1);

function root_(a) {
  arr = [];
  var i;
  for (i = 1; i <= a; i++) {
    if (a % i === 0) {
      arr.push(i);
    }
  }
  var j;
  arr1 = [];
  for (j = 0; j < arr.length; j++) {
    if (math.sqrt(arr[j]) % 1 === 0) {
      arr1.push(arr[j]);
    }
  }
  var k;
  for (k = 0; k < arr1.length; k++) {
    max = 0;
    if (max < arr1[k]) {
      max = arr1[k];
    }
  }
  return max;
}

if (math.sqrt(b) % 1 === 0) {
  res = math.sqrt(b) + ``;
} else {
  if (root_(b) === 1) {
    res = `\\sqrt{` + b + `}`;
  } else {
    res = math.sqrt((root_(b))) + `\\sqrt{` + (b / root_(b)) + `}`;
  }
}

self.text = function () {
  return `Find ` + tex(`r`) + ` and ` + tex(`\\theta`) + ` when ` + tex(a + ``) + ` is expressed in the form ` + tex(`r(\\cos\\theta+i\\sin\\theta)`) + `

(give ` + tex(`\\theta`) + ` in radians, to ` + tex(`2`) + ` decimal places if required)[exercise_only]

` + tex(`r = {}[answer] \\space\\space\\space \\theta={}[answer]`) + `[/exercise_only]
	<h1></h1>
        <div id="graph_1"></div>`;
};
self.post_load = function () {
  var g1 = new graphic({
    'input_element': "graph_1",
    'low_y': -11,
    'high_y': 11,
    'low_x': -11,
    'high_x': 11
  });
  g1.add_element({
    'type': 'grid',
    'x_label': 'x Real',
    'y_label': 'y Imaginary'
  });
  g1.add_element({
    'type': 'line_middle_arrow',
    'end': [var_1, var_2],
    'label': 'z(' + var_1 + ',' + var_2 + ')'
  });
  g1.add_element({
    'type': 'line_stroked',
    'start': [var_1, var_2],
    'end': [var_1, 0]
  });
  g1.draw();


};

self.step = function (wrong_answer, step) {
  steps = [
    tex(`r=|` + a + `|=\\sqrt{(` + var_1 + `)^2+(` + var_2 + `)^2}=` + math_visuals.root.str(b)),
    tex(`\\theta=arg(` + a + `)=tan^{-1}\\dfrac{y}{x}=tan^{-1}\\bigl(` + math_visuals.fraction.str(var_2, var_1) + `\\bigr)=` + math.round(theta, 2)),
  ];
  return steps[step];
};

self.misconception = function (answer) {
  return 0; // Default
};

self.correct_answers = function () {
  return [r], [theta, theta];
};