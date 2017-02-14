self.ordered_answer = true;
do {
    v1 = math_tools.rand_int(1, 6);
    v2 = math_tools.rand_int(25, 46);
    v3 = math_tools.rand_int(25, 46);
    v4 = math_tools.rand_int(25, 46);
}
while (v1 > v2);
j = math_tools.rand_int(-4, 4, [0, -1, 1]);
k = math_tools.rand_int(-4, 4, [0]);
l = math_tools.rand_int(-4, 4, [0]);

function sum_tex(a, n, r, s) {
    return tex(`\\displaystyle\\sum\_{` + r + `=` + a + `}^{` + n + `}` + s);
}

function sum_a(a, n) {
    var sum = 0;
    for (var i = a; i < n + 1; i++) {
        sum += i * i + k;
    }
    return sum;
}

function math_ngcd(a, b, c) {
    var d = [];
    if (a * b * c === 0) {
        return 1;
    }
    d.push(a, b, c);
    var len = d.length;
    if (math.abs(d[len - 1]) == 1) //这里面有个bug，为甚么1还会被除。
        return 1;
    for (var i = 1; i < len; i++) {
        d[i] = math_tools.gcd(math.abs(d[i - 1]), math.abs(d[i]));
        if (d[i] == 1) {
            return i;
        }
    }
    return d[len - 1];
}


self.text = function () {
    return `Find.` + `<br><br>` + sum_tex(1, `2n`, `r`, `(` + j + `r` + k.signed() + `)^2`) +

        tex(`=`) + tex(`[answer style='inline' keyboard='polynomial_n']`) + `<br><br>` +

        ` Giving your answer in its simplest form`;
};

var sum_formula = {
    f1: "Using the " + sum_tex(1, `n`, `r`, `r`) + tex(`=\\,\\dfrac{n}{2}(n+1)`) + `to calculate<br><br>`,
    f2: `Using the formula ` + sum_tex(1, `n`, `r`, `r^2`) + tex(`=\\,\\dfrac{n}{6}(n+1)(2n+1)`) +
        `to calculate<br><br>`,
    f3: `Using the formula ` + sum_tex(1, `n`, `r`, `r^3`) + tex(`=\\,\\dfrac{n^{2}}{4}(n+1)^{2}\\space`) +
        `to calculate<br><br>`,
    r1: function (n) {
        return tex(`\\dfrac{` + n + `}{2}(` + n + `+` + 1 + `)`);
    },
    r2: function (n) {
        return tex(`\\dfrac{` + n + `}{6}(` + n + `+1)((2\\times` + n + `)+1)`);
    },
    r3: function (n) {
        return tex(`\\dfrac{` + n + `^{2}}{4}(` + n + `+1)^2`);
    },
};

self.step = function (wrong_answer, step) {
    steps = [
        sum_tex(1, `2n`, `r`, `(` + j + `r` + k.signed() + `)^2`) + tex(`\\,=\\,`) + sum_tex(1, `2n`, `r`, `(` + j * j + `r^2` + (2 * j * k).signed() + `r` + (k * k).signed() + `)`),

        tex(`=\\,`) + sum_tex(1, `2n`, `r`, j * j + `r^2`) + tex(`\\,+\\,`) + sum_tex(1, `2n`, `r`, (2 * j * k) + `r`) + tex(`\\,+\\,`) + sum_tex(1, `2n`, `r`, k * k),

        tex(`=\\,` + j * j) + sum_tex(1, `2n`, `r`, `r^2`) + tex(`\\,` + (2 * j * k).signed()) + sum_tex(1, `2n`, `r`, `r`) + tex(`\\,` + (k * k).signed()) + sum_tex(1, `2n`, `r`, 1),

        tex(`=\\,` + j * j + `\\times`) + sum_formula.r2(`2n`) + tex(`\\,` + (2 * j * k).signed() + `\\times`) + sum_formula.r1(`2n`) + tex(`\\,` + (k * k).signed() + `\\times 2n`),

        tex(`=\\,`) + math_visuals.fraction.tex(com, 3) + tex(`n(` + 8 * j * j / com + `n^2` + ((6 * j * j + 12 * j * k) / com).signed() + `n` + ((6 * k * k + 6 * j * k + j * j) / com).signed() + `)`),
    ];
    return steps[step];
};
self.misconception = function (answer) {
    return 0;
};

com = math_tools.ngcd(8 * j * j, (6 * j * j + 12 * j * k), (6 * k * k + 6 * j * k + j * j));
var ans = com / 3 + `*{n}` + `(` + 8 * j * j / com + `*math.pow({n},2)` + ((6 * j * j + 12 * j * k) / com).signed() + `*{n}` + ((6 * k * k + 6 * j * k + j * j) / com).signed() + `)`;
self.correct_answers = function () {
    return [1 / 3 * com, 8 * j * j / com, (6 * j * j + 12 * j * k) / com, (6 * j * j + 12 * j * k) / com];
};