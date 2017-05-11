self.ordered_answer = true;
//Page109Exercise1.B.step.Finish D

do{
v1 = math_tools.rand_int(1, 9);
v2 = math_tools.rand_int(1, 9);
}
while(v1+2>v2);

function sum_tex(a,n,p,q){
  return tex(`\\displaystyle\\sum\_{`+p+`=`+a+`}^{`+n+`}`+q);
}
function sum (a,n) 
{var sum=0;
  for(var i=a; i <n+1; i++){
		sum+=(i*i);
  }
 return sum;
}

self.text = function() {
	return `Write out `+sum_tex(v1,v2,`r`,`r^2`)+` as a sum of terms

            and hence calculate the sum of the series

[answer]`;
};

var STEP=v1*v1;
for (var j=v1+1;j<v2+1;j++){
  STEP=STEP+(j*j).signed();
  console.log(STEP);
}

self.step = function(wrong_answer, step){
	steps = [
		sum_tex(v1,v2,`r`,`r^2`)+tex(`\\,=\\,`+STEP),
	  tex(`\\therefore\\space`)+sum_tex(v1,v2,`r`,`r^2`)+tex(`\\,=\\,`+sum(v1,v2)),
	];
	return steps[step];
};

self.misconception = function(answer){
	return 0; // Default
};

self.correct_answers = function() {
	return [sum(v1,v2)];
};