self.ordered_answer = true;
self.precision = 2;

var sum_m, sum_mx, sum_my;

function centre_cal(array) {
  var x = 0;
  var y = 0;
  var m = 0;
  for (var i = 0; i < array.length; i++) {
    m += array[i][0];
    x += array[i][0] * array[i][1][0];
    y += array[i][0] * array[i][1][1];
  }
  sum_m = m;
  sum_mx = x;
  sum_my = y;
  x = x / m;
  y = y / m;
  var array1 = [];
  array1.push(x, y);
  return array1;
}

do {
  var m1 = math_tools.rand_int(2, 6);
  var m2 = math.randomInt(2, 6);
  var m3 = math.randomInt(2, 6);
  var m4 = math.randomInt(2, 6);
  var x1 = math.randomInt(2, 6);
  var y1 = math.randomInt(2, 6);
  var array = [ //格式是：质量，坐标（x，y）。也就是[m,[x,y]]
    [m1, [0, 0]],
    [m2, [x1, 0]],
    [m3, [x1, y1]],
    [m4, [0, y1]],
  ];
  var coordinate = centre_cal(array);
}
while (coordinate[0] % 1 !== 0 || coordinate[1] % 1 !== 0);
console.log(coordinate);
self.text = function () {
  return `<div id="graph_1"></div>A light retangular metal plate ~PQRS~ has ~PQ=` + array[1][1][0] + `cm ~ and ~PS=` + array[2][1][1] + `cm. ~ Particles of masses 

~` + array[0][0] + `kg, ` + array[1][0] + `kg, ` + array[2][0] + `kg,~ and ~` + array[3][0] + `kg~ are attached respectively to the corner ~A,B,C, ~ and ~D~ of the plate.

Find the distance of the centre mass of the loaded  plate form.
		~\\bold{a)}~ the side ~PQ~ [answer] 
        ~\\bold{b)}~ the side ~PS~ [answer]`;
};


coordinate_range = [-3, x1 + 3, -3, y1 + 3]; //调节坐标轴的大小比例
self.post_load = function () {
  var g1 = new graphic({
    'input_element': "graph_1",
    'low_x': coordinate_range[0],
    'high_x': coordinate_range[1],
    'low_y': coordinate_range[2],
    'high_y': coordinate_range[3]
  });

  g1.add_element({
    'type': 'dot',
    'pos': [array[0][1][0], array[0][1][1]]
  });

  g1.add_element({
    'type': 'label',
    'pos': [array[0][1][0] - 0.5, array[0][1][1] + 0.5],
    'text': 'A'
  });

  g1.add_element({
    'type': 'dot',
    'pos': [array[1][1][0], array[1][1][1]]
  });

  g1.add_element({
    'type': 'label',
    'pos': [array[1][1][0], array[1][1][1] + 0.5],
    'text': 'B'
  });

  g1.add_element({
    'type': 'dot',
    'pos': [array[2][1][0], array[2][1][1]]
  });

  g1.add_element({
    'type': 'label',
    'pos': [array[2][1][0] - 0.5, array[2][1][1] + 0.5],
    'text': 'C'
  });

  g1.add_element({
    'type': 'dot',
    'pos': [array[3][1][0], array[3][1][1]]
  }); //答案坐标点

  g1.add_element({
    'type': 'label',
    'pos': [array[3][1][0] - 0.5, array[3][1][1] + 0.5],
    'text': 'D'
  });

  g1.add_element({
    'type': 'line_stroked',
    'start': [array[0][1][0], array[0][1][1]],
    'end': [array[1][1][0], array[1][1][1]]
  });

  g1.add_element({
    'type': 'line_stroked',
    'start': [array[1][1][0], array[1][1][1]],
    'end': [array[2][1][0], array[2][1][1]]
  });

  g1.add_element({
    'type': 'line_stroked',
    'start': [array[2][1][0], array[2][1][1]],
    'end': [array[3][1][0], array[3][1][1]]
  });

  g1.add_element({
    'type': 'line_stroked',
    'start': [array[3][1][0], array[3][1][1]],
    'end': [array[0][1][0], array[0][1][1]]
  });

  g1.draw();
};


self.step = function (wrong_answer, step) {
  var steps = [
    `Set ~PQ~ as the ~X~-axis, ~PS~ as the ~Y~-axis, then get all points at the coordinate.`,

    `<div id='graph_6'></div>`,

    `Find the centre of the masses `,

    `The sum of the masses ~\\displaystyle\\sum m^{}_{i}=` + sum_m + ` ~`,

    `~` + m1 + `~` + math_visuals.matrix.tex([
      [array[0][1][0]],
      [array[0][1][1]]
    ]) + `~+` + m2 + `~` + math_visuals.matrix.tex([
      [array[1][1][0]],
      [array[1][1][1]]
    ]) +
    `~+` + m3 + `~` + math_visuals.matrix.tex([
      [array[2][1][0]],
      [array[2][1][1]]
    ]) + `~+` + m4 + `~` + math_visuals.matrix.tex([
      [array[3][1][0]],
      [array[3][1][1]]
    ]) +
    `~=` + sum_m + `~` + math_visuals.matrix.tex([
      [`\\bar x`],
      [`\\bar y`]
    ]),

    `~\\therefore\\,~` + math_visuals.matrix.tex([
      [m1 + `\\times` + (array[0][1][0] + `+` + m2 + `\\times` + array[1][1][0] + `+` + m3 + `\\times` + array[2][1][0] + `+` + m4 + `\\times` + array[3][1][0])],
      [m1 + `\\times` + array[0][1][1] + `+` + m2 + `\\times` + array[1][1][1] + `+` + m3 + `\\times` + array[2][1][1] + `+` + m4 + `\\times` + array[3][1][1]]
    ]) + `~=` + sum_m + `~` + math_visuals.matrix.tex([
      [`\\bar x`],
      [`\\bar y`]
    ]),

    `It's easy to find the ` + math_visuals.matrix.tex([
      [`\\bar x`],
      [`\\bar y`]
    ]) + `~=~` + math_visuals.matrix.tex([
      [coordinate[0]],
      [coordinate[1]]
    ]),

    `~\\bold{a)}~ the distance between the center of mass and the side ~PQ~ is ~` + coordinate[0] + `~`,

    `~\\bold{b)}~ the distance between the center of mass and the side ~PS~ is ~` + coordinate[1] + `~`,
  ];
  return steps[step];
};

self.step_js = function (wrong_answer, step) {
  if (step === 0) {
    return function () {
      g6 = new graphic({
        'input_element': "graph_6",
        'low_x': coordinate_range[0],
        'high_x': coordinate_range[1],
        'low_y': coordinate_range[2],
        'high_y': coordinate_range[3]
      });
      g6.add_element({
        'type': 'grid'
      });
      g6.draw();
    };
  } else if (step === 1) {
    return function () {
      g6.add_element({
        'type': 'dot',
        'pos': [array[0][1][0], array[0][1][1]]
      });

      g6.add_element({
        'type': 'label',
        'pos': [array[0][1][0] - 0.5, array[0][1][1] + 0.5],
        'text': 'A'
      });

      g6.add_element({
        'type': 'dot',
        'pos': [array[1][1][0], array[1][1][1]]
      });

      g6.add_element({
        'type': 'label',
        'pos': [array[1][1][0], array[1][1][1] + 0.5],
        'text': 'B'
      });

      g6.add_element({
        'type': 'dot',
        'pos': [array[2][1][0], array[2][1][1]]
      });

      g6.add_element({
        'type': 'label',
        'pos': [array[2][1][0] - 0.5, array[2][1][1] + 0.5],
        'text': 'C'
      });

      g6.add_element({
        'type': 'dot',
        'pos': [array[3][1][0], array[3][1][1]]
      });

      g6.add_element({
        'type': 'label',
        'pos': [array[3][1][0], array[3][1][1] + 0.5],
        'text': 'D'
      });

      g6.add_element({
        'type': 'dot',
        'pos': [coordinate[0], coordinate[1]]
      }); //答案坐标点

      g6.add_element({
        'type': 'label',
        'pos': [coordinate[0], coordinate[1] + 0.5],
        'text': 'G'
      });

      g6.add_element({
        'type': 'line_stroked',
        'start': [array[0][1][0], array[0][1][1]],
        'end': [array[1][1][0], array[1][1][1]]
      });

      g6.add_element({
        'type': 'line_stroked',
        'start': [array[1][1][0], array[1][1][1]],
        'end': [array[2][1][0], array[2][1][1]]
      });

      g6.add_element({
        'type': 'line_stroked',
        'start': [array[2][1][0], array[2][1][1]],
        'end': [array[3][1][0], array[3][1][1]]
      });

      g6.add_element({
        'type': 'line_stroked',
        'start': [array[3][1][0], array[3][1][1]],
        'end': [array[0][1][0], array[0][1][1]]
      });
      g6.draw();
    };
  }
};

self.misconception = function (answer) {
  return 0; // Default
};

self.correct_answers = function () {
  return [coordinate[0], coordinate[1]];
};