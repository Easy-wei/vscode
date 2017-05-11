self.ordered_answer = true;

do {
    a1 = math_tools.rand_int(-4, 4);
    a2 = math_tools.rand_int(-4, 4);
    a3 = math_tools.rand_int(-4, 4);
    a4 = math_tools.rand_int(-4, 4);
    det_a = a1 * a4 - a2 * a3;
}
while (det_a === 0);

do {
    b1 = math_tools.rand_int(-4, 4);
    b2 = math_tools.rand_int(-4, 4);
    b3 = math_tools.rand_int(-4, 4);
    b4 = math_tools.rand_int(-4, 4);
    b5 = math_tools.rand_int(-4, 4);
    b6 = math_tools.rand_int(-4, 4);
}
while ((b1 == b2 && b4 == b5) || (b2 == b3 && b5 == b6) || (b1 == b3 && b4 == b6));


matrix_a = [    [a1, a2],    [a3, a4]];

matrix_r = [    [b1, b2, b3],    [b4, b5, b6]];

matrix_c = math.multiply(matrix_a, matrix_r);

com = math.gcd(a1, a2, a3, a4, det_a);

matrix_a_inv = [    [a4 / com, -a2 / com],    [-a3 / com, a1 / com]];

A = [matrix_c[0][0], matrix_c[1][0]];
B = [matrix_c[0][1], matrix_c[1][1]];
C = [matrix_c[0][2], matrix_c[1][2]];


self.text = function () {
    return `The matrix ` + tex(`\\bold{A}=\\,`) + math_visuals.matrix.tex(matrix_a) + ` transforms the  triangle ` + tex(`PQR`) + ` into the triangle ` + tex(`(PQR)'`) + `, with coordinates 

      ` + tex(`(` + A + `) \\space (` + B + `) \\space (` + C + `)`) + `<br><br>` + ` Find the coordinates of ` + tex(`P, Q`) + ` and ` + tex(`R`) + ` ` + `

      ` + tex(`([answer style='inline'],[answer style='inline']) \\rightarrow ( ` + A + ` ) `) + `
	  ` + tex(`([answer style='inline'],[answer style='inline']) \\rightarrow ` + ` ( ` + B + ` )`) + `
	  ` + tex(`([answer style='inline'],[answer style='inline']) \\rightarrow` + `( ` + C + ` )`);
};

self.step_js = function () {};

self.step = function (wrong_answer, step) {
    steps = [

        "The coordinates of " + tex(`(PQR)'`) + " can be represented by the matrix " + tex(`\\bold{T'}=`) + math_visuals.matrix.tex(matrix_c),

        "The coordinates of " + tex(`(PQR)`) + " are then represented by the matrix " + tex(`\\bold{T}`),

        tex(`\\bold{A}\\times\\bold{T}=\\bold{T'}`),

        tex(`\\bold{A^{-1}}\\bold{A}\\times\\bold{T}=\\bold{A^{-1}}\\bold{T'}`),

        tex(`\\therefore\\space\\bold{T}=\\bold{A^{-1}}\\bold{T'}`),

        "We then find the matrix " + tex(`\\bold{A^{-1}}`),

        tex(`\\space\\bold{A^{-1}}=\\,`) + math_visuals.fraction.tex(1, det_a / com) + math_visuals.matrix.tex(matrix_a_inv),

        tex(`\\therefore\\,\\bold{T}=\\,`) + math_visuals.fraction.tex(1, det_a / com) + math_visuals.matrix.tex(matrix_a_inv) + math_visuals.matrix.tex(matrix_c) + `<br>`,

        tex(`\\bold{T}=\\,`) + math_visuals.matrix.tex(matrix_r)

    ];
    return steps[step];
};

self.misconception = function (answer) {
    return 0; // Default
};

self.correct_answers = function () {
    return [b1, b4, b2, b5, b3, b6];
};