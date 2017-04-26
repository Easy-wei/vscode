// You can specify how much precision you would like in your module like so:
self.precision = 3;
// If you do not specify, the default is 4

// You can specify if the answers are ordered or not like so:
self.ordered_answer = true;
// If you do not specify, the default is false

// If your answer is an expression, setting this argument will allow linear multiples
// For example 2x+2 will be equal to 1x+1 with this argument
self.allow_linear_multiples = true;

// To get the loaded seed, use self.seed. This is useful when you want to hardcode variables for the first couple of exercises for example.
console.log(self.seed);

// You can use math_tools to gennerate random numbers. More about that in another documentation module.
variable_1 = math_tools.rand_int(1, 99);
variable_2 = math_tools.rand_int(1, 99);

// This function should return the question
self.text = function () {
	return `What is ` + variable_1 + ` + ` + variable_2 + `?
	[answer angle_measure="deg" answer keyboard='{{"1","2","3","4","5","6","7","8","9","0"},{".","e","i","+","-","*","/"},{"^","frac","root","cos","sin","tan","()"},{"left","right","del"}}' angle_measure="deg"]`;
	// Notice the [answer] above will output an answer box. More info can be found in another documentation module.
};

// This function will run after self.text is loaded into the DOM of the page. (Optional function)
self.post_load = function () {};


// This function should return the steps needed to explain to a student how they should complete an exercise
// The first input is used to return a different explanation based on the answer of the student
// The second is the the number of the step to be returned
self.step = function (answer, step) {
	steps = [
		"First do this",
		"Then do that",
	];
	return steps[step];
};

// This should return which misconception is detected, based on the students answer. 0 means we didn't detect a specific misconception.
self.misconception = function (answer) {
	return 0; // Default
};

// This should return the correct answer, so we can test against the students input.
self.correct_answers = function () {
	// There are 4 ways to return the answer.
	// In case we only have 1 answer, we can return just 1 number.
	return (variable_1 + variable_2);
	// Here self.ordered_answer doesn't matter.

	// In case self.ordered_answer == false (default) and there are multiple inputs, we can return like this
	//return [1, 2];
	// Here both [1, 2] and [2, 1] are correct answers

	// In case self.ordered_answer == true and we have more than one input
	//return [1, 2];
	// Here only [1, 2] is correct, [2, 1] is not correct

	// In case self.ordered_answer == true and we have more than one input and also different combinations of correct results
	//return [[1,2,3],[3,2,1]];
	// Here only [1,2,3] and [3,2,1] are correct answers, [2,1,3] for example is not correct
};