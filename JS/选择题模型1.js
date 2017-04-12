var v1 = math_tools.rand_int(-8, 8,[0]);
var v2 = math_tools.rand_int(-8, 9,[0]);

var ans=((v1>0)?(v2>0)?4:2:(v2>0)?3:1);
ans_array=[``,`第一象限`,`第二象限`,`第三象限`,`第四象限`];

self.options = 4; // Default is 8

self.text = function() {
	return `函数`+tex(`\\mathrm{y}=`+v1+`\\mathrm{x}`+v2.signed())+`的图像不经过`;
};

self.post_load = function(){
};

self.step_js = function(wrong_answer, step){
};

self.wrong_answer = function(number){
  var v3;
  do{v3=math_tools.rand_int(1,4);}while(v3==ans);
	return ans_array[v3];
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
	return ans_array[ans];
};