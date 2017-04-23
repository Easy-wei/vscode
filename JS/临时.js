math_quadratic = {
    ans_array: function (a, b, c) { 
        var k = math.pow(b, 2) - 4 * a * c;
        if (k > 0) {
            var k1 = math_visuals.root.integer_part(k);
            var k2 = math_visuals.root.sqrt_part(k);
            var com = math.gcd(b, k1, 2 * a);
            if (math.pow(k1, 2) == k) {
                return [math_visuals.fraction.str((-b + k1), 2 * a), math_visuals.fraction.str((-b - k1), 2 * a)];
            }
            b = b / com;
            k1 = k1 / com;
            var k3 = math.abs(a * 2 / com);
            return (a > 0) ? (k3 == 1) ? [(-b) + math_visuals.num_form.body(k1) + k2, (-b) + math_visuals.num_form.body(-k1) + k2] : [`\\dfrac{` + (-b) + math_visuals.num_form.body(k1) + k2 + `}{` + k3 + `}`, `\\dfrac{` + (-b) + math_visuals.num_form.body(-k1) + k2 + `}{` + k3 + `}`] :
                (k3 == 1) ? [(b) + math_visuals.num_form.body(-k1) + k2, (b) + math_visuals.num_form.body(k1) + k2] : [`\\dfrac{` + (-b) + math_visuals.num_form.body(k1) + k2 + `}{` + k3 + `}`, `\\dfrac{` + (b) + math_visuals.num_form.body(k1) + k2 + `}{` + k3 + `}`];
        } else if (k === 0) {
            return [math_visuals.fraction.str(-b, 2 * a)];
        }
    },
    str: function (a, b, c, x = `x`) {
        switch (math_quadratic.ans_array(a, b, c).length) {
            case 1:
                return x + `=` + ans_array[0];
            case 2:
                return x + `^{}_{1}=` + ans_array[0] + `, \\space` + x + `^{}_{2}=` + ans_array[1];
        }
    },
    tex: function (a, b, c, x = `x`) {
        return tex(math_quadratic.str(a, b, c, x = `x`));
    },
};