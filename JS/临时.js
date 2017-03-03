var variable_1 = math_tools.rand_int(1, 99);
	var variable_2 = math_tools.rand_int(1, 99);

	self.text = function() {
		return `
			<h1>line_head_arrow</h1>
			<div id="graph_1"></div><br />
			<h1>line_middle_arrow</h1>
			<div id="graph_2"></div><br />
			<h1>line_stroked</h1>
			<div id="graph_3"></div><br />
			<h1>Animation</h1>
			<div id="graph_4"></div><br />
			<h1>Crazyness</h1>
			<div id="graph_5"></div><br />
		`;
	};

	self.post_load = function(){

	  	// Initialte graphic object by selecting the div id 
		var g1 = new graphic({'input_element': "graph_1"});
	  	// Add a grid element
		g1.add_element({'type': 'grid'});
	  	// Add 'line_head_arrow'. Notice since we didn't specify 'start' it was set to [0,0]
		g1.add_element({'type': 'line_head_arrow', 'end': [3,3]});
	  	// Draw/update the image
		g1.draw();

		// Next example we add another type of arrow called	'line_middle_arrow'.
		var g2 = new graphic({'input_element': "graph_2", 'low_y':-0.5, 'high_y':10.5, 'low_x':-0.5, 'high_x':10.5});
		g2.add_element({'type': 'grid'});
	  	// By also giving 'start' we can make the arrow start from a place different than [0,0]
		g2.add_element({'type': 'line_middle_arrow', 'start': [1,1], 'end': [8,6], 'label':'whatever'});
	  	// Also lets add a dot
		g2.add_element({'type': 'dot', 'pos': [5,7],'text':'hh'});
	    g2.add_element({'type': 'label', 'pos': [2,2], 'text': 'Heey'});
		g2.draw();
	  
		// Here we use 'line_stroked'.
		var g3 = new graphic({'input_element': "graph_3"});
	  	// We can also add labels to the grid elements like so: (labels doesn't auto adjust yet)
		g3.add_element({'type': 'grid', 'x_label': 'X Real', 'y_label': 'Y Imaginary'});
		g3.add_element({'type': 'line_stroked', 'end': [2,-6]});
	  	// We can also add a label to the graph directly
  		g3.add_element({'type': 'label', 'pos': [2,2], 'text': 'Heey'});
		g3.draw();
	  
	  	// We can use a function as coordinate points in order to animate an arrow (doesn't work for all elements)
		
	  	// time is passed to this function from 0 to 1 and it returns the coordinate for a circular path
  	  	var clock_animation = function(time){
			return [Math.sin(time*Math.PI*2)*4, Math.cos(time*Math.PI*2)*4];
		};
	  	
	  	// Since this is an animation, we must pass animation_length to the graphic object
	  	var g4 = new graphic({'input_element': "graph_4", "animation_length": 2});
		g4.add_element({'type': 'grid'});
		g4.add_element({'type': 'line_head_arrow', 'end': clock_animation});
		g4.draw();
	  	
	  	// Lets make a functions for that track only the x axis of the "clock"
  	  	var clock_animation_x = function(time){
			return [Math.sin(time*Math.PI*2)*4, 0];
		};

	  	var g5 = new graphic({'input_element': "graph_5", "animation_length": 5});
		g5.add_element({'type': 'grid'});
	  	g5.add_element({'type': 'line_head_arrow', 'end': clock_animation});
		g5.add_element({'type': 'line_stroked', 'start': clock_animation, 'end': clock_animation_x});
		g5.draw();
	  

	};

	self.step = function(wrong_answer, step){
		steps = [
			"First do this", 
			"Then do that", 
		];
		return steps[step];
	};

	self.misconception = function(answer){
		return 0; // Default
	};

	self.correct_answers = function() {
		return 1;
	};