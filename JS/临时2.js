do {
    var v1 = math_tools.rand_int(-4, 8, [0]);
    var v2 = math_tools.rand_int(-6, 8, [0, 1]);
}
while (math.gcd(v1, v2) != 1);
do {
    var v3 = math_tools.rand_int(-4, 8, [0]);
    var v4 = math_tools.rand_int(-6, 8, [0, 1]);
}
while (math.gcd(v3, v4) != 1);
num_form = {
    str: function (x) {
        return (x == 1) ? `` : (x == -1) ? `-` : x;
    },
    signed: function (x) {
        return (x == 1) ? `+` : (x == -1) ? `-` : x.signed();
    },
    tex: function (x) {
        return tex(`` + str(x));
    },
    index: function (x) {
        return (x == 1) ? `` : x;
    },
};

var part1 = num_form.str(v1) + `x` + v2.signed();
var part2 = num_form.str(v3) + `x` + v4.signed();

self.text = function () {
    return `Differentiate each of the following function with respect to ~x~?
~\\bold{e)}\\,\\,\\,\\ln{\\dfrac{` + part1 + `}{` + part2 + `}}~
		[answer keyboard=equation_exk]`;
};

self.post_load = function () {};

self.step_js = function (wrong_answer, step) {};

self.step = function (wrong_answer, step) {
    var steps = [
        `Begin by writeing ~\\ln{\\dfrac{` + part1 + `}{` + part2 + `}}~. as ~\\ln({` + part1 + `})-\\ln{(` + part2 + `)}~`,
        ` ~\\therefore\\dfrac{d}{dx}(\\ln{\\dfrac{` + part1 + `}{` + part2 + `}})=\\dfrac{d}{dx}(\\ln({` + part1 + `})-\\ln{(` + part2 + `)})~`,
        `~\\therefore =` + ((v1 > 0) ? `\\dfrac{` + v1 + `}{` + part1 + `}` : `-\\dfrac{` + (-v1) + `}{` + part1 + `}`) + ((v3 > 0) ? `-\\dfrac{` + (v3) + `}{` + part2 + `}` : `+\\dfrac{` + (-v3) + `}{` + part2 + `}`) + `~`,

    ];
    return steps[step];
};


self.misconception = function (answer) {
    return 0; // Default
};


var ans = new expression((v1) + `*(pow(` + v1 + `*{x}` + v2.signed() + `,-1)` + (-v3).signed() + `*pow(` + v3 + `*{x}` + v4.signed() + `,-1)`);
self.correct_answers = function () {
    return ans;
};