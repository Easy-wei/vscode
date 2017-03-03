self.ordered_answer = true;
self.precision = 2;

var sum_m, sum_mx, sum_my;

function diff_random(num, min = 1, max = 10) {
  var array = [];
  var k = 0;
  var a;
  array.push(math.randomInt(min, max));
  for (var i = 1; i < num; i++) {
    k = 0;
    a = math_tools.rand_int(min, max);
    for (var j = 0; j < array.length; j++) {
      if (a == array[j]) {
        k = 1;
        break;
      }
    }
    if (k == 1) {
      i = i - 1; //又是这里的坑，导致如果k==1，continue了，数组却没添加上元素，i却也跟着上去了，所以这种情况下，i要－1
      continue;
    } else {
      array.push(a);
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
var x_array=[];
var y_array=[];

do {
  switch (v1) {
    case 1:
      function1 = `~x-y=0~`;
      x_array = diff_random(2, 1, 8);
	  x_array.push(0);
	  x_array = math.sort(x_array);
      y_array = x_array.map(function (x) { return x;});
      coordinate_range = [-3, 8, -3, 9];
      break;
    case 2:
      function1 = `~y-2x=0~`;
      x_array = diff_random(2, 1, 5);
	  x_array.push(0);
	  x_array = math.sort(x_array);
      y_array = x_array.map(function (x) { return x * 2;});
      coordinate_range = [-3, 6, -3, 11];
      break;
    case 3:
      function1 = `~y-3x=0~`;
      x_array = diff_random(2, 1, 3);
	  x_array.push(0);
	  x_array = math.sort(x_array);
      y_array = x_array.map(function (x) { return x * 3;});
      coordinate_range = [-5, 5, -3, 10];
      break;
    case 4:
      function1 = `~x+y=0~`;
      x_array = diff_random(2, 1, 7);
	  x_array.push(0);
	  x_array = math.sort(x_array);
      y_array = x_array.map(function (x) { return -x;});
      coordinate_range = [-3, 8, -8, 8];
      break;
  }

  var m1 = math_tools.rand_int(1, 6);
  var m2 = math_tools.rand_int(1, 6);
  var m3 = math_tools.rand_int(1, 6);
  var array = [ //格式是：质量，坐标（x，y）。也就是[m,[x,y]]
    [m1, [x_array[0], y_array[0]]],
    [m2, [x_array[1], y_array[1]]],
    [m3, [x_array[2], y_array[2]]],
  ];
  var coordinate = centre_cal(array);
}
while (coordinate[0] % 1 !== 0 || coordinate[1] % 1 !== 0);
console.log(coordinate);
self.text = function () {
  return `<div id="graph_1"></div>Three particles ~A, B~ and ~C~ have masses ~` + array[0][0] + `kg,` + array[1][0] + `kg ~ and ~` + array[2][0] + `kg~ respectively.

The particles are placed on the line with equation `+function1+`. Particles ~A, B~ and ~C~ are  at the points with coordinates 

~(` + array[0][1][0] + ` , ` + array[0][1][1] + `)~, ~ (` + array[1][1][0] + ` , ` + array[1][1][1] + `)~ and ~ (` + array[2][1][0] + ` , ` + array[2][1][1] + `)~ respectively.

Find the coordinates of the centre of mass of the three particles.

		~\\bigl([answer style='inline'] , [answer style='inline']\\bigr)~`;
};

console.log(coordinate_range);
self.post_load = function () {
  var g1 = new graphic({'input_element': "graph_1",  'low_x': coordinate_range[0],    'high_x': coordinate_range[1] , 'low_y': coordinate_range[2],    'high_y': coordinate_range[3]      });

  g1.add_element({'type': 'dot',    'pos': [array[0][1][0],array[0][1][1]] });
  g1.add_element({'type': 'label', 'pos': [array[0][1][0],array[0][1][1]+1.2], 'text': 'A'});
    g1.add_element({'type': 'label', 'pos': [array[0][1][0],array[0][1][1]+0.5], 'text': array[0][0]+'kg'});
    g1.add_element({'type': 'label', 'pos': [array[0][1][0],array[0][1][1]-1], 'text': '('+array[0][1][0]+','+array[0][1][1]+')'});
  g1.add_element({'type': 'dot',    'pos': [array[1][1][0],array[1][1][1]] });
  g1.add_element({'type': 'label', 'pos': [array[1][1][0],array[1][1][1]+0.5], 'text': 'B'});
  g1.add_element({'type': 'dot',    'pos': [array[2][1][0],array[2][1][1]] });
  g1.add_element({'type': 'label', 'pos': [array[2][1][0],array[2][1][1]+0.5], 'text': 'C'});
  g1.add_element({'type': 'line_stroked',    'start': [array[0][1][0], array[0][1][1]],    'end': [array[2][1][0], array[2][1][1]]  });
  g1.draw();
};


self.step = function (wrong_answer, step) {
  var steps = [
	`the particles are placed on the line with equation `+function1,
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