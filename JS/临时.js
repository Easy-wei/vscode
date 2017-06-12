var inte=function(x,a=``,b=``,y=`x`){ return `\\displaystyle\\int^{`+b+`}_{`+a+`}{`+x+`}\\mathrm{d}`+y;};

var v1 = math_tools.rand_int(1, 3);
var v4 = math_tools.rand_int(1, 4);
do{
var low_limit = math_tools.rand_int(1, 6);
var h_limit = math_tools.rand_int(1, 5);
}
while(low_limit>=h_limit);

var f_equation = `\\sqrt{x`+math_visuals.num_form.end(v1*v1)+`}`;
var f_equation_1 = math_visuals.polynomial(v1*v1,`x^{`+2*v4+`}`);
var F_equation = math_visuals.polynomial(math_visuals.fraction.str(v1*v1,(2*v4+1)),`x^{`+(2*v4+1)+`}`);

var F_s = function(x){ return v1*v1*Math.pow(x,(2*v4+1)) ;};
var F_n = function(x){ return math_visuals.fraction.str(F_s(x),(2*v4+1));};

var F = function(x) { return v1*v1/(2*v4+1)*Math.pow(x,2*v4+1)*Math.PI;};

self.text = function() {
	return `Find the volume generate when the region under the graph of ~y=`+f_equation+`~
between ~x=0~ and ~x=`+h_limit+`~ is roated throught ~360~° about the ~x~-axis.
[answer keyboard='{{"1","2","3","4","5","6","7","8","9","0"},{".","e","i","+","-","*","/","pi"},{"^","frac","cos","sin","tan","root","ln","()"},{"x_var","k_var","left","right","del"}}']
`;
};

self.text_js = function(){
};

self.step_js = function(misconception, step){
};

self.step = function(misconception, step){
	var steps = [
	  `The required volume is ~V~, where`,
	  `~V=`+inte(`\\pi{y^{2}}`,low_limit,h_limit)+`~`,
	  `~=\\pi`+inte(`(`+f_equation+`)^{2}`,low_limit,h_limit)+`~`,
	  `~=\\pi`+inte(`(`+f_equation_1+`)`,low_limit,h_limit)+`~`,
	  `~=\\pi\\Big[`+F_equation+`\\Big]^{`+h_limit+`}_{`+low_limit+`}~`,
	  `~=\\Big(`+F_n(h_limit)+`-`+F_n(low_limit)+`\\Big)\\pi~`,
	  `~=`+math_visuals.fraction.str(F_s(h_limit)-F_s(low_limit),2*v4+1)+`\\pi~`,
	  `The volume of the solid is ~`+math_visuals.fraction.str(F_s(h_limit)-F_s(low_limit),2*v4+1)+`\\pi~`,
	];
	return steps[step];
};


self.misconception = function(answer){
	return 0; // Default
};

self.correct_answers = function() {
	return (F(h_limit)-F(low_limit));
};