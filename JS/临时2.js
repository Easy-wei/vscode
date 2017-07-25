var inte=function(x,a=``,b=``,y=`x`){ return `\\displaystyle\\int^{`+b+`}_{`+a+`}{`+x+`}\\,\\mathrm{d}`+y;};

var v1 = math_tools.rand_int(6, 9);
var v2 = math_tools.rand_int(1, 9);
var v3 = math_tools.rand_int(1, 9);
var v4 = math_tools.rand_int(1, 9);

var f_equation = `ae^{-t}`;
var f_equation1 = math_visuals.polynomial(v3,`e^{-t}`,v1-v3);
var f_equation_1 = `-ae^{-t}`;

var f = function (x) { return v1/2*x*x ;} ;

self.text = function() {
	return `Water is leaking slowly out of a tank. The deep of the water after ~t~ hours is ~h~ metres,
and these variables are related by a differential equation of the form ~\\dfrac{dh}{dt}=`+f_equation_1+`~.
Initially the depth of water is ~`+v1+`~ metres, and after ~`+v2+`~ hours it has fallen to ~`+math_visuals.polynomial(v3,`e^{`+(-v2)+`}`,v1-v3)+`~ metres.
At what depth will the level eventually settle down?
[answer]
`;
};

self.text_js = function(){
};

self.step_js = function(misconception, step){
};

self.step = function(misconception, step){
	var steps = [
	  `Because ~\\dfrac{dh}{dt}=`+f_equation_1+`~`,
	  `So ~`+inte(`\\dfrac{dh}{dt}`)+`=`+inte(f_equation_1)+`~`,
	  `So ~h=`+f_equation+`+k~`,
	  `When ~t=0~, ~h=`+v1+`~`,
	  `~a+k=`+v1+`~`,
	  `When  ~t=`+v2+`~,~ h = ae^{`+(-v2)+`}+k=`+math_visuals.polynomial(v3,`e^{`+(-v2)+`}`,v1-v3)+`~`,
	  `So ~a=`+v3+` \\space k=`+(v1-v3)+`~ `,
	  `So ~h=`+f_equation1+`~`,
	  `When ~t=+\\infty\\space\\space\\space -t=-\\infty~`,
	  `~e^{-\\infty}\\arrow 0~`,
	  `~h=`+v2+`~`
	];
	return steps[step];
};


self.misconception = function(answer){
	return 0; // Default
};

self.correct_answers = function() {
	return v2;
};