var inte=function(x,a=``,b=``,y=`x`){ return `\\displaystyle\\int^{`+b+`}_{`+a+`}{`+x+`}\\mathrm{d}`+y;};

var v1 = 2;
var v2 = math_tools.rand_int(1, 4);
do{
  var v3 = math_tools.rand_int(-2, 2);
  var v4 = math_tools.rand_int(-2, 2);
}
while(v3>=v4);

var low_limit = 0;
var h_limit = v2;

var f_equation = math_visuals.polynomial(v2,`x`);
var f_equation2 = math_visuals.polynomial(`x^{2}`);
var f_equation_1 = math_visuals.polynomial(`-x^{4}`,v2*v2,`x^{2}`);
var F_equation = math_visuals.polynomial(math_visuals.fraction.str(1,5),`x^{5}`,math_visuals.fraction.body(v2*v2,3),`x^{3}`);


var f1 = function(x) {return v1*x ;};
var f2 = function(x) {return x*x/2 ;};
var f1_1 = function(x) {return -v1*x ;};
var f2_1 = function(x) {return -x*x/2 ;};

var F_s = function(x){ return 3*Math.pow(x,5)+v2*v2*5*Math.pow(x,3);};
var F_n = function(x){ return math_visuals.fraction.str(F_s(x),15);};

var F = function(x) { return (Math.pow(x,5)/5+v2*v2/3*Math.pow(x,3))*Math.PI;};

self.text = function() {
	return `The region enclosed between the graph of ~y=`+f_equation+`~ and ~y=`+f_equation2+`~ is denoted by ~\\mathrm{R}~.
Find 


~a)~  the ~x~-axis [answer]
~b)~  the ~y~-axis [answer]
`;
};

self.text_js = function(){
};

var coord = [[-(2*v1*v1+2)*0.618,(2*v1*v1+2)*0.618],[-(2*v1*v1+2),2*v1*v1+2]];

self.step_js = function(misconception, step){
  var g= new graphic({'input_element':'g1','low_x':coord[0][0],'high_x':coord[0][1],'low_y':coord[1][0],'high_y':coord[1][1],});
  //g.add_element({'type':'grid'});

  g.add_element({'type':'graph', 'function':f1,'min_x':0, 'max_x':4, 'fill':'true','fill_baseline':f1_1,'color':'#FF4081'});
  g.add_element({'type':'graph', 'function':f2,'min_x':0, 'max_x':4, 'fill':'true','fill_baseline':f2_1,'color':'#009688'});
  g.add_element({'type':'graph', 'function':f1,'min_x':0});
  g.add_element({'type':'graph', 'function':f2,'min_x':0});
  g.add_element({'type':'graph', 'function':f2_1,'min_x':0});
  g.add_element({'type':'graph', 'function':f1_1,'min_x':0});
  
  g.add_element({'type':'line_head_arrow', 'start':[-2,0] ,'end':[5,0]});
  g.add_element({'type':'line_head_arrow', 'start':[0,-10] ,'end':[0,10]});
  g.add_element({'type':'label', 'pos':[-0.5,9] ,'text':`y`});
  g.add_element({'type':'label', 'pos':[4.5,-0.4] ,'text':`x`});
};

self.step = function(misconception, step){
	var steps = [
	  `Take ~f(x)=`+f_equation+`~ and ~g(x)=`+f_equation2+`~`,
	  `~a)~ about the ~x~-axis.`,
	  `<div id='g1'></div>`,
	  `As you see the the graph, we need to find the pink volume`,
	  `Add the pink volume and the green volume, we will get the volume generated when ~y=`+f_equation+`~ is rotated ~360~°`,
	  `The green volume is generated when ~y=`+f_equation2+`~ is rotated ~360~°`,
	  `So the pink volume ~=`+inte(`f(x)^{2}\\pi`,low_limit,h_limit)+`-`+inte(`g(x)^{2}\\pi`,low_limit,h_limit)+`~`,
	  `~V=`+inte(`(f(x)^{2}-g(x)^{2})\\pi`,low_limit,h_limit)+`~`,
	  `~=\\pi`+inte(`(`+f_equation_1+`)`,low_limit,h_limit)+`~`,
	  `~=\\pi\\Big[`+F_equation+`\\Big]^{`+h_limit+`}_{`+low_limit+`}~`,
	  `~=\\Big(`+F_n(h_limit)+`-(`+F_n(low_limit)+`)\\Big)\\pi~`,
	  `~=`+math_visuals.fraction.str(F_s(h_limit)-F_s(low_limit),15)+`\\pi~`,
	  `The volume of the solid is ~`+math_visuals.fraction.str(F_s(h_limit)-F_s(low_limit),15 )+`\\pi~`,
	  `In the same way it's easy to find the volume generated when ~\\mathrm{R}~ is rotated about ~y~-axis ~=`+inte(`(x_{1}-x_{2})`)+`~`,
	];
	return steps[step];
};


self.misconception = function(answer){
	return 0; // Default
};

self.correct_answers = function() {
	return [(F(h_limit)-F(low_limit))];
};