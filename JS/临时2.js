self.step = function(wrong_answer, step){
	var steps = [
	  `Take ~f(x)=y=\\sin x+\\cos x~`,
		`To find the stationary points, find the ~f'(x)=\\dfrac{dy}{dx}~.`,
	  `~f'(x)=\\dfrac{dy}{dx}=\\cos x-\\sin x~`,
	  `~\\cos x=\\sin x~`,
	  `~\\therefore x=\\dfrac{\\pi}{4}~ or ~\\dfrac{5pi}{4}~`,
	  `~f''(x)=-\\sin x-\\cos x~`,
	  `~f''(\\dfrac{\\pi}{4})=-\\sqrt{2}<0~`,
	  `~f''(\\dfrac{5\\pi}{4})=\\sqrt{2}>0~`,
	  `~\\therefore~ There is therefore a maximun at ~x=\\dfrac{\\pi}{4}~, and a minima at ~x=\\dfrac{5\\pi}{4}~ `,
	  
	];
	return steps[step];
};