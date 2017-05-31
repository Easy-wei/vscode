math_input = function (vars){
	if(typeof vars === "undefined"){
		throw('Error: Required arguments not given. See /static/docs/math_input.html');
	}
	
	var self = this;
	
	// This only runs the first time we register a new input
	if(typeof math_input_instances !== "object"){
		math_input_instances = [this];
		math_input_selected = -1;
	}else{
		// If the array already exists make sure to remove instances that refer to the same id
		for(var key in math_input_instances){
			if(math_input_instances[key].input_div_id == vars.input_div){
				math_input_instances.splice(key, 1);
			}
		}
	}

	if(math_input_instances.indexOf(this) == -1){
		math_input_instances.push(this);
	}

	self.keyboard_presets = {
		"full": 	[["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "pi", "e", "i", "+", "-", "*", "/"], ["^", "frac", "root", "cos", "sin", "tan", "()", "fact"], ["left", "right", "del"]],
		"full_xy": 	[["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "pi", "e", "i", "+", "-", "*", "/"], ["^", "frac", "root", "cos", "sin", "tan", "()"], ["x_var", "y_var", "left", "right", "del"]],
		"full_xyk": 	[["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "pi", "e", "i", "+", "-", "*", "/"], ["^", "frac", "root", "cos", "sin", "tan", "()"], ["x_var", "y_var", "k_var", "left", "right", "del"]],
		"polynomial_n": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["n_var", "left", "right", "del"]],
		"polynomial_x": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["x_var", "left", "right", "del"]],
		"polynomial_xy": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["x_var", "y_var", "left", "right", "del"]],

		"equation_theta": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["θ_var", "left", "right", "del"]],
		"equation_ABx": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["A_var", "B", "x", "left", "right", "del"]],
		"equation_ij": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["i_var", "j_var", "left", "right", "del"]],
		"equation_cx": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["c_var", "x_var", "left", "right", "del"]],
		"equation_a": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["a_var", "left", "right", "del"]],
		"equation_ab": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["a_var", "b_var", "left", "right", "del"]],
		"equation_abxy": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["a_var", "b_var", "x_var", "y_var", "left", "right", "del"]],
		"equation_abcxy": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["a_var", "b_var", "c_var", "x_var", "y_var", "left", "right", "del"]],
		"equation_AB": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["A_var", "B_var", "left", "right", "del"]],
		"equation_ex": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["e_var", "x_var", "left", "right", "del"]],
		"equation_exk": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["e_var", "x_var", "k_var", "left", "right", "del"]],
		"equation_xyk": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["x_var", "y_var", "k_var", "left", "right", "del"]],

		"equation_ln_x": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "ln", "root", "()"], ["x_var", "left", "right", "del"]],
		"equation_log_x": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "+", "-", "*", "/"], ["^", "frac", "log", "root", "()"], ["x_var", "left", "right", "del"]],

		"equations": [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "pi", "e", "i", "+", "-", "*", "/"], ["^", "frac", "root", "cos", "sin", "tan", "()", "fact"], ["equal", "great", "less", "great_equal", "less_equal", "left", "right", "del"]],

		"simple": 	[["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], [".", "pi", "+", "-", "*", "/"], ["^", "frac", "root", "()"], ["left", "right", "del"]],
		"num_int": 	[["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], ["left", "right", "del"]],
		"up_down": 	[["decrease", "increase"]],
	}
	
	if(typeof vars.keyboard === "undefined"){
		vars.keyboard = "full";
	}

	if(!$.isArray(vars.keyboard)){
		vars.keyboard = self.keyboard_presets[vars.keyboard];
	}
	
	self.color = (typeof vars.color === undefined ? "#000000" : vars.color);
	self.keyboard = vars.keyboard;
	self.input_div_id = vars.input_div;
	self.keyboard_div_id = vars.keyboard_div;
	self.change_callback = vars.change_callback;
	self.enter_callback = vars.enter_callback;
	self.can_edit = (typeof vars.can_edit != "undefined" ? vars.can_edit : true);
	self.range = vars.range;
	self.hidden = false;
	
	self.angle_measure = (typeof vars.angle_measure != "undefined" ? vars.angle_measure : 'rad');

	self.empty = function(){
		self.data = ["main", false, true];
		self.cursor = 1;
		self.selected = false;
	}
	self.empty();

	self.hide = function(){
		self.hidden = true;
		$("#"+self.input_div_id).hide();
	}

	self.show = function(){
		self.hidden = false;
		$("#"+self.input_div_id).show();
	}	
	
	if(typeof vars.value !== "undefined"){
		self.data = vars.value;
	}

	var reserved_values = ["main", "plus", "minus", "multi", "divide", "comma", "pow", "frac", "root", "ln", "log", "cos", "sin", "tan", "acos", "asin", "atan", "paren", "fact", "variable", "number", "=", ">", "<", "\\geqslant", "\\leqslant"]; //"inv"
	var operators = ["plus", "minus", "multi", "divide"];
	
	// "Math types": 0 = string type, 1 = string and operators, 2 = functions
	// Javascrupt types: "reserved_value" string = special strings used to define array functions and to denominate operators, string = string, false = placeholder for expected input, array = functions
	// with_selected is where in the array to move the currently selected input. 
	// move_cur moves the cursor to a specific point in the array. Positive values counts from start of array, negative from end.

	self.possible_math_inputs = {
		"minus": {"value": "-", "type": 0}, // This one is special as it doesn't appear in the keyboard

		"0": {"visual": "0", "visual_katex": true, "hotkey": "0", "value": "0", "type": 0},
		"1": {"visual": "1", "visual_katex": true, "hotkey": "1", "value": "1", "type": 0},
		"2": {"visual": "2", "visual_katex": true, "hotkey": "2", "value": "2", "type": 0},
		"3": {"visual": "3", "visual_katex": true, "hotkey": "3", "value": "3", "type": 0},
		"4": {"visual": "4", "visual_katex": true, "hotkey": "4", "value": "4", "type": 0},
		"5": {"visual": "5", "visual_katex": true, "hotkey": "5", "value": "5", "type": 0},
		"6": {"visual": "6", "visual_katex": true, "hotkey": "6", "value": "6", "type": 0},
		"7": {"visual": "7", "visual_katex": true, "hotkey": "7", "value": "7", "type": 0},
		"8": {"visual": "8", "visual_katex": true, "hotkey": "8", "value": "8", "type": 0},
		"9": {"visual": "9", "visual_katex": true, "hotkey": "9", "value": "9", "type": 0},
		".": {"visual": ".", "visual_katex": true, "hotkey": ".", "value": ".", "type": 0},
		"pi": {"visual": "\\pi", "visual_katex": true, "hotkey": "p", "value": "p", "type": 0},
		"e": {"visual": "e", "visual_katex": true, "hotkey": "e", "value": "e", "type": 0},
		"i": {"visual": "i", "visual_katex": true, "hotkey": "i", "value": "i", "type": 0},		
		
		"+": {"visual": "+", "visual_katex": true, "hotkey": "+", "value": ["plus", false], "type": 1, "move_cur": 1},
		"-": {"visual": "-", "visual_katex": true, "hotkey": "-", "value": ["minus", false], "type": 1, "move_cur": 1},
		"*": {"visual": "\\times", "visual_katex": true, "hotkey": "*", "value": ["multi", false], "type": 1, "move_cur": 1},
		"/": {"visual": "/", "visual_katex": true, "hotkey": "/", "value": ["divide", false], "type": 1, "move_cur": 1},

		"^": {"visual": "a^b", "visual_katex": true, "hotkey": "^", "value": ["pow", false, "comma", false, true], "type": 2, "with_selected": 1, "move_cur": 1, "eat_selected": true},
		"frac": {"visual": "\\frac{a}{b}", "visual_katex": true, "hotkey": "f", "value": ["frac", false, "comma", false, true], "type": 2, "with_selected": 1, "move_cur": 1, "eat_selected": true},
		"root": {"visual": "\\sqrt[2]{a}", "visual_katex": true, "hotkey": "r", "value": ["root", ["number", "2", true], "comma", false, true], "type": 2, "with_selected": 3, "move_cur": 3, "eat_selected": false},
		"ln": {"visual": "\\ln{(a)}", "visual_katex": true, "hotkey": "", "value": ["ln", false, true], "type": 2, "with_selected": 1, "move_cur": 1, "eat_selected": false},
		"log": {"visual": "\\log_{a}{b}", "visual_katex": true, "hotkey": "l", "value": ["log", ["number", "10", true], "comma", false, true], "type": 2, "with_selected": 3, "move_cur": 3, "eat_selected": false},
		"cos": {"visual": "\\cos{(a)}", "visual_katex": true, "hotkey": "", "value": ["cos", false, true], "type": 2, "with_selected": 1, "move_cur": 1, "eat_selected": false},
		"sin": {"visual": "\\sin{(a)}", "visual_katex": true, "hotkey": "", "value": ["sin", false, true], "type": 2, "with_selected": 1, "move_cur": 1, "eat_selected": false},
		"tan": {"visual": "\\tan{(a)}", "visual_katex": true, "hotkey": "", "value": ["tan", false, true], "type": 2, "with_selected": 1, "move_cur": 1, "eat_selected": false},
		"acos": {"visual": "\\cos^{-1}{(a)}", "visual_katex": true, "hotkey": "", "value": ["acos", false, true], "type": 2, "with_selected": 1, "move_cur": 1, "eat_selected": false},
		"asin": {"visual": "\\sin^{-1}{(a)}", "visual_katex": true, "hotkey": "", "value": ["asin", false, true], "type": 2, "with_selected": 1, "move_cur": 1, "eat_selected": false},
		"atan": {"visual": "\\tan^{-1}{(a)}", "visual_katex": true, "hotkey": "", "value": ["atan", false, true], "type": 2, "with_selected": 1, "move_cur": 1, "eat_selected": false},
		"()": {"visual": "()", "visual_katex": true, "hotkey": "(", "value": ["paren", false, true], "type": 2, "with_selected": 1, "move_cur": 1, "eat_selected": false},
		"fact": {"visual": "!{a}", "visual_katex": true, "hotkey": "!", "value": ["fact", false, true], "type": 2, "with_selected": 1, "move_cur": 1, "eat_selected": false},

		"left": {"visual": "&#8592;", "visual_katex": false, "hotkey": 37, "value": function(element, instance){instance.cursor_seek(-1)}, "type": 3},
		"right": {"visual": "&#8594;", "visual_katex": false, "hotkey": 39, "value": function(element, instance){instance.cursor_seek(1)}, "type": 3},
		"del": {"visual": "&#9986;", "visual_katex": false, "hotkey": 8, "value": function(element, instance){instance.delete_selected()}, "type": 3},
		"decrease": {"visual": "-", "visual_katex": true, "hotkey": "", "value": function(element, instance){instance.change_selected(-1);}, "type": 3},
		"increase": {"visual": "+", "visual_katex": true, "hotkey": "", "value": function(element, instance){instance.change_selected(1);}, "type": 3},

		"equal": {"visual": "=", "visual_katex": true, "hotkey": "=", "value": ["="], "type": 5},
		"great": {"visual": ">", "visual_katex": true, "hotkey": ">", "value": [">"], "type": 5},
		"less": {"visual": "<", "visual_katex": true, "hotkey": "<", "value": ["<"], "type": 5},
		"great_equal": {"visual": "\\geqslant", "visual_katex": true, "hotkey": "", "value": ["\\geqslant"], "type": 5},
		"less_equal": {"visual": "\\leqslant", "visual_katex": true, "hotkey": "", "value": ["\\leqslant"], "type": 5},
	};
	
	var comparison_operrators = ["=", ">", "<", "\\geqslant", "\\leqslant"];
	var possible_variables = ["A", "B", "C", "a", "b", "c", "e", "x", "y", "z", "n", "θ", "i", "j", "k"];
	
	for(key in possible_variables){
		self.possible_math_inputs[possible_variables[key]+"_var"] = {"visual": possible_variables[key], "visual_katex": true, "hotkey": possible_variables[key], "value": ["variable", parseInt(key), true], "type": 4, "move_cur": 1};
	}

	self.update_keyboard = function(enabled_inputs){
				
		var button_classes = 'book_math_input_key book_math_input_key'+(!is_mobile_device() ? '_no' : '')+'_touch';
		var html = '<div id="keyboard_background" class="book_math_input_keyboard book_math_input_keyboard'+(! is_mobile_device() ? '_no' : '')+'_touch">'+(is_mobile_device() ? '<span class="keyboard_close_button" onclick="$(\'#'+self.keyboard_div_id+'\').hide(); for (var math_input in math_input_instances){math_input_instances[math_input].deselect();};"><img src="static/books/icons/cancel.svg" style="width: 2vw">' : '')+'</span>';

		for (row in enabled_inputs){
			for (id in enabled_inputs[row]){
				input_id = enabled_inputs[row][id];
				if(self.possible_math_inputs[input_id]["visual_katex"]){
					html += '<span id="'+input_id+'" class="'+button_classes+'">'+katex.renderToString(self.possible_math_inputs[input_id]["visual"])+'</span>';
				}else{
					html += '<span id="'+input_id+'" class="'+button_classes+'">'+self.possible_math_inputs[input_id]["visual"]+'</span>';
				}
			}
			html += "<br />";
		}
		html += "</div>";
		
		$("#"+self.keyboard_div_id).html(html);
		
		if(version == "app"){
			$("#keyboard_background").width(window.screen.availWidth);
		}

		if(is_mobile_device() && $("#keyboard_height_padding").length === 0){
			$(document.body).append('<div id="keyboard_height_padding" style="height: 60vh;"></div>');			
			window.scrollBy(0,get_vh()*20);
		}
		
		// Makse sure clicking the keybaord background doesn't deselect it
		$(".book_math_input_keyboard").unbind();
		$(".book_math_input_keyboard").on('touchstart mousedown', function(e){
			e.stopPropagation();
		});
		
		self.register_inputs();
	}

	self.result = function(){
		
		if(self.hidden){return undefined};
		
		var operator_replacements = {"plus": " + ", "minus": " - ", "multi": " * ", "divide": " / "};
		var angle_conversion_constants = {'rad': 1, 'deg': 57.2958};
		var array_replacements = {
			"main": {"pre": "", "comma": "", "post": ""},
			"pow": {"pre": " pow(", "comma": " , ", "post": ")"},
			"frac": {"pre": "((", "comma": ")/(", "post": "))"},
			"root": {"pre": " root[", "comma": ", ", "post": "]"},
			"ln": {"pre": " log(", "comma": "", "post": ",e)"},
			"log": {"pre": "log[", "comma": ",", "post": "]"},
			"cos": {"pre": " cos(", "comma": "", "post": ")*"+angle_conversion_constants[self.angle_measure]},
			"sin": {"pre": " sin(", "comma": "", "post": ")*"+angle_conversion_constants[self.angle_measure]},
			"tan": {"pre": " tan(", "comma": "", "post": ")*"+angle_conversion_constants[self.angle_measure]},
			"acos": {"pre": " acos(", "comma": "", "post": ")*"+angle_conversion_constants[self.angle_measure]},
			"asin": {"pre": " asin(", "comma": "", "post": ")*"+angle_conversion_constants[self.angle_measure]},
			"atan": {"pre": " atan(", "comma": "", "post": ")*"+angle_conversion_constants[self.angle_measure]},
			"paren": {"pre": "(", "comma": "", "post": ")"},
			"fact": {"pre": "factorial(", "comma": "", "post": ")"},

			"plus": {"pre": "(", "comma": " + ", "post": ")"},
			"minus": {"pre": "(", "comma": " - ", "post": ")"},
			"multi": {"pre": "(", "comma": " * ", "post": ")"},
			"divide": {"pre": "(", "comma": " / ", "post": ")"},

			"variable": {"pre": "{", "comma": "", "post": "}"},
			"number": {"pre": "", "comma": "", "post": ""},
			
			"=": {"pre": "=", "comma": "", "post": ""},
			">": {"pre": "<", "comma": "", "post": ""},
			"<": {"pre": ">", "comma": "", "post": ""},
			"\\geqslant": {"pre": "<=", "comma": "", "post": ""},
			"\\leqslant": {"pre": ">=", "comma": "", "post": ""},
			};
			
		var get_value = function(i, input){
			if($.isArray(input)){
				types[input] = input[0];
				temp_result += array_replacements[types[input]]["pre"];
				for (id in input.slice(1)){
					i_traverse = false;
					var field = input[parseInt(id)+1];
					
					// Check if this value or the next is false
					if(field === false || input[parseInt(id)+2] === false){
						return [i, false];
					}

					if(field == "comma"){
						temp_result += array_replacements[types[input]]["comma"];
					}else if(field in operator_replacements){
						temp_result += operator_replacements[field];
					}else if(typeof field == "string"){
						
						has_minus = (field.indexOf("-") > -1);
						has_p = (field.indexOf("p") > -1);
						has_e = (field.indexOf("e") > -1);
						has_i = (field.indexOf("i") > -1);
						
						if(field == "-"){
							field = "1";
						}else{
							field = field.replace(/[^0-9\.]/g, "");
						}
						has_num = (field !== "");

						if(field.indexOf(".") == field.length-1){
							field += "0";
						}
						
						if(!(has_p || has_e || has_i || has_num)){
							return [i, false];
						}

					temp_result += "("+(has_minus?"-":"")+(has_num?field:"1")+(has_p?"*pi":"")+(has_e?"*e":"")+(has_i?"*i":"")+")";
					}else if(typeof field == "number"){
						temp_result += possible_variables[field];
					}
					if($.isArray(field)){
						res = get_value(i+1, field);
						if(!res[1]){
							return res;
						}
						i_traverse = res[0];
					}
					
					i = (i_traverse ? i_traverse : i+1); // Add potential extra counters from traversal
				}
				temp_result += array_replacements[types[input]]["post"];
			}
			return [i, true];
		}
		
		
		types = {};
		temp_result = "";
		var res = get_value(0, self.data);
		if(res[1] && temp_result !== "()"){
			// We need to switch the logical order of fields to do roots and log. Example square of 2: root(2, 4) = pow(4, 1/2)
			var regex = /root\[(.*?), (.*?)]/g;
			while(temp_result.search(regex) >= 0){
				temp_result = temp_result.replace(/root\[(.*?), ((.*?))]/g, "pow(($2), (1/$1))");
			}

			var regex = /log\[(.*?),(.*?)]/g;
			while(temp_result.search(regex) >= 0){
				temp_result = temp_result.replace(/log\[(.*?),((.*?))]/g, "log(($2), ($1))");
			}
			
			var is_equation = ((temp_result.indexOf('=') > -1) || (temp_result.indexOf('>') > -1) || (temp_result.indexOf('<') > -1));
			var is_expression = (temp_result.indexOf('{') > -1); 
			if(is_equation){
				return new equation(temp_result);
			}else if(is_expression){
				return new expression(temp_result);
			}else{
				return new term(math.eval(temp_result));
			}
		}else{
			return false;
		}
		
		
	}

	self.block = function(opp, index, input, input_block){
		var value = (input === undefined ? undefined : JSON.parse(JSON.stringify(input)));
		
		if(input_block === undefined){
			specific_block = self.data;
		}else{
			specific_block = input_block;
		}
		
		if(typeof specific_block == "string"){
			if(opp == "len") return 0;
			return undefined;
		}
		
		var result = null;
		res_i = 0;
		res_type = null;
		res_len = -1;
		var traverse_blocks = function(i, blocks){
			var iter_type = blocks[0];
			var iter_length_start = i;
			var res_found = false;
			for (block_id in blocks){
				if(i == index){
					if(opp == "type"){
						res_type = iter_type;
						res_i = iter_length_start;
						res_found = true;
					}
					if(opp == "set"){
						blocks[block_id] = value;
					}
					if(opp == "del"){
						blocks.splice(block_id, 1);
					}
					if(opp == "ins"){
						blocks.splice(block_id, 0, value);
					}
					result = blocks[block_id];
				}
				
				if($.isArray(blocks[block_id])){
					i = traverse_blocks(i+1, blocks[block_id]);
				}else{
					i += 1;
				}
			}
			// If this is true then we have found our type
			if(res_found){
				res_len = i - iter_length_start;
			}
			return i;
		}

		var i = traverse_blocks(0, specific_block);
		// Check if the insert is just outside the length of the block (actually an append)
		if(i == index && opp == "ins"){
			specific_block.push(value);
		}
		if(opp == "type") return [res_i-1, res_type, res_len];
		if(opp == "get") return result;
		if(opp == "len") return i;
	}
	
	self.last_click = 0;
	
	self.update_display = function(){
		var traverse_blocks = function(i, blocks, inserts){
			var types = [
				{"con": function(i){return self.cursor == i && self.selected && (typeof block_peice !== "string") && block_peice !== true}, "ins": function(i){return '\\underline{\\text{CUR}'}, "post": function(i){return '}'}},
				{"con": function(i){return self.cursor == i && self.selected && (typeof block_peice === "string")}, "ins": function(i){return '\\underline{'}, "post": function(i){return '\\text{CUR}}'}},

				// Last 'true' in the input
				{"con": function(i){return self.cursor == i && self.selected && block_peice === true && i == total_data_length-1}, "pre": function(i){return '\\underline{'}, "end": function(i){return '\\color{#bbbbbb}{\\times}\\text{CUR}}'}},
				{"con": function(i){return self.cursor == i && self.selected && block_peice === true && i != total_data_length-1}, "pre": function(i){return '\\underline{'}, "end": function(i){return '\\text{CUR}}'}},
				
				{"con": function(i){return block_peice === false && (self.cursor != i || !self.selected)}, "ins": function(i){return "\\text{S"+i+"}\\color{#cccccc}{\\circ}\\text{F"+i+"}"}},
				{"con": function(i){return block_peice === "plus"}, "ins": function(i){return "+"}},
				{"con": function(i){return block_peice === "minus"}, "ins": function(i){return "-"}},
				{"con": function(i){return block_peice === "multi"}, "ins": function(i){

					var next = self.block("get", i+1);
					var next_type = typeof next;
					if(next_type === "object"){
						var next_next = self.block("get", i+2);
						if(next_next === "number" || next_next === "variable"){
							var next_type = next_next;
						}
					}

					var prev = self.block("get", i-1);
					var prev_type = typeof prev;
					
					var t = self.block("type", i-2)[1];
					if(t === "number" || t === "variable"){
						prev_type = t;
					}
					
					if(next === false || prev === false){
						return "\\times";
					}
					
					if(prev_type === "array" && next_type !== "number"){
						return "";
					}
					
					if(prev_type === "variable" && next_type !== "number" && next_type !== "variable"){
						return "";
					}
					
					if(prev_type === "number" && next_type !== "number"){
						return "";
					}
					
					return "\\times";
					}},
				{"con": function(i){return block_peice === "divide"}, "ins": function(i){return "/";}},
				{"con": function(i){return block_peice === "pow"}, "ins": function(i){return "{";}, "comma": "}^{", "end": function(i){return "}"}},
				{"con": function(i){return block_peice === "frac"}, "ins": function(i){return "\\text{S"+(i-1)+"}\\frac{";}, "comma": "}{", "end": function(i){return "}\\text{F"+(i-1)+"}"}},
				{"con": function(i){return block_peice === "root"}, "ins": function(i){return "\\text{S"+(i-1)+"}\\sqrt[";}, "comma": "]{", "end": function(i){return "}\\text{F"+(i-1)+"}"}},
				{"con": function(i){return block_peice === "ln"}, "ins": function(i){return "\\text{S"+(i-1)+"}\\ln{(";}, "end": function(i){return ")}\\text{F"+(i-1)+"}"}},
				{"con": function(i){return block_peice === "log"}, "ins": function(i){return "\\text{S"+(i-1)+"}\\log_{";}, "comma": "}{", "end": function(i){return "}\\text{F"+(i-1)+"}"}},
				{"con": function(i){return block_peice === "cos"}, "ins": function(i){return "\\text{S"+(i-1)+"}\\cos{(";}, "end": function(i){return ")}\\text{F"+(i-1)+"}"}},
				{"con": function(i){return block_peice === "sin"}, "ins": function(i){return "\\text{S"+(i-1)+"}\\sin{(";}, "end": function(i){return ")}\\text{F"+(i-1)+"}"}},
				{"con": function(i){return block_peice === "tan"}, "ins": function(i){return "\\text{S"+(i-1)+"}\\tan{(";}, "end": function(i){return ")}\\text{F"+(i-1)+"}"}},
				{"con": function(i){return block_peice === "acos"}, "ins": function(i){return "\\text{S"+(i-1)+"}\\cos^{-1}{(";}, "end": function(i){return ")}\\text{F"+(i-1)+"}"}},
				{"con": function(i){return block_peice === "asin"}, "ins": function(i){return "\\text{S"+(i-1)+"}\\sin^{-1}{(";}, "end": function(i){return ")}\\text{F"+(i-1)+"}"}},
				{"con": function(i){return block_peice === "atan"}, "ins": function(i){return "\\text{S"+(i-1)+"}\\tan^{-1}{(";}, "end": function(i){return ")}\\text{F"+(i-1)+"}"}},
				{"con": function(i){return block_peice === "paren"}, "ins": function(i){return "\\text{S"+(i-1)+"}(";}, "end": function(i){return ")\\text{F"+(i-1)+"}"}},
				{"con": function(i){return block_peice === "fact"}, "ins": function(i){return "\\text{S"+(i-1)+"}!";}, "end": function(i){return "\\text{F"+(i-1)+"}"}},

				{"con": function(i){return block_peice === "="}, "ins": function(i){return "\\text{S"+(i-1)+"}=";}, "end": function(i){return "\\text{F"+(i-1)+"}"}},
				{"con": function(i){return block_peice === ">"}, "ins": function(i){return "\\text{S"+(i-1)+"}>";}, "end": function(i){return "\\text{F"+(i-1)+"}"}},
				{"con": function(i){return block_peice === "<"}, "ins": function(i){return "\\text{S"+(i-1)+"}<";}, "end": function(i){return "\\text{F"+(i-1)+"}"}},
				{"con": function(i){return block_peice === "\\geqslant"}, "ins": function(i){return "\\text{S"+(i-1)+"}\\geqslant";}, "end": function(i){return "\\text{F"+(i-1)+"}"}},
				{"con": function(i){return block_peice === "\\leqslant"}, "ins": function(i){return "\\text{S"+(i-1)+"}\\leqslant";}, "end": function(i){return "\\text{F"+(i-1)+"}"}},

				
//				{"con": function(i){return block_peice === "inv"}, "ins": function(i){return "-"}},

//				{"con": function(i){return block_peice === "var_a"}, "ins": function(i){return ""}, "end": function(i){return "A"}},
//				{"con": function(i){return block_peice === "var_b"}, "ins": function(i){return ""}, "end": function(i){return "B"}},
//				{"con": function(i){return block_peice === "var_c"}, "ins": function(i){return ""}, "end": function(i){return "C"}},
//				{"con": function(i){return block_peice === "var_x"}, "ins": function(i){return ""}, "end": function(i){return "x"}},
//				{"con": function(i){return block_peice === "var_y"}, "ins": function(i){return ""}, "end": function(i){return "y"}},
//				{"con": function(i){return block_peice === "var_z"}, "ins": function(i){return ""}, "end": function(i){return "z"}},

			];

			var blocks_pre = "";
			var blocks_end = "";
			var blocks_comma = "";
			var total_data_length = self.block("len");
			var html = "";
			for (var block_id in blocks){
				var i_traverse = false;
				var block_peice = blocks[block_id];
				
				if(block_id in inserts){
					html += inserts[block_id];
				}
				
				for(var id in types){
					if(types[id]["con"](i)){
						if(typeof types[id]["pre"] === "function"){
							blocks_pre += types[id]["pre"](i);
						}
						if(typeof types[id]["ins"] === "function"){
							html += types[id]["ins"](i);
						}
						if(block_id == 0){
							if(typeof types[id]["comma"] !== "undefined"){
								blocks_comma = types[id]["comma"];
							}
						}
					}
				}

				// Numbers
				if(typeof block_peice == "string" && reserved_values.indexOf(block_peice) == -1){
					var show = block_peice;
					
					show = show.replace('p', '\\pi ');
					
					html += "\\text{S"+i+"}"+show+"\\text{F"+i+"}";
				}

				// variables
				if(type_of(block_peice) === "number"){
					html += " "+possible_variables[block_peice];
				}
				
				if($.isArray(block_peice)){
					var next_inserts = {};
					if(block_peice[0] === "pow"){
						var base_len = block_peice.indexOf('comma');
						var exponenent_len = block_peice.length - block_peice.indexOf('comma');

						// In case this is 5x^2, turn it into (5x)^2 for clearity
						if(base_len > 2){
							next_inserts[1] = "(";
							next_inserts[base_len] = ")";
						}

						// Also make 2+5^2 render as (2+5)^2 when necessary
						if(exponenent_len > 3){
							next_inserts[base_len+1] = "(";
							next_inserts[block_peice.length-1] = ")";
						}

					}
					res = traverse_blocks(i+1, block_peice, next_inserts);
					i_traverse = res[0];
					html += res[1];
				}

				for(var id in types){
					if(types[id]["con"](i)){
						if(typeof types[id]["post"] === "function"){
							html += types[id]["post"](i);
						}
						if(typeof types[id]["end"] === "function"){
							blocks_end += types[id]["end"](i);
						}
					}
				}
				
				if(block_id == blocks.length -1){
					html += blocks_end;
				}
				
				if(block_peice == "comma"){
					html += blocks_comma;
				}
				
				var i = (i_traverse ? i_traverse : i+1); // Add potential extra counters from traversal
			}
			return [i, blocks_pre+html];
		}
		
		var html = traverse_blocks(0, self.data, {})[1];

		html = katex.renderToString(html);
		html = html.replace(new RegExp('<span class="text mord (text|script|scriptscript)style (un|)cramped"><span class="mord mathrm">C</span><span class="mord mathrm">U</span><span class="mord mathrm">R</span></span>'), '<span id="'+self.input_div_id+'_book_cursor" class="mock_cursor_math">|</span>');
		var len = self.block("len");
		var i = 0;
		while (i <= len){
			replace = '';
			str = i + "";
			for (var i2 = 0, len2 = str.length; i2 < len2; i2++) {
				replace += '<span class="mord mathrm">'+str[i2]+'</span>';
			}
			html = html.replace(new RegExp('<span class="text mord (text|script|scriptscript)style (un|)cramped"><span class="mord mathrm">S</span>'+replace+'</span>'), '<span id="cur_'+i+'" class="cursor_click">');
			html = html.replace(new RegExp('<span class="text mord (text|script|scriptscript)style (un|)cramped"><span class="mord mathrm">F</span>'+replace+'</span>'), '</span>');
			i += 1;
		}

		$(".cursor_click").unbind();
		$("#"+self.input_div_id).html('<span style="color: '+self.color+'">'+html+'</html>');
		
		if(self.can_edit){
			$(".cursor_click").on('touchstart mousedown', function(e){
				e.preventDefault();
				if(math_input_selected.last_click != e.timeStamp){
					math_input_selected.cursor = parseInt(e.currentTarget.id.substring(4), 10);
				}
				math_input_selected.last_click = e.timeStamp;
			});
		}
	}

	self.change_number_string = function(element, input, front){
		// We cant have more than one dot
		if(input == "." && element.indexOf(".") > -1){
			return element;
		}

		var has_m = ((element.indexOf("-") > -1) ? ! (input == "-") : (input == "-")); // XOR
		var has_p = ((element.indexOf("p") > -1) ? ! (input == "p") : (input == "p"));
		var has_e = ((element.indexOf("e") > -1) ? ! (input == "e") : (input == "e"));
		var has_i = ((element.indexOf("i") > -1) ? ! (input == "i") : (input == "i"));
		
		var res = (front ? input + element : element+input);
		
		var res = res.replace(/[^0-9\.]/g, "");
		if(type_of(self.range) === "array"){
			res = Math.max(self.range[0], Math.min(self.range[1], res));
		}
		res = (has_m?"-":"")+res+(has_p?"p":"")+(has_e?"e":"")+(has_i?"i":"");
		
		/* Remove preceding zero?
		if(res.length > 1 && res[0] == 0){
			res = res.substr(1);
		} */
		return (res === "" ? false : res);
	}
	
	self.new_input = function(key, instance){
		var element = self.block("get", self.cursor);
		var input = self.possible_math_inputs[key]["value"];
		var type = self.possible_math_inputs[key]["type"];
		var with_selected = self.possible_math_inputs[key]["with_selected"];
		var move_cur = self.possible_math_inputs[key]["move_cur"];
		var move_from_start = self.possible_math_inputs[key]["move_from_start"];
		var eat_selected = self.possible_math_inputs[key]["eat_selected"];
		
		if(element === true && type != 1 && type != 3){
			var check = self.block("get", self.cursor-2);
			var check2 = self.block("get", self.cursor-3);
			if(check != "number" && check != "variable"){
				var type1 = self.block("type", self.cursor);
				var type2 = self.block("type", self.cursor-1);
				var same_array = (type1[1] === type2[1]);
				
				if(type === 5 && type1[1] !== "main"){
					return;
				}
				
				// Since true is always at the end of an array, we need to step out of it, unless we are at main (in which case there is nothing to step out of)
				if(type1[1] !== "main"){
					self.cursor += 1;
				}
				
				if(check2 !== "number" && check2 !== "variable" && !same_array){
					self.cursor += 1;
				}
				
				self.block("ins", self.cursor, false);
				self.block("ins", self.cursor, "multi");
				self.cursor_seek(1);
				self.new_input(key);
				return;
			}else if(type === 5){
				self.cursor_seek(1);
			}else if((((type !== 0 && check == "number") || check == "variable") && eat_selected !== true)){
				var check = self.block("get", self.cursor+1);
				if(!check == "comma"){
					self.cursor_seek(1);
				}else{
					self.block("ins", self.cursor+1, false);
					self.block("ins", self.cursor+1, "multi");
					self.cursor_seek(1);
					element = false;
				}
			}
		}
		
		if(element === true && type == 1){
				var check = self.block("get", self.cursor-2);
				if(check == "number" || check == "variable"){
					self.cursor += 1;
					self.block("ins", self.cursor, false);
					self.block("ins", self.cursor, false);
					self.block("set", self.cursor, self.possible_math_inputs[key]["value"][0]);
					self.cursor_seek(1);
				}else{
					self.block("ins", self.cursor, false);
					self.block("ins", self.cursor, self.possible_math_inputs[key]["value"][0]);
					self.cursor_seek(1);
				}
				return;
		}
		
		if(typeof input == "function"){
			input(element, instance);
		}else{
			if(type == 0){
				// If we type a string type while having an array selected we create a multi 
				if(type_of(element) === "array"){
					// Check if we are in front of a number
					if(self.block("get", self.cursor+1) === "number"){
						var res = self.change_number_string(self.block("get", self.cursor+2), input, true);
						self.block("set", self.cursor+2, res);

					}else{
						self.block("ins", self.cursor, "multi");
						self.block("ins", self.cursor, ["number", input, true]);
						self.cursor_seek(1);
					}
				}
				
				if(element === true){
					// check if previous thing is a number
					if(self.block("get", self.cursor-2) == "number"){
						var res = self.change_number_string(self.block("get", self.cursor-1), input, false);
						if(res === false){
							self.cursor += -3;
							self.block("set", self.cursor, false);
						}else{
							self.block("set", self.cursor-1, res);
						}
					}else{
						self.block("ins", self.cursor, false);
						self.block("ins", self.cursor, "multi");
						self.cursor += 1;
						element = self.block("get", self.cursor);
					}
				}
				
				if(element === false){
					if($.isArray(self.range) && !(isNaN(input))){
						res = Math.max(self.range[0], Math.min(self.range[1], input));
					}else{
						res = input;
					}
					self.block("set", self.cursor, ["number", ""+res, true]);
					self.cursor += 3;
				}

			// Opperators
			}else if(type == 1){
				if(element === false && key === "-"){
					this.new_input("minus");	
					return;
				}

				len = self.block("len", null, null, element);
				var ii = input.length -1;
				while(ii >= 0){
					self.block("ins", self.cursor+1+len, input[ii]);
					ii += -1;
				}
			
			// Special functions
			}else if(type == 2){
				// Check if they are of the same type
				if(self.block("get", self.cursor+1) == input[0]){
					var current = self.block("get", self.cursor);
					if(current[current.length-1] === true){
						current = current.slice(with_selected,-1);
					}else{
						current = current.slice(with_selected);
					}
					self.block("del", self.cursor);
					var i = 0;
					while(i < current.length){
						if(current[i] == "comma"){
							break;
						}
						self.block("ins", self.cursor+i, current[i]);
						i += 1;
					}
					move_cur = undefined;
					var test = self.block("get", self.cursor-2);
					// If array type was something without 'true' it will now only be 1 in length and we need to remove it (like inv)
					if(type_of(test) === "array" && test.length === 1){
						self.block("del", self.cursor-2);
						self.cursor += -2;
					}
				}else{
					if(eat_selected || element === false){
						var check = self.block("get", self.cursor-2);
						if(check == "number" || check == "variable"){
							self.cursor_seek(-1);
						}
						input[with_selected] = self.block("get", self.cursor);
						self.block("set", self.cursor, input);
						
						if(input[with_selected] !== false){
							if(with_selected === 1 && input.length == 5){
								self.cursor += 2 + (typeof input[with_selected].length == "undefined" ? 0 : input[with_selected].length);
							}
						}
					}else if(element === true){
						var type = self.block("type", self.cursor);
//						self.cursor += 1;
						if(type[1] === "main"){
							self.block("ins", self.cursor, true);
							self.block("ins", self.cursor, input);
							self.block("set", self.cursor-1, "multi");
						}else{
							self.block("ins", self.cursor, input);
							self.block("ins", self.cursor, "multi");
						}
						self.cursor += 1;
					}else{
						self.block("ins", self.cursor, "multi");
						self.block("ins", self.cursor, input);
					}
				}
			
			// Variables
			}else if(type == 4){
				if(element !== false){
					self.block("ins", self.cursor, input);
					self.block("ins", self.cursor, "multi");
					self.cursor_seek(1);
				}else{
					self.block("set", self.cursor, input);
				}
			
			// Comparison opperators
			}else if(type == 5){
				var type = self.block("type", self.cursor);
				if(type[1] === "main"){
					if(element === true){
						self.block("ins", self.cursor, false);
						self.block("ins", self.cursor, input);
						self.cursor_seek(1);
					}else if(element === false){
						self.block("ins", self.cursor, input);
						self.block("ins", self.cursor, false);
						self.cursor_seek(1);
					}
				}
			}
			
			if(move_cur !== undefined){
				var i = 0
				while(i < move_cur){
					self.cursor_seek(1);
					i += 1;
				}
			}
		}
		if(typeof self.change_callback == "function"){
			self.change_callback();
		}
	}
	
	self.select = function(instance){
		math_input_selected = instance;
		$("#"+instance.input_div_id).addClass("book_math_input_active");
		instance.update_keyboard(instance.keyboard);
		instance.selected = true;
		$("#"+instance.keyboard_div_id).show();
		instance.update_display();
	}
	
	self.deselect = function(){
		self.selected = false;
		$("#"+self.input_div_id).removeClass("book_math_input_active");
		$("#"+self.input_div_id+"_book_cursor").remove();
		self.update_display();
	}

	self.register_inputs = function(){
		$("#"+self.input_div_id).unbind();
		$(".book_math_input_key").unbind();
		if(self.can_edit){
			$("#"+self.input_div_id).on('touchstart mousedown', function(e){
				for (var math_input in math_input_instances){
					if(math_input_instances[math_input] !== self){
						math_input_instances[math_input].deselect();
					}
				}
				
				//for non mobile this is handled in another place
				if(!is_mobile_device()){
					e.preventDefault();
				}
				e.stopPropagation();
				self.clicked = true;
				self.select(self);
			});
			
			if(is_mobile_device()){
				$(".book_math_input_key").on('touchstart', function(e){
					e.preventDefault();
					self.new_input(e.currentTarget.id, self);
					self.update_display();
					e.stopPropagation();
				});
			}else{
				$(".book_math_input_key").on('touchstart mousedown', function(e){
					e.preventDefault();
					self.new_input(e.currentTarget.id, self);
					self.update_display();
					e.stopPropagation();
				});
			}
		}
	}
	
	
	self.delete_selected = function(){
		var element = self.block("get", self.cursor);
		if(self.cursor === 1){
			if(element !== false && (type_of(element) != "array" || element[0] != "number")){
				self.block("set", self.cursor, false);
				return;
			}

			if(operators.indexOf(self.block("get", self.cursor+1)) > -1){
				self.block("del", self.cursor);
				self.block("del", self.cursor);
				return;
			}
		}
		
		var test = self.block("get", self.cursor-2);
		var element_1eft = self.block("get", self.cursor-1);
		if(comparison_operrators.indexOf(element_1eft) > -1){
			var element_right = self.block("get", self.cursor+1);
			if(element === false && element_right === true){
				self.block("del", self.cursor);
				self.block("del", self.cursor-2);
				self.cursor_seek(-1);
				self.cursor_seek(-1);
			}else{
				if(element === false){
					self.cursor_seek(1);
				}
				self.cursor_seek(1);
				self.delete_selected();
				return;
			}

		}else if(test == "number"){
			element = self.block("get", self.cursor-1);
			var number = element.replace(/[^0-9\.]/g, "");
			
			if(number.length > 0){
				var has_m =  (element.indexOf("-") > -1);
				var has_p =  (element.indexOf("p") > -1);
				var has_e =  (element.indexOf("e") > -1);
				var has_i =  (element.indexOf("i") > -1);
				
				var result = (has_m?"-":"")+number.substring(0, number.length - 1)+(has_p?"p":"")+(has_e?"e":"")+(has_i?"i":"");
			}else{
				var result = element.substring(0, element.length - 1);
			}

			if(result.length > 0){
				self.block("set", self.cursor-1, result);
			}else{
				self.cursor += -3;
				self.block("set", self.cursor, false);
			}

		}else if(type_of(element) === "array"){
			var cursor_temp = self.cursor;
			self.cursor_seek(-1);
			if (self.cursor !== cursor_temp) self.delete_selected();
			
		}else if(element === false){
			if(operators.indexOf(self.block("get", self.cursor-1)) > -1){
				self.block("del", self.cursor);
				self.block("del", self.cursor-1);
				self.cursor += -2;
			}else{
				var type = self.block("type", self.cursor); // returns cursor_offset in array, array type, and array length
				var array = self.block("get", type[0]);
				var has_arr = false;
				for(key in array){
					has_arr = has_arr || typeof array[key] == "object";
				}

				if(!has_arr && type[1] !== "main"){
					self.block("set", type[0], false);
					self.cursor = type[0];
				}else{
					self.cursor_seek(-1);
				}
				
			}
			
		}else if(element === true){
			var type = self.block("type", self.cursor);
			if(type[1] !== "main"){
				self.cursor += - type[2];
				self.block("set", self.cursor, false);
			}else{
				self.cursor_seek(-1);
			}
		}
	}

	self.change_selected = function(amount){
		var element = self.block("get", self.cursor);
		element = Math.min(self.range[1], Math.max(self.range[0], parseInt(element) + amount));
		self.block("set", self.cursor, element.toString());
	}

	self.cursor_seek = function(direction){
		var skip_vals = ["=", ">", "<", "\\geqslant", "\\leqslant"];
		var length = self.block("len");
		self.cursor = parseInt(self.cursor, 10);
		self.cursor += direction;
		var element = self.block("get", self.cursor);
		while(element === null || (typeof element !== "object" && typeof element !== "boolean") || skip_vals.indexOf(element[0]) > -1){
			self.cursor += direction;
			if(self.cursor < 0){
				self.cursor_seek(1);
			}else if(self.cursor >= length){
				self.cursor_seek(-1);
			}
			element = self.block("get", self.cursor);
		}
	}
	
	if(typeof math_input_events_registered === "undefined"){
		math_input_events_registered = true;
		if(!is_mobile_device()){
			$(document).on('touchstart mousedown', function(e){
				var any_selected = false;
				for (var math_input in math_input_instances){
					input = math_input_instances[math_input];
					if(input.clicked){
						input.clicked = false;
						any_selected = true;
						e.preventDefault();
					}else{
						input.deselect();
					}
				}
			});
		}

		var map = {};
		$(document).keydown(function(e){
			e = e || event;
			map[e.keyCode] = e.type == 'keydown';
			
			if(typeof math_input_selected === "object"){
				if(math_input_selected.selected){
					var match = false;
					for(var row in math_input_selected.keyboard){
						for(var key in math_input_selected.keyboard[row]){
							hotkey = self.possible_math_inputs[math_input_selected.keyboard[row][key]]["hotkey"];
							if((typeof hotkey == "string" && hotkey == e.key) || (typeof hotkey == "number" && hotkey == e.which)){
								math_input_selected.new_input(math_input_selected.keyboard[row][key], math_input_selected);
								match = true;
							}
						}
					}
					
					// Enter pressed
					if(e.which == 13){
						if(typeof math_input_selected.enter_callback == "function"){
							enter_callback.change_callback();
							match = true;
						}else{
							math_input_selected.deselect();
							$("#"+math_input_selected.keyboard_div_id).hide();
						}
					}
					
					// Tab
					if(e.which == 9){
						math_input_selected.deselect();
						
						// Select the first visible instance or stop searching if we check through everything
						var first_instance = math_input_instances.indexOf(math_input_selected);
						var this_instance = (first_instance+1) % math_input_instances.length;
						
						while(! $("#"+math_input_instances[this_instance].input_div_id).is(":visible") && this_instance != first_instance){
							this_instance = (this_instance+1) % math_input_instances.length;
						}
						
						self.select(math_input_instances[this_instance]);
						match = true;
					}
					
					// CTR + V
					if(map[17] && map[86]){
						match = true;
					}
					
					if(match){
						math_input_selected.update_display();
						e.preventDefault();
					}
				}
			}
		});
		
		$(document).keyup(function(e){
			e = e || event;
			map[e.keyCode] = e.type == 'keydown';
		});
	}

	self.register_inputs();
	self.update_display();
}