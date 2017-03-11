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

do {
  var m1 = math_tools.rand_int(1, 6);
  var m2 = math_tools.rand_int(1, 6);
  var m3 = math_tools.rand_int(1, 6);
  var x_array=diff_random(3,1,9);
  var y_array=diff_random(3,1,9);
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
  return `<div id="graph_1"></div>A system of three particles consists of ~`+array[0][0]+`kg~ placed at the points

~(` + array[0][1][0] + ` , ` + array[0][1][1] + `), `+array[1][0]+`kg`+`~ placed at ~` +`(` + array[1][1][0] + ` , ` + array[1][1][1] + `),~ and ~`+array[2][0]+`kg ~ placed at ~(` + array[2][1][0] + ` , ` + array[2][1][1] + `)~respectively.

Find the coordinates of the centre of mass of the particles.

		~\\bigl([answer style='inline'] , [answer style='inline']\\bigr)~`;
};


coordinate_range = [-3, 12, -3, 12];//调节坐标轴的大小比例
self.post_load = function () {
  var g1 = new graphic({'input_element': "graph_1",  'low_x': coordinate_range[0],    'high_x': coordinate_range[1] , 
						'low_y': coordinate_range[2],    'high_y': coordinate_range[3]      });
  
  g1.add_element({'type': 'grid',    'x_label': 'x Real',    'y_label': 'y Imaginary'  });
  
  g1.add_element({'type': 'dot',    'pos': [array[0][1][0],array[0][1][1]] });
  
  g1.add_element({'type': 'label', 'pos': [array[0][1][0]-0.5,array[0][1][1]+0.5], 'text': 'A'});
  
  g1.add_element({'type': 'dot',    'pos': [array[1][1][0],array[1][1][1]] });
  
  g1.add_element({'type': 'label', 'pos': [array[1][1][0],array[1][1][1]+0.5], 'text': 'B'});
  
  g1.add_element({'type': 'dot',    'pos': [array[2][1][0],array[2][1][1]] });
  
  g1.add_element({'type': 'label', 'pos': [array[2][1][0]-0.5,array[2][1][1]+0.5], 'text': 'C'});
  
  //g1.add_element({'type': 'dot',    'pos': [coordinate[0],coordinate[1]] });//答案坐标点
  
  g1.draw();
};


self.step = function (wrong_answer, step) {
  var steps = [
	`<div id='graph_6'></div>`,
    `The sum of the masses ~\\displaystyle\\sum m^{}_{i}=`+sum_m+`~`,

	`~`+array[0][0]+`~`+math_visuals.matrix.tex([[array[0][1][0]],[array[0][1][1]]])+`~+`+array[1][0]+`~`+math_visuals.matrix.tex([[array[1][1][0]],[array[1][1][1]]])+`~+`+array[2][0]+`~`+math_visuals.matrix.tex([[array[2][1][0]],[array[2][1][1]]])+`~=`+sum_m+`~`+math_visuals.matrix.tex([[`\\bar x`],[`\\bar y`]]),
	
	`~\\therefore\\,~`+math_visuals.matrix.tex([[sum_mx],[sum_my]])+`~=`+sum_m+`~`+math_visuals.matrix.tex([[`\\bar x`],[`\\bar y`]]),

    `It's easy to find the `+math_visuals.matrix.tex([[`\\bar x`],[`\\bar y`]])+`=`+math_visuals.matrix.tex([[coordinate[0]],[coordinate[1]]]),

    `The centre of mass is therefore ~(` + coordinate[0] + `,` + coordinate[1] + `)~`,
  ];
  return steps[step];
};

self.step_js = function (wrong_answer, step) {
    if (step === 0) {
        return function () {
            g6 = new graphic({
                'input_element': "graph_6",'low_x': coordinate_range[0],    'high_x': coordinate_range[1] , 
						'low_y': coordinate_range[2],    'high_y': coordinate_range[3] });
            g6.add_element({
                'type': 'grid'            });
            g6.draw();
        };
    } else if (step === 1) {
        return function () {
  g6.add_element({'type': 'dot',    'pos': [array[0][1][0],array[0][1][1]] });
  
  g6.add_element({'type': 'label', 'pos': [array[0][1][0]-0.5,array[0][1][1]+0.5], 'text': 'A'});
  
  g6.add_element({'type': 'dot',    'pos': [array[1][1][0],array[1][1][1]] });
  
  g6.add_element({'type': 'label', 'pos': [array[1][1][0],array[1][1][1]+0.5], 'text': 'B'});
  
  g6.add_element({'type': 'dot',    'pos': [array[2][1][0],array[2][1][1]] });
  
  g6.add_element({'type': 'label', 'pos': [array[2][1][0]-0.5,array[2][1][1]+0.5], 'text': 'C'});
  
  g6.add_element({'type': 'dot',    'pos': [coordinate[0],coordinate[1]] });//答案坐标点
		  
  g6.add_element({'type': 'label', 'pos': [coordinate[0],coordinate[1]+1], 'text': 'G'});
            g6.draw();
        };
    }
};


self.misconception = function (answer) {
  return 0; // Default
};

self.correct_answers = function () {
  return coordinate;
};