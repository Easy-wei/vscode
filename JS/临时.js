var variable_1 = math_tools.rand_int(1, 99);
var variable_2 = math_tools.rand_int(1, 99);

var circle = function (x) {
  return Math.sqrt(16 - x * x);
};

self.text = function () {
  return `What is ` + variable_1 / 10 + ` + ` + variable_2 / 10 + `?
	[answer]`;
};

self.text_js = function () {};

self.step_js = function (misconception, step) {
  g = new graphic({
    'input_element': "graph",
    'low_x': -12,
    'high_x': 13,
    'low_y': -12,
    'high_y': 12
  });
  g.add_element({
    'type': 'grid'
  });
  g.add_element({
    'type': 'graph',
    'function': circle
  });
};

self.step = function (misconception, step) {
  var steps = [
    `<div id= 'graph'></div>`,
  ];
  return steps[step];
};


self.misconception = function (answer) {
  return 0; // Default
};

self.correct_answers = function () {
  return (variable_1 + variable_2) / 10;
};