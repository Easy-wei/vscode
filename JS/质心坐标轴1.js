self.ordered_answer = true;
self.precision = 2;

var sum_m, sum_mx, sum_my;

function diff_random(num, min = 1, max = 10) {
    var array = [];
    var a;
    array.push(math.randomInt(min, max));
    for (var i = 1; i < num; i++) {
        a = math.randomInt(min, max);
        if (array.indexOf(a) == -1) {
            array.push(a);
        } else {
            i = i - 1;
            continue;
        }
    }
    return array;
}

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

var v1 = math.randomInt(1, 5);


do {
  var m1 = math_tools.rand_int(1, 6);
  var m2 = math_tools.rand_int(1, 6);
  var m3 = math_tools.rand_int(1, 6);
  var x_array=diff_random(3,-6,9);
  var y_array=diff_random(3,-6,9);
  var array = [ //格式是：质量，坐标（x，y）。也就是[m,[x,y]]
    [m1, [x_array[0], y_array[0]]],
    [m2, [x_array[1], y_array[1]]],
    [m3, [x_array[2], y_array[2]]],
  ];
  var coordinate = centre_cal(array);
}
while (coordinate[0] % 1 !== 0 || coordinate[1] % 1 !== 0||(array[1][1][1]-array[0][1][1])/(array[1][1][0]-array[0][1][0])==(array[2][1][1]-array[0][1][1])/(array[2][1][0]-array[0][1][0]));
//上述三点不能一线
console.log(coordinate);
self.text = function () {
  return `<div id="graph_1"></div>Three particles ~A, B~ and ~C~ have masses ~` + array[0][0] + `kg,` + array[1][0] + `kg ~ and ~` + array[2][0] + `kg~ respectively.

The particles are placed on the line with equation `+`. Particles ~A, B~ and ~C~ are  at the points with coordinates 

~(` + array[0][1][0] + ` , ` + array[0][1][1] + `)~, ~ (` + array[1][1][0] + ` , ` + array[1][1][1] + `)~ and ~ (` + array[2][1][0] + ` , ` + array[2][1][1] + `)~ respectively.

Find the coordinates of the centre of mass of the three particles.

		~\\bigl([answer style='inline'] , [answer style='inline']\\bigr)~`;
};
//动态坐标轴
coordinate_range=[((math.min(x_array)>0)?-3:math.min(x_array)-3),((math.max(x_array)<0)?3:math.max(x_array)+3),((math.min(y_array)>0)?-3:math.min(y_array)-3),((math.max(y_array)<0)?3:math.max(y_array)+3)];

self.post_load = function () {
  var g1 = new graphic({'input_element': "graph_1",  'low_x': coordinate_range[0],    'high_x': coordinate_range[1] , 'low_y': coordinate_range[2],    'high_y': coordinate_range[3]      });
  g1.add_element({'type': 'grid',    'x_label': 'x Real',    'y_label': 'y Imaginary'  });
  g1.add_element({'type': 'dot',    'pos': [array[0][1][0],array[0][1][1]] });
  g1.add_element({'type': 'label', 'pos': [array[0][1][0]+0.5,array[0][1][1]+0.5], 'text': 'A'});
  g1.add_element({'type': 'dot',    'pos': [array[1][1][0],array[1][1][1]] });
  g1.add_element({'type': 'label', 'pos': [array[1][1][0],array[1][1][1]+0.5], 'text': 'B'});
  g1.add_element({'type': 'dot',    'pos': [array[2][1][0],array[2][1][1]] });
  g1.add_element({'type': 'label', 'pos': [array[2][1][0],array[2][1][1]+0.5], 'text': 'C'});
  g1.add_element({'type': 'line',    'start': [array[0][1][0], array[0][1][1]],    'end': [array[2][1][0], array[2][1][1]]  });
  g1.add_element({'type': 'line',    'start': [array[0][1][0], array[0][1][1]],    'end': [array[1][1][0], array[1][1][1]]  });
  g1.add_element({'type': 'line',    'start': [array[1][1][0], array[1][1][1]],    'end': [array[2][1][0], array[2][1][1]]  });
  g1.draw();
};


self.step = function (wrong_answer, step) {
  var steps = [
	`the particles are placed on the line with equation `,
	`draw in the coordinate, show in the steps `,
	`label the angle between ~CA~ and ~x~axis as ~\\alpha~`,
	`The length of ~AB~ is  ~\\dfrac{`+array[1][1][0]+`}{cos\\alpha}~`,
	`The length of ~Ac~ is  ~\\dfrac{`+array[2][1][0]+`}{cos\\alpha}~`,
	`set ~AC~ as ~x~axis in a new coordinate `,
	
    `The sum of the masses ~\\displaystyle\\sum m^{}_{i}=m^{}_{1}+m^{}_{2}+m^{}_{3}~`,
    `~=` + m1 + `+` + m2 + `+` + m3 + `=` + (sum_m) + `~`,

    /*  
    `~\\displaystyle\\sum_{}^{}m_{i}x_{i}=\\bar x\\sum_{}^{}m_{i}~`,

    `~\\displaystyle\\sum_{}^{}m_{i}x_{i}~`,
    `~=` + m1 + `\\times` + array[0][1][0] + `+` + m2 + `\\times` + array[1][1][0] + `+` + m3 + `\\times` + array[2][1][0] + `+` + m4 + `\\times` + array[3][1][0] + `~`,
    `~=` + (sum_mx) + `~`,
    `~\\bar x=\\displaystyle\\dfrac{\\sum_{}^{}m_{i}x_{i}}{\\sum_{}^{}m_{i}}~`,
    `~\\bar x=\\dfrac{` + sum_mx + `}{` + sum_m + `}~`,
    `~\\bar x=` + coordinate[0] + `~`,
    */

    `We can find ~\\bar y~, the average ~y~-coordinate, using the formula ~\\displaystyle\\sum_{}^{}m^{}_{i}y^{}_{i}=\\bar y\\sum_{}^{}m_{i}~`,
    `~\\displaystyle\\sum_{}^{}m^{}_{i}y^{}_{i}=` + m1 + `\\times` + array[0][1][1] + `+` + m2 + `\\times` + array[1][1][1] + `+` + m3 + `\\times` + array[2][1][1] + `=` + (sum_my) + `~`,
    `~\\bar y=\\displaystyle\\dfrac{\\sum_{}^{}m^{}_{i}y^{}_{i}}{\\sum_{}^{}m^{}_{i}}~`,
    `~\\bar y=\\dfrac{` + sum_my + `}{` + sum_m + `}~`,
    `~\\bar y=` + coordinate[1] + `~`,
    `Because the ~x~-coordinates are all ~0~, ~\\bar x=` + coordinate[0] + `~`,

    `The centre of mass is therefore ~(` + coordinate[0] + `,` + coordinate[1] + `)~`
  ];
  return steps[step];
};

self.misconception = function (answer) {
  return 0; // Default
};

self.correct_answers = function () {
  return coordinate;
};