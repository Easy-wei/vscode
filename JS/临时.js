do{
  var v1_1 = math_tools.rand_int(1,6);
  var v1_2 = math_tools.rand_int(6,15);
  var v1 = v1_1/v1_2;
  var v1_s = math_visuals.fraction.str(v1_1,v1_2);
}
while(v1>0.8||v1<0.3);

var angle = Math.atan(v1);

var v2 = math_tools.rand_int(1, 4);

var f_equation = math_visuals.polynomial(v1_s,`x`);
var f_equation_1 = math_visuals.polynomial(math_visuals.fraction.str(v1_1*v1_1,v1_2*v1_2),`x^{2}`);
var F_equation = math_visuals.polynomial(math_visuals.fraction.str(v1_1*v1_1,v1_2*v1_2*3),`x^{3}`);
	
var f = function(x) { return v1*x ; };
var F = function (x) { return v1*v1/3*Math.pow(x,3) ;};

var F_n = function (x) {return v1_1*v1_1*Math.pow(x,3);};
var F_d = function (x) {return math_visuals.fraction.str(F_n(x),3*v1_2*v1_2);};

var inte=function(x,a=``,b=``,y=`x`){ return `\\displaystyle\\int^{`+b+`}_{`+a+`}{`+x+`}\\mathrm{d}`+y;};


self.text = function() {
	return `Find the volume generated when the region under the graph of ~y=`+f_equation+`~ between ~x=0~ and ~x=`+v1_2+`~ 
is rotated through four right angles about the ~x~-axis.
	[answer] <div id='g1'></div>`;
};
var coord=[[-2,16],[-8,8]];
self.text_js = function(){
  var g= new graphic({'input_element':'g1','low_x':coord[0][0],'high_x':coord[0][1],'low_y':coord[1][0],'high_y':coord[1][1],});
  g.add_element({'type':'grid'});
  
  g.add_element({'type':'graph', 'function':f,'max_x':v1_2,'min_x':0});
  g.add_element({'type':'line','start':[0,0],'end':[v1_2,-v1_1]});
  
  g.add_element({'type':'circle', 'pos':[0,0],'radius':v1_2/Math.cos(angle), 'start_angle': 2*Math.PI-angle,'end_angle':2*Math.PI+angle});
  
  g.add_element({'type':'circle', 'pos':[2*v1_2,0],'radius':v1_2/Math.cos(angle), 'start_angle': Math.PI-angle,'end_angle':Math.PI+angle});
  
  g.add_element({'type':'line_stroked','start':[v1_2,v1_1],'end':[v1_2,-v1_1]});
};

self.step_js = function(misconception, step){
};

self.step = function(misconception, step){
	var steps = [
	  `The pharse 'four right angle' is sometimes used in place of ~360~° for describing a full rotation about the ~x~-axis `,
	  `The required volume is ~V~， where`,
	  `~V=`+inte(`\\pi{y^{2}}`,0,v1_2)+`~`,
	  `~=\\pi`+inte(`(`+f_equation+`)^{2}`,0,v1_2)+`~`,
	  `~=\\pi`+inte(`(`+f_equation_1+`)`,0,v1_2)+`~`,
	  `~[\\pi (`+F_equation+`)]^{`+v1-2+`}_{0}~`,
	  `~(`+F_d(v1_2)+`-(`+F_d(0)+`))\\pi~`,
	  `~`+math_visuals.fraction.str(F_n(v1_2)-F_n(0),3*v1_2*v1_2)+`\\pi~`,
	  `The volume of the solid is ~`+math_visuals.fraction.str(F_n(1)-F_n(-1),3*v1_2*v1_2)+`\\pi`,
	];
	return steps[step];
};


self.misconception = function(answer){
	return 0; // Default
};

self.correct_answers = function() {
	return F(1)-F(-1);
};