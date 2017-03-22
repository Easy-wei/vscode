var array=[1/2,math.sqrt(3)/2,-math.sqrt(3)/2];
var array_s=[`\\dfrac{1}{2}`,`\\dfrac{\\sqrt3}{2}`,`-\\dfrac{\\sqrt3}{2}`];
var ans=[[math.pi/6,math.pi*5/6],[math.pi/3,math.pi*2/3],[math.pi*4/3,math.pi*5/3]];
var ans_s=[[`\\dfrac{\\pi}{6}`,`\\dfrac{5\\pi}{6}`],[`\\dfrac{\\pi}{3}`,`\\dfrac{2\\pi}{3}`],[`\\dfrac{4\\pi}{3}`,`\\dfrac{5\\pi}{3}`]];
var f2=[[`-\\dfrac{\\sqrt{3}}{2}`,`\\dfrac{\\sqrt{3}}{2}`],[`-\\dfrac{1}{2}`,`\\dfrac{1}{2}`],[`\\dfrac{1}{2}`,`-\\dfrac{1}{2}`]];

self.text = function() {
	return `Find any stationary points in the interval ~0\\leqslant x<2\\pi~ on each of the following curves, 
and find out whether they are maxima, minima, or neither.
~\\bold{a)}\\,\\,\\,y=`+num_form.str(array_s[v1])+`x+\\cos x~
there is a maxium at ~x=[answer] ~
and there is a minium at ~x=[answer]~`;
};

self.post_load = function(){
};

self.step_js = function(wrong_answer, step){
};

self.step = function(wrong_answer, step){
	var steps = [
	    `Take ~f(x)=y=\\sin x+\\cos x~`,
		`To find the stationary points, find the ~f'(x)=\\dfrac{dy}{dx}~.`,
	    `~f'(x)=\\dfrac{dy}{dx}=`+array_s[v1]+`-\\sin x~`,
	  `~f'(x)=0~`,
	    `~x=`+ans_s[v1]+`~`,
	  `~f''(x)=-\\cos x~`,
	  `~f''(`+ans_s[v1][0]+`)=`+f2[v1][0]+`~`,
	  `~\\therefore ~`+((v1==2)?`There is a minima at ~x=`+ans_s[v1][0]+`~`:`There is a maximum at ~x=`+ans_s[v1][0]+`~`),
	  `so it's in the same way to find `+((v1==2)?`There is a maximum at ~x=`+ans_s[v1][1]+`~`:`There is a minimum at ~x=`+ans_s[v1][1]+`~`),
	 
	];
	return steps[step];
};
