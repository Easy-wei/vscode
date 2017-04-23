function toTex(matrix) {
    return tex(`\\begin{bmatrix}` + matrix.map(function (line) {
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
    var len = arry.length;
    var a = 0;
    var k1 = 0;
    var k2 = 0;
    var k = len;
    for (var i = 0; i < len; i++) {
        k2 = 0;
        for (var j = 1; j < k; j++) {
            if (arry[j - 1] > arry[j]) {
                a = arry[j];
                arry[j] = arry[j - 1];
                arry[j - 1] = a;
                k2 = 1;
                k1 = j;
            }
        }
        k = k1;
        if (k2 === 0) {
            break;
        }
    }
    return arry;
}

//frac
var frac = {
    str: function (a, b) {
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
    tex: function (a, b) {
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
    r1: function (n = ` n`) {
        return tex(`\\dfrac{` + n + `}{2}(` + n + `+` + 1 + `)`);
    },
    r2: function (n = ` n`) {
        return tex(`\\dfrac{` + n + `}{6}(` + n + `+1)(2\\times` + n + `+1)`);
    },
    r3: function (n = ` n`) {
        return tex(`\\dfrac{` + n + `^{2}}{4}(` + n + `+1)^2`);
    },
};
// 开跟形式

var root = {
    str: function (n = ` n`) {
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
    tex: function (n) {
        return tex(root.str(n)[0]);
    },

    integer_part: function (n) {
        return root.str(n)[1];
    },
    sqrt_part: function (n) {
        return root.str(n)[2];
    },
};

math_quadratic = {
	str: function (a, b, c) { //'when use the function of math_visuals.quadratic, you need test the number of answer : 1 or 2'
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
	tex: function (a, b, c) {
		return tex(math_quadratic.str(a, b, c));
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
    str: function (a, b, c) {
        if (((math_tools.quadratic(a, b, c)[0]) * 10) % 1 !== 0) {
            return ` x_1=\\,` + `\\dfrac{` + (-b) + `+` + root.str(b * b + `-4\\times` + a + `\\times` + c) + `}{2\\times` + a + `}\\space
            x_2=\\,` + `\\dfrac{` + (-b) + `-` + root.str(b * b + `-4\\times` + a + `\\times` + c) + `}{2\\times` + a + `}`;
        }
    },
    tex: function (a, b, c) {
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



math_quadratic = {
    str: function (a, b, c) {
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
    tex: function (a, b, c) {
        return tex(math_quadratic.str(a, b, c));
    },
};


math_visuals.root = {
    process: function (n = ` n`) {
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
    str: function (n) {
        return `` + math_visuals.root.process(n)[0];
    },
    tex: function (n) {
        return tex(math_visuals.root.str(n));
    },
    integer_part: function (n) {
        return math_visuals.root.process(n)[1];
    },
    sqrt_part: function (n) {
        return math_visuals.root.process(n)[2];
    },
};



//二分中值fa
function inter_bisection(x, y) { //interval bisection
    var a = x;
    var b = y;
    var k = 0; //控制最多运行几层的变量//其实也可以把这个变量放到参数中来控制循环次数
    var c;
    var arry = [
        [tex(`a`), tex(`f(a)`), tex(`b`), tex(`f(b)`), tex(`\\dfrac{a+b}{2}`), tex(`f\\Bigl(\\dfrac{a+b}{2}\\Bigr)`)]
    ];
    for (var i = 0; i < 10; i++) {
        c = (a + b) / 2;
        var arry1 = [];
        arry1[0] = math.round(a, 4);
        arry1[1] = math_tools.round(f(a), 4);
        arry1[2] = math_tools.round(b, 4);
        arry1[3] = math_tools.round(f(b), 4);
        arry1[4] = math_tools.round(c, 4);
        arry1[5] = math_tools.round(f(c), 4);
        arry.push(arry1);
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
        k += 1; //控制最多运行多少层
        if (k > 1) {
            break;
        } //控制次数的地方
    }
    return arry;
}
//线性插值法
function linear_interpolation(x, y) { //linear interpolation
    var a = x;
    var b = y;
    var k = 0; //控制最多运行几层的变量//其实也可以把这个变量放到参数中来控制循环次数
    var c;
    var arry = [
        [tex(`a`), tex(`f(a)`), tex(`b`), tex(`f(b)`), tex(`x^{}_n`), tex(`f(x^{}_n)`)]
    ];
    for (var i = 0; i < 10; i++) {
        c = (a * math.abs(f(b)) + b * math.abs(f(a))) / (math.abs(f(a)) + math.abs(f(b)));
        var arry1 = [];
        arry1[0] = math.round(a, 3);
        arry1[1] = math.round(f(a), 3);
        arry1[2] = math.round(b, 3);
        arry1[3] = math.round(f(b), 3);
        arry1[4] = math.round(c, 3);
        arry1[5] = math.round(f(c), 3);
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
        k += 1; //控制最多运行多少层
        if (k > 1) {
            break;
        } //控制次数的地方
    }
    ans = math.round(c, 1);
    return arry;
}

//线性微分法
function diff_iteration(x, y = 1) { //differential_interation.
    var x1 = x;
    var k = 0; //y负责控制循环次数，只要控制k大于等于y，那就break掉
    var arry = [
        [tex(`x`), tex(`f(x)`), tex(`f'(x)`), tex(`x_{n}`)]
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
        k += 1;
        if (k >= y) {
            ans = math_tools.round(x1, 2);
            break;
        }
    }
    return arry;
}

function arry_to_table(arry) {
    return `<table border='1' cellspacing='0'  cellpadding='5'><tr><td align='center'>` + arry.map(function (line) {
        return line.join(`</td ><td align='center'>`);
    }).join(`</tr><tr><td align='center'>`) + `</td ></tr></table>`;
}

math_visuals['array_to_table'] = function (array) {
    return `<table border='1' cellspacing='0'  cellpadding='5'><tr><td>` + array.map(function (line) {
        return line.join(`</td><td>`);
    }).join(`</tr><tr><td>`) + `</td></tr></table>`;
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


math_tools["round"] = function (number, decimals) {
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

<<
<<
<<
<
HEAD: 自己写的function.js `(Tabulate your intermediate steps[exercise_only] as shown[/exercise_only].  Input values to ` + tex(`3`) + ` decimal places when required)<br>`


//求质数的方法1的错误，原因：在核心区域
function prime(num) {
    var i, k;
    var arr = [];
    var arr2 = [];
    for (i = 2; i <= num; i++) {
        arr.push(i);
    }
    for (i = 0; i < arr.length; i++) {
        for (k = 2; k < Math.ceil(Math.pow(arry[i], 0.5)); k++) {
            if (arr[i] % k === 0) {
                arr.splice(i, 1); //改变的了数组个数，导致部分数下标被更改却没有被轮到计算
            }
        }
    }
    return arr;
}

//求质数的方法1的正确方法
function prime(num) {
    var i, k;
    var arr = [];
    for (i = 2; i <= num; i++) {
        arr.push(i);
    }
    var arr2 = [];
    for (i = 0; i < arr.length; i++) {
        for (k = i + 1; k < arr.length; k++) {
            if (arr[k] % arr[i] === 0) {
                arr.splice(k, 1); //虽然都是和上面一块是删除的，但是不一样的在于这个删除当前i项后面的那些值
            }
        }
    }
    return arr;
}

//求质数的方法2 比较良好
function prime(num) {
    var arr = [2];
    for (var i = 3; i <= num; i++) {
        var k = 0;
        for (var j = 0; j < arr.length; j++) {
            if (i % arr[j] === 0) {
                k = 1;
                break;
            }
        }
        if (k == 1) continue;
        else arr.push(i);
    }
    return arr;
}
//更好些,开跟和用以前的质数结合起来
function prime(num) {
    var arr = [2];
    for (var i = 3; i <= num; i++) {
        var k = 0;
        for (var j = 0; arr[j] < Math.ceil(Math.pow(num, 0.5)+1; j++) {
            if (i % arr[j] === 0) {
                k = 1;
                break;
            }
        }
        if (k == 1) continue;
        else arr.push(i);
    }
    return arr;
}
//小泉写的,最基础的版本
function prime(x) {
    for (var i = 3; i < x; i++) {
        for (var f = 2; f <= i - 1; f++) {
            if (i % f === 0) {
                break;
            }
            if (f == i - 1) {
                a.push(i);
            }
        }
    }
    return a;
}



function diff_random(num, min = 1, max = 10) {
    var array = [];
    var k = 0;
    var a;
    array.push(math.randomInt(min, max));
    for (var i = 1; i < num; i++) {
        k = 0;
        a = math_tools.rand_int(min, max);
        for (var j = 0; j < array.length; j++) {
            if (a == array[j]) {
                k = 1;
                break;
            }
        }
        if (k == 1) {
            i = i - 1; //又是这里的坑，导致如果k==1，continue了，数组却没添加上元素，i却也跟着上去了，所以这种情况下，i要－1
            continue;
        } else {
            array.push(a);
        }
    }
    return array;
}

function diff_random2(num, min = 1, max = 10) {
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

triangular_make = {
        //array的数据结构就是[[0.0],[0,3,][3,0],['graph_1']]//它才是id对应项目]]这样的三个坐标点，然后生成坐标图,最后一点是用来确定用哪个坐标图
        main:function (array) {
            var x_array=[];
            var y_array=[];
            for (var i=0 ; i<array.length-1 ;i++){
                x_array.push(array[i][0]);
                y_array.push(array[i][1]);
            }
            self.post_load = function () {
                var g;
                g = new graphic({'input_element': array[array.length-1][0], 'low_x': math.min(x_array)-2,'high_x': math.max(y_array)+2,'low_y': math.min(y_array)-2,'high_y': math.max(y_array)+2,});
                g.add_element({'type': 'grid',});
                g.add_element({'type': 'dot','pos': array[0]});
                g.add_element({'type': 'dot','pos': array[1]});
                g.add_element({'type': 'dot','pos': array[2]});
                g.add_element({                'type': 'label',                'pos': [array[0][0], array[0][1] - 0.7],                'text': 'A'            });
                g.add_element({                'type': 'label',                'pos': [array[1][0], array[1][1] - 0.7],                'text': 'B'            });
                g.add_element({                'type': 'label',                'pos': [array[2][0]+0.5, array[2][1] + 0.5],                'text': 'C'            });            
                g.add_element({                'type': 'line',                'start': array[0],                'end': array[1]            });
                g.add_element({                'type': 'line',                'start': array[1],                'end': array[2]            });
                g.add_element({                'type': 'line',                'start': array[2],                'end': array[0]            });
                //g.add_element({                'type': 'line_stroked',                'start': array[2],                'end': [0,0]            });
                g.draw();
            };
        },
};


math_visuals.coordinate={

    graphic:function(array=[['g1'],[-6,6],[-6,6]]){//重新开图一定要注意这句话//array的必要格式为[[第一个是id变量,函数内部使用id],[坐标点1],[坐标点2]]
		g1 = new graphic({'input_element': array[0][0], 'low_x': array[1][0],'high_x': array[1][1],'low_y': array[2][0],'high_y': array[2][1],});
    },
    draw:function(){
		g1.draw();
    },
    grid:function(){
		g1.add_element({'type': 'grid',});
    },
    dot:function(array=[[0,0]]){
		g1.add_element({'type': 'dot','pos': array[0]});
    },
    label:function(array=[[0.3,0.3],['O']]){//[[id][坐标点1][要输入的标示量]]
		g1.add_element({'type': 'label','pos': array[0],'text': array[1]});
    },
    line:function(array=[[0,0],[0,1]]){
		g1.add_element({'type': 'line','start': array[0],'end': array[1]});
    },
};

self.post_load = function () {};
self.step_js = function(wrong_answer, step){};


num_form = {
	head: function (x) {
		return (x == 1) ? `` : (x == -1) ? `-` : x;
	},
	body: function (x) {
		return (x == 1) ? `+` : (x == -1) ? `-` : x.signed();
	},
	end: function (x) {
		return (x === 0) ? `` : x.signed();
	},
	index: function (x) {
		return (x == 1) ? `` : x;
	},
};

var vec1 = [4,1];
var vec2 = [math_tools.rand_int(-4, 4, [0]), math_tools.rand_int(-5, 5, [0])];

self.text = function() {
  return `Add the two vectors <div id="graph" style="margin: auto;"></div>`;
};

self.post_load = function(){
  var end = function(time, vars){
	return vars.end;
  };
  var g = new graphic({'input_element': "graph"});
  g.add_element({'type': 'grid'});
  g.add_element({'type': 'line_head_arrow', 'end': vec1, 'color': 'green'});
  g.add_element({'type': 'line_head_arrow', 'end': vec2, 'color': 'red'});
  g.add_element({'type': 'line_head_arrow', 'end': end});
  end_point = g.add_element({'type': 'movable_point', 'pos': [2,2], 'name': 'end', 'snap': 1});//可移动式的光圈部分，和vars.end共同组成了移动矢量向量
};//snap控制每次选择变化最小量比如，1到2或者1到3。

self.check_answer = function(){
  return (end_point.value[0] === vec1[0] + vec2[0] && end_point.value[1] === vec1[1] + vec2[1]);
};


function polynomial() {
    var array = Array.prototype.slice.call(arguments);
    var array_to_str;    
    if (array[0] == 0) {
        array.splice(0, 1);
        i-=1;
        if (typeof (array[0])=='string'){
            array.splice(0, 1);
        }
    }//这部分有问题，哪里来的i，但是保留下来，因为下面写的还好，构思还行。
    (typeof (array[0])=='string')? array[0] : array[0]=math_visuals.num_form.head(array[0]);

    for (var i = 1; i < array.length - 1; i++) {
        if (typeof (array[i]) == 'number') {
            switch (array[i]) {
                case 1:
                    array[i] = `+`;
                    break;
                case -1:
                    array[i] = `-`;
                    break;
                case 0:
                    array[i] = ``;
                    array[i + 1] = ``;
                    break;
                default:
                    array[i] = array[i].signed();
            }
        }
    }
    if (array[array.length - 1] === 0) {
        array[array.length - 1] = ``;
    }
    if (typeof (array[array.length - 1]) == 'number') {
        array[array.length - 1] = array[array.length - 1].signed();
    }
    array_to_str = array.join(``);
    return array_to_str;
}

function polynomial() {
	var array = Array.prototype.slice.call(arguments);
	var array_to_str;
	for (var j = 0; j < array.length - 1; j++) {
		if (array[0] === 0) {
			array.splice(0, 1);
			if (typeof (array[0]) == 'string') {
				array.splice(0, 1);
			}
		} else break;
	}
	array[0] = ((typeof (array[0]) == 'string') ? array[0] : math_visuals.num_form.head(array[0]));
	for (var i = 1; i < array.length; i++) {
		if (typeof (array[i]) == 'number') {
			if (typeof (array[i + 1]) == `string`) {
				if (array[i] === 0) {
					array[i] = ``;
					if (typeof (array[i + 1]) == 'string') {
						array[i + 1] = ``;
					}
				} else array[i] = math_visuals.num_form.body(array[i]);

			} else array[i] = math_visuals.num_form.end(array[i]);
		}
	}
	array_to_str = array.join(``);
	return array_to_str;
}

math_visuals['polynomial'] = function(){
	var array = Array.prototype.slice.call(arguments);
	var array_to_str;
	for (var j = 0; j < array.length - 1; j++) {
		if (array[0] === 0) {
			array.splice(0, 1);
			if (typeof (array[0]) == 'string') {
				array.splice(0, 1);
			}
		} else break;
	}
	array[0] = ((typeof (array[0]) == 'string') ? array[0] : math_visuals.num_form.head(array[0]));
	for (var i = 1; i < array.length; i++) {
		if (typeof (array[i]) == 'number') {
			if (typeof (array[i + 1]) == `string`) {
				if (array[i] === 0) {
					array[i] = ``;
					if (typeof (array[i + 1]) == 'string') {
						array[i + 1] = ``;
					}
				} else array[i] = math_visuals.num_form.body(array[i]);

			} else array[i] = math_visuals.num_form.end(array[i]);
		}
	}
	array_to_str = array.join(``);
	return array_to_str;
}

math_tools['shuffle'] = function (items) {
	var i, j, k;
	for (i = items.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		k = items[i];//k is a 寄存变量，临时存储中转的空间。因为js不像python那样可以同时对向赋值，需要中间变量。
		items[i] = items[j];
		items[j] = k;
	}
}


  array_extremum = function (array) {
      var x_abs_max = 5;
      var y_abs_max = 5;
      for (var i = 0; i < array.length; i++) {
          if (x_abs_max < math.abs(array[i][0])) {
              x_abs_max = math.abs(array[i][0]);
          }
          if (y_abs_max < math.abs(array[i][1])) {
              y_abs_max = math.abs(array[i][1]);
          }
      }
      return [x_abs_max, y_abs_max];
  };

