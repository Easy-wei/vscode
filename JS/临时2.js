    var v1;
    var v2;
    var v3;
    var v5 = math_tools.rand_int(2, 6, [0]);
    var v4 = math_tools.rand_int(-4, 6, [0]);

    do {
        do {
            v2 = math.randomInt(2, 6);
            v3 = math.randomInt(2, 6);
        }
        while (v2 >= v3);

        do {
            v1 = math_tools.rand_int(2, 6, [0]);
            v4 = math_tools.rand_int(2, 6, [0]);
            v5 = math_tools.rand_int(2, 6, [0]);
        }
        while (math.gcd(v1, v4) != 1 || v5 == v1);
        var v6 = (1 - v4) / v1;
    }

    while (v6 % 1 !== 0);
    console.log(v6);

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
        str1: function (x) {
            return (x == 1) ? `` : x;
        },
    };

    var limits = `\\limits_{` + v2 + `}^{` + v3 + `}`;
    var part1 = num_form.str(v1) + `x` + v4.signed();

    self.text = function () {
        return `~\\,~Given that ~\\dfrac{dy}{dx}=\\dfrac{` + v5 + `}{` + part1 + `}~, and that the graph of ~\\mathrm{y}~ against ~x~ passes throught the point ~(` + v6 + `,` + math_visuals.fraction.str(v5, v1) + `e+1)~,
find ~\\mathrm{y}~  in term of ~x~
		~\\mathrm{y}=~[answer keyoard='equation_exk']`;
    };

    self.post_load = function () {};

    self.step_js = function (wrong_answer, step) {};

    self.step = function (wrong_answer, step) {
        var steps = [
            `~f'(x)=\\dfrac{dy}{dx}=\\dfrac{` + v5 + `}{` + part1 + `}~`,
            `~\\therefore f(x)=\\int{\\dfrac{` + v5 + `}{` + part1 + `}}dx~`,
            `~\\therefore f(x)=` + math_visuals.fraction.str(v5, v1) + `\\int{\\dfrac{1}{` + part1 + `}}d(` + part1 + `)~`,
            `~\\therefore f(x)=` + math_visuals.fraction.str(v5, v1) + `e^{` + part1 + `}+k~`,
            `~\\because f(` + v6 + `)=` + math_visuals.fraction.str(v5, v1) + `e+k=` + math_visuals.fraction.str(v5, v1) + `e+1~`,
            `~\\therefore k=1~`,
            `~\\mathrm{y}=` + math_visuals.fraction.str(v5, v1) + `e^{` + part1 + `}+1~`,
        ];
        return steps[step];
    };


    self.misconception = function (answer) {
        return 0; // Default
    };
    var ans = v5 / v1 + `*(pow({e},` + (v1 + `*{x}` + v4.signed()) + `))+1`;
    self.correct_answers = function () {
        return [ans];
    };