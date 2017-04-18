do{
var v1 = math_tools.rand_int(1, 9);
var v2 = math_tools.rand_int(1, 9);
}
while(v1>=v2);

function inte(x,y=`x`,low=``,hight=``){return `\\displaystyle\\int_{`+low+`}^{`+hight+`}{`+x+`\\,\\,\\mathrm{d}`+y+`}` ;}

var part1=math_visuals.fraction.str(1,2)+`x^{2}`;
var part1_1=`x`;
var part2=`\\ln{x}`;
var part2_1=`\\dfrac{1}{x}`;
var part3=((v1==1)?``:math_visuals.fraction.str(1,v1*v1))+`\\mathrm{e}^{`+math_visuals.num_form.head(v1)+`x}`;
self.text = function() {
	return `Find ~`+inte(part1_1+part2,`x`,v1,v2)+`~
	[answer keyboard='equation_ekx']`;
};

self.post_load = function(){
};

self.step_js = function(wrong_answer, step){
};

self.step = function(wrong_answer, step){
	var steps = [
		`If you take ~u=x~, and find ~{v}~ to satisfy ~\\dfrac{\\mathrm{d}v}{\\mathrm{d}x}={}\\ln{x}~`,
	  `But although section ~4.3~ gave the dervative of ~\\ln{x}~, its intergral is not yet known.`,
	  `When this occur, try writing the product the other way round. Take ~u=\\ln{x}~,and find a ~v~ such that ~\\dfrac{\\mathrm{d}v}{\\mathrm{d}x}~`,
	  `Which is ~v=`+part1+`~. The rule then gives`,
	  `~`+inte(part1_1+part2)+`~`,

	];
	return steps[step];
};

self.misconception = function(answer){
	return 0; // Default
};

var ans=new expression(1/v1+`*pow({e},`+v1+`*{x})*{x}`+(-1/v1/v1)+`*pow({e},`+v1+`*{x})+k`);

self.correct_answers = function() {
	return ans;
};