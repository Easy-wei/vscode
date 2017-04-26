//Page50 Exercise3C Q1 step finish D

self.ordered_answer = false;

do{
var_1 = math_tools.rand_int(1, 10);
var_2 = math_tools.rand_int(-20, 20,[0]);
var_3 = math_tools.rand_int(-10, 10,[0]);
a = var_1*var_1;
b =2*var_2-var_3;
c = var_2*var_2;
deta = b*b-4*a*c;
}
while(deta<=0|math.sqrt(math.abs(deta))%1!==0);
function math_visuals.fraction.str(a,b){
  var com=math_tools.gcd(math.abs(a),math.abs(b));
  if(b===0){
	throw "the denominator can not be 0";
  }
  a=a/com;
  b=b/com;
  var j=math.abs(a)%math.abs(b);
  var k=(math.abs(a)-math.abs(j))/math.abs(b);
  return (a*b>=0)?(j===0)?(``+k):`\\dfrac{`+math.abs(a)+`}{`+math.abs(b)+`}`:
  (j===0)?`-`+k:`-\\dfrac{`+math.abs(a)+`}{`+math.abs(b)+`}`;
}

if(var_1==1){
  a_1 =`x`;
}
else{
  a_1 = var_1+`x`;
}
a_2 = var_1==1?``:var_1*var_1;
a_3 = var_3==1?``:var_3==-1?`-`:var_3;
self.text = function() {
	return `The line `+tex(`y=`+a_1+var_2.signed())+` meets the parabola ` +tex(`y^2=`+a_3+`x`)+` at the points `+tex(`P`)+` and `+tex(`Q`)+`

Find the coordinates of `+tex(`P`)+` and `+tex(`Q`)+`

`+tex(`P = \\,([answer],[answer])`)+`
`+tex(`Q = \\,([answer],[answer])`);
};
res = math_tools.quadratic(a,b,c);
ans0 = var_1*res[0]+var_2;
ans1 = var_1*res[1]+var_2;

self.step_js =function(){};
self.step = function(wrong_answer, step){
	steps = [
		`The coordinates of `+tex(`P`)+` and `+tex(`Q`)+` satisfy both `+tex(`y=`+a_1+var_2.signed())+" and "+tex(`y^2=`+a_3+`x`), 
		tex(`P`)+` and `+tex(`Q`)+` must satisfy `+tex(`y=`+a_1+var_2.signed())+` so by squaring both sides, they must also satisfy `+tex(`y^2=`+a_2+`x^2`+b.signed()+`x+`+c),
	  "So "+tex(a_3+`x=`+a_2+`x^2`+(2*var_2).signed()+`x+`+(var_2*var_2))+`<br>`,
	  tex(`\\therefore \\space x^{}_1=`+math_visuals.fraction.str((-b+math.sqrt(deta)),2*a)+`,y^{}_1=`+math_visuals.fraction.str(-b*var_1+var_1*math.sqrt(deta)+2*a*var_2,2*a)+
		  `,x^{}_2=`+math_visuals.fraction.str((-b-math.sqrt(deta)),2*a)+`,y^{}_2=`+math_visuals.fraction.str(-b*var_1-var_1*math.sqrt(deta)+2*a*var_2,2*a))+`<br>`,
	  "So "+tex(`P(`+math_visuals.fraction.str((-b-math.sqrt(deta)),2*a)+`,`+math_visuals.fraction.str(-b*var_1-var_1*math.sqrt(deta)+2*a*var_2,2*a)+`),\\space Q(`+math_visuals.fraction.str((-b+math.sqrt(deta)),2*a)+`,`+
				math_visuals.fraction.str(-b*var_1+var_1*math.sqrt(deta)+2*a*var_2,2*a)+`)`)+` or vice versa`,
	];
	return steps[step];
};

self.misconception = function(answer){
	return 0; // Default
};

self.correct_answers = function() {
	return [res[1],ans1,res[0],ans0];
};