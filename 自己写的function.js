function toTex(matrix) {
    return tex(`\\begin{bmatrix}` + matrix.map(function(line) {
        return line.join(`&`);
    }).join(`\\cr`) + `\\end{bmatrix}`);
}

//多个数的求最大公约数
function math_ngcd() {
    var arry = Array.prototype.slice.call(arguments);
    var a = arry[0];
    for (var i = 0; i < arry.length; i++) {
        if (arry[i] == 1 || arry[i] === 0) {
            return 1;
        }
        a = math_tools.gcd(math.abs(arry[i]), a);
    }
    return a;
}

// arry的随机调用
x1 = p[Math.floor(Math.random() * p.length)];

//多答案的表达
`[answers min='0' max='4' label_0='C=' label_2='` + tex('\\and') + `']`
    //冒泡算法
    //已经有了，可以用arr.sort()
function bubble_sort(arry) {
    len = arry.length;
    k = len;
    for (var i = 0; i < len; i++) {
        var p = 1;
        for (var j = 1; j < k; j++) {
            if (arry[j - 1] > arry[j]) {
                var a = 0;
                a = arry[j];
                arry[j] = arry[j - 1];
                arry[j - 1] = a;
                k = j;
                p = 0;
            }
        }
        if (p == 1) {
            break;
        }
    }
    return arry;
}

//frac
var frac = {
    str: function(a, b) {
        var com = math_tools.gcd(math.abs(a), math.abs(b));
        if (b === 0) {
            throw "the denominator can not be 0";
        }
        a = a / com;
        b = b / com;
        var j = math.abs(a) % math.abs(b);
        var k = (math.abs(a) - math.abs(j)) / math.abs(b);
        return (a * b >= 0) ? (j === 0) ? `` + k : `\\dfrac{` + math.abs(a) + `}{` + math.abs(b) + `}` :
            (j === 0) ? `-` + k : `-\\dfrac{` + math.abs(a) + `}{` + math.abs(b) + `}`;
    },
    tex: function(a, b) {
        return tex(frac.str(a, b));
    },
};



//sum中的一些step所用的表达式
var sum_formula = {
    f1: `Using the formula` + sum_tex(1, `n`, `r`, `r`) + tex(`=\\,\\dfrac{n}{2}(n+1)`) + `to calculate<br><br>`,
    f2: `Using the formula ` + sum_tex(1, `n`, `r`, `r^2`) + tex(`=\\,\\dfrac{n}{6}(n+1)(2n+1)`) +
        `to calculate<br><br>`,
    f3: `Using the formula ` + sum_tex(1, `n`, `r`, `r^3`) + tex(`=\\,\\dfrac{n^{2}}{4}(n+1)^{2}\\space`) +
        `to calculate<br><br>`,
    r1: function(n = ` n`) {
        return tex(`\\dfrac{` + n + `}{2}(` + n + `+` + 1 + `)`);
    },
    r2: function(n = ` n`) {
        return tex(`\\dfrac{` + n + `}{6}(` + n + `+1)(2\\times` + n + `+1)`);
    },
    r3: function(n = ` n`) {
        return tex(`\\dfrac{` + n + `^{2}}{4}(` + n + `+1)^2`);
    },
};
// 开跟形式

var root = {
    str: function(n = ` n`) {
        var a = 1;
        var b = 1;
        if (typeof n === "string") {
            return [`\\sqrt{` + n + `}`, a, `\\sqrt{` + n + `}`];
        }
        var arry = math_tools.primes_below(math.ceil(math.sqrt(n) + 1));
        var arry2 = [];
        for (var i = 0; i < arry.length; i++) {
            for (var m = 0; m < n; m++) {
                if (n % (arry[i] * arry[i]) === 0) {
                    arry2.push(arry[i]);
                    n = n / (arry[i] * arry[i]);
                } else {
                    break;
                }
            }
        }

        if (arry2.length === 0) {
            return [`\\sqrt{` + n + `}`, a, `\\sqrt{` + n + `}`];
        } else {
            for (var j = 0; j < arry2.length; j++) {
                b = arry2[j];
                a = a * b;
            }
            return (n == 1) ? [a, a, 1] : [a + `\\sqrt{` + n + `}`, a, `\\sqrt{` + n + `}`];
        }
    },
    tex: function(n) {
        return tex(root.str(n)[0]);
    },

    integer_part: function(n) {
        return root.str(n)[1];
    },
    sqrt_part: function(n) {
        return root.str(n)[2];
    },
};

math_visuals.quadratic = {
    str: function(a, b, c) {
        if ((math_tools.quadratic(a, b, c)[0] * 10) % 1 !== 0) {
            return ` p^{}_1=\\,\\dfrac{` + (-b) + `+` + math_visuals.root.str(b * b - 4 * a * c) + `}{` + 2 * a + `}\\space
                p^{}_2=\\,\\dfrac{` + (-b) + `-` + math_visuals.root.str(b * b - 4 * a * c) + `}{` + 2 * a + `}`;
        } else {
            return `p^{}_1=\\,` + math_tools.quadratic(a, b, c)[0] + `\\space\\space\\space` +
                `p^{}_2=\\,` + math_tools.quadratic(a, b, c)[1];
        }
    },
    tex: function(a, b, c) {
        return tex(math_visuals.quadratic.str(a, b, c));
    },
};


常用得几个函数调用方式
console.log(math_visuals.root.str(22));
console.log(math_visuals.root.tex(22));
console.log(math_visuals.fraction.str(78, 12));
console.log(math_visuals.fraction.tex(78, 12));
console.log(math_visuals.matrix.str([
    [1, 2],
    [3, 4]
]));
console.log(math_visuals.matrix.tex([
    [1, 2],
    [3, 4]
]));


//stefan写的[answer]无序输入皆可的方式;
// You can specify if the answers are ordered or not like so:
self.ordered_answer = true;
// If you do not specify, the default is false
//In case self.ordered_answer == false (default) and there are multiple inputs, we can return like this
//return [1, 2];
// Here both [1, 2] and [2, 1] are correct answers

// In case self.ordered_answer == true and we have more than one input
//return [1, 2];
// Here only [1, 2] is correct, [2, 1] is not correct

// In case self.ordered_answer == true and we have more than one input and also different combinations of correct results
//return [[1,2,3],[3,2,1]];
// Here only [1,2,3] and [3,2,1] are correct answers, [2,1,3] for example is not correct

//一元二次方程解的形式：一下四个函数要一块用的 分别是test函数，quadratic对象，root对象，math_ngcd()四个。
var quadratic = {
    str: function(a, b, c) {
        if (((math_tools.quadratic(a, b, c)[0]) * 10) % 1 !== 0) {
            return ` x_1=\\,` + `\\dfrac{` + (-b) + `+` + root.str(b * b + `-4\\times` + a + `\\times` + c) + `}{2\\times` + a + `}\\space
            x_2=\\,` + `\\dfrac{` + (-b) + `-` + root.str(b * b + `-4\\times` + a + `\\times` + c) + `}{2\\times` + a + `}`;
        }
    },
    tex: function(a, b, c) {
        return tex(quadratic.str);
    },
};

function math_ngcd(a, b, c) {
    var arry = [];
    if (a * b * c === 0) {
        return 1;
    }
    arry.push(a, b, c);
    var len = arry.length;
    for (var i = 1; i < len; i++) {
        if (arry[i] == 1) {
            return 1;
        }
        arry[i] = math_tools.gcd(math.abs(arry[i - 1]), math.abs(arry[i]));
    }
    return arry[len - 1];
}

function test(n) {
    return (n == 1) ? `` : (n == -1) ? `-` : n;
}

math_quadratic = {
    str: function(a, b, c) {
        var m = Number(math_tools.quadratic(a, b, c)[0]);
        var k = math.pow(b, 2) - 4 * a * c;
        if (k > 0) {
            if ((m) % 1 !== 0) {
                var k1 = root.integer_part(k);
                var k2 = root.sqrt_part(k);
                //console.log(typeof k1,k1,`ss`,typeof k2,k2);
                var com = math_ngcd(b, k1, 2 * a);
                b = b / com;
                k1 = k1 / com;
                var k3 = a * 2 / com;
                return (k3 == 1) ? `a^{}_1=\\,` + (-b) + `+` + test(k1) + k2 + `\\space
                        a^{}_1=\\,` + (-b) + `-` + test(k1) + k2 :
                    ` a^{}_1=\\,\\dfrac{` + (-b) + `+` + test(k1) + k2 + `}{` + k3 + `}\\space
                  a^{}_2=\\,\\dfrac{` + (-b) + `-` + test(k1) + k2 + `}{` + k3 + `}`;
            } else {
                return `a^{}_1=\\,` + math_tools.quadratic(a, b, c)[0] + `\\space\\space\\,` +
                    `a^{}_2=\\,` + math_tools.quadratic(a, b, c)[1];
            }
        } else if (k === 0) {
            return (m % 1 === 0) ? `a^{}=\\,` + math_tools.quadratic(a, b, c)[0] :
                math_visuals.fraction.str(-b, 2 * a);
        }

    },
    tex: function(a, b, c) {
        return tex(math_quadratic.str(a, b, c));
    },
};


math_visuals.root = {
    process: function(n = ` n`) {
        var a = 1;
        var b = 1;
        if (typeof n === "string") {
            return [`\\sqrt{` + n + `}`, a, `\\sqrt{` + n + `}`];
        }
        if (n == 1) {
            return [1, 1, 1 + ``];
        }
        if (n === 0) {
            return [0, 0, 0 + ``];
        }
        var arry = math_tools.primes_below(math.ceil(math.sqrt(n) + 1));
        var arry2 = [];
        for (var i = 0; i < arry.length; i++) {
            for (var m = 0; m < n; m++) {
                if (n % (arry[i] * arry[i]) === 0) {
                    arry2.push(arry[i]);
                    n = n / (arry[i] * arry[i]);
                } else {
                    break;
                }
            }
        }
        if (arry2.length === 0) {
            return [`\\sqrt{` + n + `}`, a, `\\sqrt{` + n + `}`];
        } else {
            for (var j = 0; j < arry2.length; j++) {
                b = arry2[j];
                a = a * b;
            }
            return (n == 1) ? [a, a, 1] : [a + `\\sqrt{` + n + `}`, a, `\\sqrt{` + n + `}`];
        }
    },
    str: function(n) {
        return `` + math_visuals.root.process(n)[0];
    },
    tex: function(n) {
        return tex(math_visuals.root.str(n));
    },
    integer_part: function(n) {
        return math_visuals.root.process(n)[1];
    },
    sqrt_part: function(n) {
        return math_visuals.root.process(n)[2];
    },
};



//二分中值fa
function inter_bisection(x, y) { //interval bisection
    var a = x;
    var b = y;
    var c;
    var arry = [
        [`a`, `f(a)`, `b`, `f(b)`, `c`, `f(c)`]
    ];
    for (var i = 0; i < 10; i++) {
        c = (a + b) / 2;
        var arry1 = [];
        arry1[0] = math.round(a, 4);
        arry1[1] = math.round(f(a), 4);
        arry1[2] = math.round(b, 4);
        arry1[3] = math.round(f(b), 4);
        arry1[4] = math.round(c, 4);
        arry1[5] = math.round(f(c), 4);
        if (f(a) * f(c) < 0) {
            if (math.round(a, 1) == math.round(c, 1)) {
                ans = math.round(c, 1);
                break;
            }
            a = a;
            b = c;
        }
        if (f(b) * f(c) < 0) {
            if (math.round(b, 1) == math.round(c, 1)) {
                ans = math.round(c, 1);
                break;
            }
            a = c;
            b = b;
        }
    }
    return arry;
}
//线性插值法
function linear_interpolation(x, y) { //linear interpolation
    var a = x;
    var b = y;
    var c;
    var arry = [
        [`a`, `f(a)`, `b`, `f(b)`, `c`, `f(c)`]
    ];
    for (var i = 0; i < 10; i++) {
        c = (a * math.abs(f(b)) + b * math.abs(f(a))) / (math.abs(f(a)) + math.abs(f(b)));
        var arry1 = [];
        arry1[0] = math.round(a, 4);
        arry1[1] = math.round(f(a), 4);
        arry1[2] = math.round(b, 4);
        arry1[3] = math.round(f(b), 4);
        arry1[4] = math.round(c, 4);
        arry1[5] = math.round(f(c), 4);
        arry.push(arry1);
        if (f(a) * f(c) < 0) {
            if (math.round(b, 1) == math.round(c, 1)) {
                ans = math.round(c, 1);
                break;
            }
            a = a;
            b = c;
        }
        if (f(b) * f(c) < 0) {
            if (math.round(a, 1) == math.round(c, 1)) {
                ans = math.round(c, 1);
                break;
            }
            a = c;
            b = b;
        }
    }
    return arry;
}

//线性微分法
function diff_iteration(x) { //differential_interation
    var x1 = x;
    var arry = [
        [`x`, `f(x)`, `f'(x)`, `x`]
    ];
    for (var i = 0; i < 10; i++) {
        var arry1 = [];
        x1 = x - f(x) / g(x);
        arry1[0] = math.round(x, 4);
        arry1[1] = math.round(f(x), 4);
        arry1[2] = math.round(g(x), 4);
        arry1[3] = math.round(x1, 4);
        arry.push(arry1);
        if (math_tools.round(x, 2) == math_tools.round(x1, 2)) {
            ans = math_tools.round(x, 2);
            break;
        }
        x = x1;
    }
    return arry;
}

function arry_to_table(arry) {
    return `<table border='1' cellspacing='0'  cellpadding='5'><tr><td align='center'>` + arry.map(function(line) {
        return line.join(`</td ><td align='center'>`);
    }).join(`</tr><tr><td align='center'>`) + `</td ></tr></table>`;
}

math_visuals['array_to_table'] = function(array) {
    return `<table border='1' cellspacing='0'  cellpadding='5'><tr><td>` + array.map(function(line) { return line.join(`</td><td>`); }).join(`</tr><tr><td>`) + `</td></tr></table>`;
}

function changeTwoDecimal_f(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        alert('function:changeTwoDecimal->parameter error');
        return false;
    }
    f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}


math_tools["round"] = function(number, decimals) {
    if (decimals == null) {
        decimals = 0;
    }
    number = (number >= 0) ? Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals) :
        -Math.round(Math.abs(number) * Math.pow(10, decimals)) / Math.pow(10, decimals);
    var s_x = number.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
};

