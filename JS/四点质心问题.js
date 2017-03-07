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
    var m4 = math_tools.rand_int(1, 6);
    var x_array = diff_random(4);
    var y_array = diff_random(4);
    var array = [ //格式是：质量，坐标（x，y）。也就是[m,[x,y]]
        [m1, [x_array[0], y_array[0]]],
        [m2, [x_array[1], y_array[1]]],
        [m3, [x_array[2], y_array[2]]],
        [m4, [x_array[3], y_array[3]]],
    ];
    var coordinate = centre_cal(array);
}
while (coordinate[0] % 1 !== 0 || coordinate[1] % 1 !== 0);
console.log(coordinate);
self.text = function () {
    return `Find the position of the centre of mass of four particles of masses ~` + array[0][0] + `kg\\,\\,` + array[1][0] + `kg\\,\\,` + array[2][0] + `kg\\,` +
        `~ and ~` + array[3][0] + `kg ` + `~ placed on the ~x~-axis at the points
(` + array[0][1][0] + ` , ` + array[0][1][1] + `) (` + array[1][1][0] + ` , ` + array[1][1][1] + `) (` + array[2][1][0] + ` , ` + array[2][1][1] + `) (` + array[3][1][0] + ` , ` + array[3][1][1] + `) respectively.
		([answer style='inline'] , [answer style='inline'])`;
};


self.step = function (wrong_answer, step) {
    var steps = [

        `~\\displaystyle\\sum m_{i}=m_{1}+m_{2}+m_{3}+m_{4}=` + m1 + `+` + m2 + `+` + m3 + `+` + m4 + `~`,
        `~=` + (sum_m) + `~`,

        /*  
        `We can find ~\\bar x~, the average ~x~-coordinate, using the formula ~\\displaystyle\\sum_{}^{}m^{}_{i}x_^{}_{i}=\\bar x\\sum_{}^{}m_{i}~`,

        `~\\displaystyle\\sum_{}^{}m_{i}x_{i}=\\bar x\\sum_{}^{}m_{i}~`,

        `~\\displaystyle\\sum_{}^{}m_{i}x_{i}~`,
        `~=` + m1 + `\\times` + array[0][1][0] + `+` + m2 + `\\times` + array[1][1][0] + `+` + m3 + `\\times` + array[2][1][0] + `+` + m4 + `\\times` + array[3][1][0] + `~`,
        `~=` + (sum_mx) + `~`,
        `~\\bar x=\\displaystyle\\dfrac{\\sum_{}^{}m_{i}x_{i}}{\\sum_{}^{}m_{i}}~`,
        `~\\bar x=\\dfrac{` + sum_mx + `}{` + sum_m + `}~`,
        `~\\bar x=` + coordinate[0] + `~`,
        */
        `We can find ~\\bar y~, the average ~y~-coordinate, using the formula ~\\displaystyle\\sum_{}^{}m^{}_{i}y^{}_{i}=\\bar y\\sum_{}^{}m_{i}~`,
        `~\\displaystyle\\sum_{}^{}m_{i}y_{i}=\\bar y\\sum_{}^{}m_{i}~`,
        `~\\displaystyle\\sum_{}^{}m_{i}y_{i}~`,
        `~=` + m1 + `\\times` + array[0][1][1] + `+` + m2 + `\\times` + array[1][1][1] + `+` + m3 + `\\times` + array[2][1][1] + `+` + m4 + `\\times` + array[3][1][1] + `~`,
        `~=` + (sum_my) + `~`,
        `~\\bar y=\\displaystyle\\dfrac{\\sum_{}^{}m_{i}y_{i}}{\\sum_{}^{}m_{i}}~`,
        `~\\bar y=\\dfrac{` + sum_my + `}{` + sum_m + `}~`,
        `~\\bar y=` + coordinate[1] + `~`,


        `Then centre of mass is (` + coordinate[0] + `,` + coordinate[1] + `)`
    ];
    return steps[step];
};

self.misconception = function (answer) {
    return 0; // Default
};

self.correct_answers = function () {
    return coordinate;
};