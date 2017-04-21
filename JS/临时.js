var v1 = math_tools.rand_int(1, 4);
var v2 = math_tools.rand_int(1, 9);
var v3 = math_tools.rand_int(1, 9);
var v4 = math_tools.rand_int(1, 4);

var f = function (x) {
    return v4 * (v1 * pow(x, 2) + v2 * x + v3);
};

var equation = `(` + math_visuals.num_form.head(v1) + `x` + math_visuals.num_form.body(v2) + `)(x` + math_visuals.num_form.end(v3) + `)`;

var equation2 = math_visuals.num_form.head(v1) + `x^{2}` + math_visuals.num_form.body(v1 * v3 + v2) + `x` + math_visuals.num_form.end(v3 * v2);

var tangent_equation = math_visuals.num_form.head(v1 * 2) + `x` + math_visuals.num_form.end(v1 * v3 + v2);

self.text = function () {
    return `Differentiate ~f(x)=` + equation + `~

	[answer keyboard='full_xy']`;
};

self.post_load = function () {};

self.step_js = function (wrong_answer, step) {};

self.step = function (wrong_answer, step) {
    var steps = [
        `For this question, you can't use the method 2 of last question because the multiple is not constant. `,

        `But you can multiply out the brackets to get a quadratic which you can then differentiate.`,

        `~f(x)=` + equation + `=` + equation2 + `~`,

        `So ~f'(x)=` + tangent_equation + `~`,

    ];
    return steps[step];
};


self.misconception = function (answer) {
    return 0; // Default
};

var ans = new expression(2 * v1 + `*{x}` + (v1 * v3 + v2).signed());

self.correct_answers = function () {
    return ans;
};