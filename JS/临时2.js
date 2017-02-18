function f(x) {
    var answer = math.pow(x, 3) + v2 * math.pow(x, 2) + v1 * math.pow(x, 1) + v;
    return answer;
}

function g(x) {
    var answer = 3 * math.pow(x, 2) + 2 * v2 * x + v1;
    return answer;
}

do {
    var v3 = math_tools.rand_int(2, 9);
    var v2 = math_tools.rand_int(-10, 10, [-1, 0, 1]);
    var v1 = math_tools.rand_int(-50, 50, [-1, 0, 1]);
    var v = math_tools.rand_int(-50, 50, [-1, 0, 1]);
    var root = math_tools.polynomial(1, v2, v1, v); //一元多次方程求根x^3+v2x^2+v1x+v
    root = Number(root.sort()[root.length - 1]);
    var range_start = Math.floor(root);
    var range_end = range_start + 1;
    var range_near = (math.abs(f(range_start)) >= math.abs(f(range_end))) ? range_end : range_start;
    var k = math_tools.rand_int(1, 2);
}
while (isNaN(root) || f(range_near) / g(range_near) * 1000 % 1 === 0);

var equation = `x^{3}` + v2.signed() + `x^{2}` + v1.signed() + `x` + v.signed();
var equation1 = `3x^2` + (2 * v2).signed() + `x` + v1.signed();

self.ordered_answer = true;
self.precision = 4;

self.text = function () {
    return tex(`f( x )=` + equation) + `

` + tex(`x^{}_0=` + range_near) + ` is a first approximation to a root of this equation

Use the Newton-Raphson process ` + times + ` to obtain a ` + th + ` approximation, ` + tex(x_n) + `

(Tabulate your intermediate steps[exercise_only] as shown[/exercise_only].  Input values to ` + tex(`3`) + ` decimal places when required)

` + tex(x_n) + tex(`=[answer]`);
};


var x_n;
var times;
var th;
var next_conent;
var x1 = math_tools.round(range_near - f(range_near) / g(range_near), 3);
var ans;
switch (k) {
    case 1:
        times = `once`;
        th = `second`;
        x_n = `x^{}_1`;
        content = ``;
        ans = x1;
        break;
    case 2:
        times = `twice`;
        x_n = `x^{}_2`;
        th = `third`;
        var x2 = math_tools.round(x1 - f(x1) / g(x1), 3);
        ans = x2;
        content = (tex(`f(x^{}_1)=f(` + x1 + `)=` + math.round(f(x1), 3)) + `<br>` +

            tex(`f'(x^{}_1)=f'(` + x1 + `)=` + math.round(g(x1), 3)) + `<br>` +

            tex(`x^{}_2=x^{}_1-\\dfrac{f(x^{}_1)}{f'(x^{}_1)}=` + x1 + `-\\dfrac{` + math.round(f(x1), 3) + `}{` + math.round(g(x1), 3) + `}=` + x2)) + ((x2 == x1 - f(x1) / g(x1)) ? `` : ` (to ` + tex(`3`) + ` dp)`);
        break;
}

self.step = function (wrong_answer, step) {
    steps = [
        `The formula for the Newton-Raphson process is ` + tex(`x^{}_{n+1} = x^{}_n-\\dfrac{f(x^{}_n)}{f'(x^{}_n)}`),

        `Since ` + tex(`f( x )=` + equation),

        tex(`f'(x)=` + equation1),

        `Using ` + tex(`x^{}_0=` + range_near),

        tex(`f(x^{}_0)=f(` + range_near + `)=` + f(range_near)) + (math_tools.round(f(range_near), 3) === f(range_near) ? `` : ` (to ` + tex(`3`) + ` dp)`),

        tex(`f'(x^{}_0)=f'(` + range_near + `)=` + g(range_near)) + (math_tools.round(g(range_near), 3) === g(range_near) ? `` : ` (to ` + tex(`3`) + ` dp)`),

        tex(`x^{}_1=x^{}_0-\\dfrac{f(x^{}_0)}{f'(x^{}_0)}=` + range_near + `-\\dfrac{` + f(range_near) + `}{` + g(range_near) + `}=`) + range_near + ((-f(range_near) * g(range_near) < 0) ? `` : tex(` + `)) + math_visuals.fraction.tex(-f(range_near), g(range_near)),

        tex(`x^{}_1=` + x1) + (math_tools.round(range_near - f(range_near) / g(range_near), 3) === (range_near - f(range_near) / g(range_near)) ? `` : ` (to ` + tex(`3`) + ` dp)`),

        content

    ];
    return steps[step];
};

self.misconception = function (answer) {
    return 0; // Default
};

self.correct_answers = function () {
    return [ans];
};