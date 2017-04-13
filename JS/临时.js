var x_array=[`0`,`\\frac{\\pi}{6}`,`\\frac{\\pi}{4}`,`\\frac{\\pi}{3}`,`\\frac{\\pi}{2}`,`\\pi`];
var xd_array=[`0`,`\\dfrac{\\pi}{6}`,`\\dfrac{\\pi}{4}`,`\\dfrac{\\pi}{3}`,`\\dfrac{\\pi}{2}`,`\\pi`];
var sin_array=[`0`,`\\dfrac{1}{2}`,`\\dfrac{\\sqrt{2}}{2}`,`\\dfrac{\\sqrt{3}}{2}`,`1`,`0`];
var sin_array_cal=[0,1/2,math.sqrt(2)/2,math.sqrt(3)/2,1,0];
var cos_array=[`1`,`\\dfrac{\\sqrt{3}}{2}`,`\\dfrac{\\sqrt{2}}{2}`,`\\dfrac{1}{2}`,`0`,`-1`];
var cos_array_cal=[1,math.sqrt(3)/2,math.sqrt(2)/2,1/2,0,-1];

do{
    var v1 = math_tools.rand_int(0, x_array.length-2);
    var v2 = math_tools.rand_int(1, x_array.length-1);
}
while(v1>=v2);


num_form = {
	head: function (x) {
		return (x == 1) ? `` : (x == -1) ? `-` : x;
	},
	body: function (x) {
		return (x == 1) ? `+` : (x == -1) ? `-` : x.signed();
	},
	end: function (x) {
		return x.signed();
	},
	index: function (x) {
		return (x == 1) ? `` : x;
	},
};

self.text = function () {
	return `Evaluate

~\\displaystyle\\int\\limits_{`+x_array[v1]+`}^{`+x_array[v2]+`}\\sin x\\,\\mathrm{d}x~
	
[answer keyboard='full_xy']`;
};

self.post_load = function () {};

self.step_js = function (wrong_answer, step) {};

self.step = function (wrong_answer, step) {
	var steps = [
		`~\\displaystyle\\int\\limits^{`+x_array[v2]+`}_{`+x_array[v1]+`}{\\sin x} \\,dx~`,
		`~=\\Big[-\\cos x\\Big]^{`+x_array[v2]+`}_{`+x_array[v1]+`}~`,
	  `~=-\\cos `+xd_array[v2]+`+ \\cos `+xd_array[v1]+`~`,
	  `~=-`+cos_array[v2]+`+`+cos_array[v1]+`~`,
	];
	return steps[step];
};

self.misconception = function (answer) {
	return 0; // Default
};

var ans = cos_array_cal[v1]-cos_array_cal[v2];
self.correct_answers = function () {
	return ans;
};