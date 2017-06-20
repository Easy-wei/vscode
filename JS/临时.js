var v1 = math_tools.rand_int(1, 9);
var v2 = math_tools.rand_int(1, 3);
var v3 = math_tools.rand_int(-3, 3);

var f_equation = v1+`e^{`+math_visuals.num_form.head(v2)+`z}` ;
var f_equation_1 = v1*v2+`e^{`+math_visuals.num_form.head(v2)+`z}`;

var f_s = function(x) {return v1+`e^{`+v2*x+`}`;};
var f = function(x) {return v1*Math.pow(Math.E,v2*x)+v3 ;};

self.text = function() {
	return `Solve the following differential equations with the given initial conditions.
~\\dfrac{dx}{dt}=`+f_equation_1+`~, ~x=`+(v1+v3)+`~ when ~z=0~
	[answer]`;
};

self.text_js = function(){
};

self.step_js = function(misconception, step){
};

self.step = function(misconception, step){
	var steps = [
		"First do this", 
		"Then do that", 
	];
	return steps[step];
};


self.misconception = function(answer){
	return 0; // Default
};

self.correct_answers = function() {
	return ;
};