do {

  var v1 = math_tools.rand_int(-6, 6, [0, 1, -1]);

  var v2 = math_tools.rand_int(-6, 6, [0, 1, -1]);
}
while (v1 == v2 || v1 + v2 === 0);

var equation = `x^{4}` + math_visuals.num_form.body(-v1) + `x^{3}`;

var f = function (x) { return math.pow(x, 4) - v1 * math.pow(x, 3); };

self.text = function () {

  return `for the function ~f(x)=` + equation + `~, find the intervals in which ~f(x)~ is increaseing and those in which it is decreasing .

            increasing zone~\\rightarrow~\[[answer style='inline'],~+\\infty~\]

            decreasing zone~\\rightarrow~\[~-\\infty~,[answer style='inline']\]`
    ;
};


self.post_load = function () { };

self.misconception = function (answer) {
  return 0; // Default
};

self.step_js = function (wrong_answer, step) {
  
    var g = new graphic({'input_element': "graph", 'low_x': -15, 'high_x': 15, 'low_y': -15, 'high_y': 15});
  
    g.add_element({'type': 'grid'});
  
    g.add_element({'type': 'graph', 'function': f, "color": "red"});
};

self.step = function (wrong_answer, step) {
  var steps = [
    `<div id="graph"></div>`,

    `Find any three ponits which are on the graph then drag the circle to the right place`,

    `like this three points~(` + v1 + `,0)(` + v2 + `,0)(0,` + v1 * v2 + `)~`,
  ];
  return steps[step];
};

self.correct_answers = function () {
  return [3 * v1 / 4, 3 * v1 / 4];
};