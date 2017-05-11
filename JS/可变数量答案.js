var variable_1 = math_tools.rand_int(1, 99);
var variable_2 = math_tools.rand_int(1, 99);

self.text = function() {
	return `What is `+variable_1/10+` + `+variable_2/10+`?`+
  `[answers min='0' max='4' label_2='']`;
};
//关键在于这个位置的jsload
self.post_load = function(){
  dynamic_inputs = 2;
  update_dynamic_inputs();
};

self.step_js = function(wrong_answer, step){
};

self.step = function(wrong_answer, step){
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
	return (variable_1 + variable_2)/10;
};