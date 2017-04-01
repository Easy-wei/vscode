var v1 = math_tools.rand_int(1, 9);
var v2 = math_tools.rand_int(-8, 9,[0]);
var v3 = math_tools.rand_int(1, 9);
var v4 = math_tools.rand_int(-8, 9,[0]);
var v5 = math_tools.rand_int(1, 9);


var f1=math_visuals.num_form.head(v2)+`x`;
var f_1=math_visuals.num_form.head(v2);
var g1=`e^{`+math_visuals.num_form.index(v1)+`x}`;
var g_1=math_visuals.num_form.head(v1)+`e^{`+math_visuals.num_form.index(v1)+`x}`;

self.text = function() {
	return `Differentiate the following functions with respect to ~x~.
~\\bold{a)}\\,\\,`+f1+g1+`~
	[answer keyboard='equation_ex']`;
};

self.post_load = function(){
  
};

self.step_js = function(wrong_answer, step){
};

self.step = function(wrong_answer, step){
	var steps = [
		`~y=f(x)g(x)~`,
	  `~f(x)=`+f1+`\\,\\,\\,g(x)=`+g1+`~`,
	  `~\\therefore \\dfrac{dy}{dx}=f'(x)g(x)+f(x)g'(x)~`,
	  `~\\therefore \\,\\,=`+f_1+g1+`+(`+f1+g_1+`)~`,
	  `~\\therefore \\,\\,=`+math_visuals.num_form.head(v2)+`(x+1)`+`e^{`+math_visuals.num_form.index(v1)+`x}~`,
	];
	return steps[step];
};

self.misconception = function(answer){
	return 0; // Default
};
var ans=new expression(v2+`*({x}+1)*pow({e},`+v1+`*{x})`);
self.correct_answers = function() {
	return ans;
};