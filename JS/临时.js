var v1 = math_tools.rand_int(1, 9);
var v2 = math_tools.rand_int(-9, 9,[0]);
var v4 = math_tools.rand_int(-9, 9);

var r = function (x) {    return `\\mathrm{` + x + `}`;};
var d = function (y = r(`y`), x = `x`) {    return `\\dfrac{` + r(`d`) + y + `}{` + r(`d`) + x + `}`;};


var f_1_equation = math_visuals.polynomial(v1,`x^{2}`,v2);
var f_equation = math_visuals.polynomial(math_visuals.fraction.str(v1,3),`x^{3}`,v2,`x`,`+k`);
var f= function(x){ return v1/3*Math.pow(x,3)+v2*x+v4;};

do{
var v3 = math_tools.rand_int(-3, 3);
}while(f(v3)%1!==0);

self.text = function() {
	return `A curve passes through the point (`+v3+`,`+f(v3)+`) and satisfies ~`+d()+`=`+f_1_equation+`~. Find ~`+r(`y`)+`~ in terms of ~x~.
	~`+r(`y`)+`=~ [answer keyboard='equation_xyk']`;
};

self.text_js = function(){
};

self.step_js = function(misconception, step){
};

self.step = function(misconception, step){
	var steps = [
		`~f'(x)=`+f_1_equation+`~`,
	  `So ~f(x)=`+f_equation+`~`,
	  `because the graph pass through the point~(`+v3+`,`+f(v3)+`)~ `,
	  `~f(`+v3+`)=`+math_visuals.polynomial(math_visuals.fraction.str(v1,3),`\\times`,v3+`^{3}`,v2,`\\times`+v3,`+k`)+`=`+f(v3)+`~`,
	  `So ~k=`+v4+`~`,
	  `So ~`+r(`y`)+`=`+math_visuals.polynomial(math_visuals.fraction.str(v1,3),`x^{3}`,v2,`x`,v4)+`~`,

	];
	return steps[step];
};


self.misconception = function(answer){
	return 0; // Default
};

self.correct_answers = function() {
	return new expression(v1/2+`*{x}*{x}`+v2.signed()+`*{x}`+v4.signed());
};