self.ordered_answer = true;

do{
a1 = math_tools.rand_int(-4, 4);
a2 = math_tools.rand_int(-4, 4);
a3 = math_tools.rand_int(-4, 4);
a4 = math_tools.rand_int(-4, 4);
det_a=a1*a4-a2*a3;
}
while (det_a===0);

do{
b1 = math_tools.rand_int(-4, 4);
b2 = math_tools.rand_int(-4, 4);
b3 = math_tools.rand_int(-4, 4);
b4 = math_tools.rand_int(-4, 4);
b5 = math_tools.rand_int(-4, 4);
b6 = math_tools.rand_int(-4, 4);
}
while((b1==b2&&b4==b5)||(b2==b3&&b5==b6)||(b1==b3&&b4==b6));

function math_ngcd(a,b,c,d,e){
  var arry=[];
  if(a*b*c*d*e===0){
	return 1;
  }
  arry.push(a,b,c,d,e);
  var len=arry.length;
  for (var  i=1;i<len;i++){
	if (arry[i]==1){
	return 1;
	}
	arry[i]=math_tools.gcd(math.abs(arry[i-1]),math.abs(arry[i]));
  }
  return arry[len-1];
}

function frac_tex(a,b){
  var com=math_tools.gcd(math.abs(a),math.abs(b));
  if(b===0){
	return "the denominator can not be 0";
  }
  a=a/com;
  b=b/com;
  j=math.abs(a)%math.abs(b);
  k=(math.abs(a)-math.abs(j))/math.abs(b);
  return (a*b>=0)?(j===0)?tex(``+k):tex(`\\dfrac{`+math.abs(a)+`}{`+math.abs(b)+`}`):
  (j===0)?tex(`-`+k):tex(`-\\dfrac{`+math.abs(a)+`}{`+math.abs(b)+`}`);
}

matrix_a=[[a1,a2],[a3,a4]];
matrix_r=[[b1,b2,b3],[b4,b5,b6]];
matrix_c=math.multiply(matrix_a,matrix_r);

com=math_ngcd(a1,a2,a3,a4,det_a);
matrix_a_inv=[[a4/com,-a2/com],[-a3/com,a1/com]];



A=[matrix_c[0][0],matrix_c[1][0]];
B=[matrix_c[0][1],matrix_c[1][1]];
C=[matrix_c[0][2],matrix_c[1][2]];


self.text = function() {
	return `The matrix `+tex(`\\bold{A}=\\,`)+math_visuals.matrix.tex(matrix_a)+` transforms the  triangle `+tex(`PQR`)+` into the triangle `+tex(`(PQR)'`)+`, with coordinates 

      `+tex(`(`+A+`) \\space (`+B+`) \\space (`+C+`)`)+`<br><br>`+` Find the coordinates of `+tex(`P, Q`)+` and `+tex(`R`)+` `+`

`+tex(`([answer style='inline'],[answer style='inline']) \\rightarrow ( `+A+` ) `)+`
	`+tex(`([answer style='inline'],[answer style='inline']) \\rightarrow `+` ( `+B+` )`)+`
	`+tex(`([answer style='inline'],[answer style='inline']) \\rightarrow`+`( ` +C+` )`)
	;
};

self.step_js = function (){};

self.step = function(wrong_answer, step){
	steps = [
	  
		"The coordinates of "+tex(`(PQR)'`)+" can be represented by the matrix "+tex(`\\bold{T'}=`)+math_visuals.matrix.tex(matrix_c), 
	  
	    "The coordinates of "+tex(`(PQR)`)+" are then represented by the matrix "+tex(`\\bold{T}`),
	  
	    tex(`\\bold{A}\\times\\bold{T}=\\bold{T'}`),
	  
	    tex(`\\bold{A^{-1}}\\bold{A}\\times\\bold{T}=\\bold{A^{-1}}\\bold{T'}`),
	  
	    tex(`\\therefore\\space\\bold{T}=\\bold{A^{-1}}\\bold{T'}`),
	  
	    "We then find the matrix "+tex(`\\bold{A^{-1}}`),
	  
	    tex(`\\space\\bold{A^{-1}}=\\,`)+frac_tex(1,det_a/com)+math_visuals.matrix.tex(matrix_a_inv),
	  
	    tex(`\\therefore\\,\\bold{T}=\\,`)+frac_tex(1,det_a/com)+math_visuals.matrix.tex(matrix_a_inv)+math_visuals.matrix.tex(matrix_c)+`<br>`,
	  
	    tex(`\\bold{T}=\\,`)+math_visuals.matrix.tex(matrix_r)
	  
	];
	return steps[step];
};

self.misconception = function(answer){
	return 0; // Default
};

self.correct_answers = function() {
	return [b1,b4,b2,b5,b3,b6];
};