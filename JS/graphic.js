// Globally register instances so events can be triggered without having a reference to the class that spawned the onclick html
graphics_all_instances = {};

// Which element to track on mouse move
graphics_mouse_move_element = false;
graphics_mouse_move_initial = false;

_graphic = false;

graphic = function (vars){
	// Init
	var self = this;

	self.input_element = vars['input_element'];
	if(typeof graphics_all_instances[self.input_element] === "undefined"){
		graphics_all_instances[self.input_element] = self;
	}
	
	self.interactive_elements = {};
	
	self.set_grid = function(vars){
		self.low_x = (typeof vars['low_x'] === "undefined" ? -7.5 : vars['low_x']);
		self.low_y = (typeof vars['low_y'] === "undefined" ? -7.5 : vars['low_y']);
		self.high_x = (typeof vars['high_x'] === "undefined" ? 7.5 : vars['high_x']);
		self.high_y = (typeof vars['high_y'] === "undefined" ? 7.5 : vars['high_y']);
		self.scale = (typeof vars['scale'] === "undefined" ? 3 : vars['scale']);

		self.width = self.high_x - self.low_x;
		self.height = self.high_y - self.low_y;
	}

	self.set_grid(vars);

	var vmin = get_vmin() * self.scale;

	self.animation_length = (typeof vars['animation_length'] === "undefined" ? -1 : vars['animation_length']);
	self.looping = (typeof vars['looping'] === "undefined" ? true : vars['looping']);

	self.elements = [];

	$('#'+self.input_element).html(`
	<div id="`+self.input_element+`_touch_overlay" style="position: absolute; user-select: none;"> </div>
	<canvas id="`+self.input_element+`_canvas"></canvas>
	`);
	
	var c=document.getElementById(self.input_element+'_canvas');
	self.ctx = c.getContext("2d");

	$('#'+self.input_element+'_touch_overlay').on('mousedown touchstart', function(e) { //touchstart
		// Ghost mouseclick nonsense
		if(e.originalEvent == "TouchEvent"){self.has_touch = true;}
		if(e.originalEvent == "MouseEvent" && self.has_touch){return;}

		for(key in self.interactive_elements){
			if(e.originalEvent.touches){
				var element_pos = $("#"+self.input_element).position();
				var rel_pos = [e.originalEvent.touches[0].pageX - element_pos.left, e.originalEvent.touches[0].pageY - element_pos.top];
			}else{
				var rel_pos = [e.offsetX, e.offsetY];
			}
			var hitbox_size = vmin*1;
			
			var hitbox = [(self.interactive_elements[key].hitbox[0] - self.low_x) *vmin, -(self.interactive_elements[key].hitbox[1] - self.high_y) *vmin];
			if(hitbox[0] - hitbox_size < rel_pos[0] && hitbox[0] + hitbox_size > rel_pos[0] && hitbox[1] - hitbox_size < rel_pos[1] && hitbox[1] + hitbox_size > rel_pos[1]){
				graphics_mouse_move_initial = (e.originalEvent.touches ? [e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY] : [e.clientX, e.clientY]);
				graphics_mouse_move_element = self.interactive_elements[key];
				graphics_mouse_move_element.update(false);
			}
		}
	});

	$('#'+self.input_element+'_touch_overlay').on('mousemove touchmove', function(event) { // touchmove
		if(graphics_mouse_move_element !== false){
			var pos = (event.originalEvent.touches ? [event.originalEvent.touches[0].pageX, event.originalEvent.touches[0].pageY] : [event.clientX, event.clientY]);
			graphics_mouse_move_element.update([pos[0]-graphics_mouse_move_initial[0], -pos[1]+graphics_mouse_move_initial[1]]);
			graphics_mouse_move_initial = pos;
		}
	});

	$('#'+self.input_element+'_touch_overlay').on('mouseup touchend', function(e) { // touchend
		graphics_mouse_move_element = false;
		graphics_mouse_move_initial = false;
	});

	// Helper func
	var arrow_points_helper = function(st, en, clockwise){
		if(typeof st == "function" || typeof en == "function"){
			return function(time, elements){
				var start = (typeof st == "function" ? st(time, elements) : st);
				var end = (typeof en == "function" ? en(time, elements) : en);
				var cos = 0.866; // 30 deg
				var sin = 0.500;
				var line_len = Math.sqrt(Math.pow(end[0] - start[0],2) + Math.pow(end[1] - start[1],2));
				var scale_factor = 0.4;
				var dx = scale_factor * (start[0] - end[0]) / line_len;
				var dy = scale_factor * (start[1] - end[1]) / line_len;

		    	return (clockwise ? [end[0] + (dx * cos + dy * -sin), end[1] + (dx * sin + dy * cos)] :	[end[0] + (dx * cos + dy * sin),  end[1] + (dx * -sin + dy * cos)]);
	    	}
	    }else{
			var start = st;
			var end = en;
			var cos = 0.866; // 30 deg
			var sin = 0.500;
			var line_len = Math.sqrt(Math.pow(end[0] - start[0],2) + Math.pow(end[1] - start[1],2));
			var scale_factor = 0.4;
			var dx = scale_factor * (start[0] - end[0]) / line_len;
			var dy = scale_factor * (start[1] - end[1]) / line_len;

	    	return (clockwise ? [end[0] + (dx * cos + dy * -sin), end[1] + (dx * sin + dy * cos)] :	[end[0] + (dx * cos + dy * sin),  end[1] + (dx * -sin + dy * cos)]);
	    }
	}

	// "basic shapes" these are ultimately responsible for taking user formatted functions and creating a canvas function from them

	var basic_line = function(vars){
		return function(time, element_variables){
			var start = (typeof vars['start'] === "function" ? vars['start'](time, element_variables) : vars['start']);
			var end = (typeof vars['end'] === "function" ? vars['end'](time, element_variables) : vars['end']);
			_graphic.ctx.setLineDash((typeof vars['line_dash'] !== "undefined" ? vars['line_dash'] : []));
			_graphic.ctx.beginPath();
			_graphic.ctx.moveTo((start[0] - _graphic.low_x) *vmin, (_graphic.height - start[1] + _graphic.low_y) *vmin);
			_graphic.ctx.lineTo((end[0] - _graphic.low_x) * vmin, (_graphic.height - end[1] + _graphic.low_y) *vmin);
			if(typeof vars['color'] !== "undefined"){_graphic.ctx.strokeStyle = vars['color'];}
			_graphic.ctx.lineWidth = (typeof vars['width'] !== "undefined" ? vars['width'] * vmin : 1);
			_graphic.ctx.stroke();
		}
	}

	var basic_arc = function(vars){
		return function(time){
			var pos = (typeof vars['pos'] === "function" ? vars['pos'](time) : vars['pos']);
			pos = [(pos[0] - _graphic.low_x) * vmin, (_graphic.height - pos[1] + _graphic.low_y) *vmin];
			var start_angle = (typeof vars['start_angle'] !== "undefined" ? (typeof vars['start_angle'] === "function" ? vars['start_angle'](time) : vars['start_angle']) : 0);
			var end_angle = (typeof vars['end_angle'] !== "undefined" ? (typeof vars['end_angle'] === "function" ? vars['end_angle'](time) : vars['end_angle']) : 2 * Math.PI);
			_graphic.ctx.beginPath();
			_graphic.ctx.arc(pos[0], pos[1], (typeof vars['radius'] === "undefined" ? 1 : vars['radius']) * vmin, start_angle, end_angle, vars['clockwise'] === false);
			if(vars['fill_color']){
				_graphic.ctx.fillStyle = (typeof vars['fill_color'] !== "undefined" ? vars['fill_color'] : '#000000');
				_graphic.ctx.fill();
			}
			if(typeof vars['stroke'] === "undefined" || vars['stroke'] === true){
				_graphic.ctx.lineWidth = (typeof vars['stroke_width'] === "undefined" ? 1 : vars['stroke_width'] * vmin);
				_graphic.ctx.strokeStyle = (typeof vars['stroke_color'] === "undefined" ? '#000000' : vars['stroke_color']);
				_graphic.ctx.stroke();
			}
		}
	}

	var basic_rounded_box = function(vars){
		return function(time){
			var pos = (typeof vars['pos'] === "function" ? vars['pos'](time) : vars['pos']);
			var w = vars['width'] * vmin;
			var h = vars['height'] * vmin;
			var r = vars['radius'] * vmin;
			var x = (vars['pos'][0] - _graphic.low_x) * vmin + r;
			var y = (_graphic.height - vars['pos'][1] + _graphic.low_y) *vmin
			_graphic.ctx.beginPath();
			_graphic.ctx.moveTo(x, y);
			x += w - 2*r;
			_graphic.ctx.lineTo(x, y);
			x += r;
			y += -r;
			_graphic.ctx.quadraticCurveTo(x, y+r, x, y);
			y += -h+r*2;
			_graphic.ctx.lineTo(x, y);
			x += -r;
			y += -r;
			_graphic.ctx.quadraticCurveTo(x+r, y, x, y);
			x += -w+2*r;
			_graphic.ctx.lineTo(x, y);
			x += -r;
			y += r;
			_graphic.ctx.quadraticCurveTo(x, y-r, x, y);
			y += h-2*r;
			_graphic.ctx.lineTo(x, y);
			x += r;
			y += r;
			_graphic.ctx.quadraticCurveTo(x-r, y, x, y);
			if(typeof vars['stroke_color'] !== "undefined"){_graphic.ctx.strokeStyle = vars['stroke_color'];}
			if(vars['fill_color']){
				_graphic.ctx.fillStyle = (typeof vars['fill_color'] !== "undefined" ? vars['fill_color'] : '#000000');
				_graphic.ctx.fill();
			}
			if(typeof vars['stroke'] !== "undefined"){_graphic.ctx.lineWidth = vars['stroke'] * vmin;}
			if(vars['stroke'] !== false){_graphic.ctx.stroke();}
		}
	}


	var basic_label = function(vars){
		return function (time){
			var pos = (typeof vars['pos'] === "function" ? vars['pos'](time) : vars['pos']);
			_graphic.ctx.font = (typeof vars['size'] !== "undefined" ? vars['size'] * vmin : 0.7 * vmin)+'px '+(typeof vars['font'] !== "undefined" ? vars['font'] : 'Calibri');
			_graphic.ctx.textAlign = (typeof vars['horizontal_anchor'] !== "undefined" ? vars['horizontal_anchor'] : 'center');
			_graphic.ctx.textBaseline = (typeof vars['vertical_anchor'] !== "undefined" ? vars['vertical_anchor'] : 'middle');
			_graphic.ctx.fillStyle = (typeof vars['color'] !== "undefined" ? vars['color'] : "#000000");
			_graphic.ctx.fillText(vars['text'], (pos[0] - _graphic.low_x) *vmin, (_graphic.height - pos[1] + _graphic.low_y) *vmin);
		}
	}

	self.element = function(vars, parent){
		// Elements are really just a way to batch add shapes to the element object, which then handles them correctly.
		// For complex things the user should build their own elements
		
		var self = this;
		self.parent = parent;
		
		self.frames = [{'scale': 1, 'rotation': 0, 'move': [0,0], 'origin': ['center', 'center'], 'styles': {}}];
		self.attr_funcs = [];
		self.shapes = [];
		
		if(vars['type'] === "line"){
			self.start = (typeof vars['start'] === "undefined" ? [0,0] : vars['start']);
			self.end = vars['end'];
			self.color = (typeof vars['color'] === "undefined" ? 'black' : vars['color']);
			self.width = vars['width'];
		
			self.shapes.push(basic_line({'start': self.start, 'end': self.end, 'color': self.color, 'width': self.width}));
		}
		
		if(vars['type'] === "line_head_arrow"){
			self.start = (typeof vars['start'] === "undefined" ? [0,0] : vars['start']);
			self.end = vars['end'];
			self.color = (typeof vars['color'] === "undefined" ? 'black' : vars['color']);

			self.shapes.push(basic_line({'start': self.start, 'end': self.end, 'color': self.color, 'width': self.width}));
			self.shapes.push(basic_line({'start': arrow_points_helper(self.start, self.end, true), 'end': self.end, 'color': self.color, 'width': self.width}));
			self.shapes.push(basic_line({'start': arrow_points_helper(self.start, self.end, false), 'end': self.end, 'color': self.color, 'width': self.width}));
		}

		if(vars['type'] === "line_middle_arrow"){
			self.start = (typeof vars['start'] === "undefined" ? [0,0] : vars['start']);
			self.end = vars['end'];
			self.middle = [(self.end[0] - self.start[0])/2+self.start[0], (self.end[1] - self.start[1])/2+self.start[1]];

			self.shapes.push(basic_line({'start': self.start, 'end': self.end, 'color': self.color, 'width': self.width}));

			var res = arrow_points_helper(self.start, self.middle, true);
			self.shapes.push(basic_line({'start': self.middle, 'end': res, 'color': self.color, 'width': self.width}));

			res = arrow_points_helper(self.start, self.middle, false);
			self.shapes.push(basic_line({'start': self.middle, 'end': res, 'color': self.color, 'width': self.width}));

			self.shapes.push(basic_arc({'pos': self.end, 'radius': 0.15, 'fill_color': self.color, 'stroke': false}));
		}

		if(vars['type'] === "line_stroked"){
			self.start = (typeof vars['start'] === "undefined" ? [0,0] : vars['start']);
			self.end = vars['end'];

			self.shapes.push(basic_line({'start': self.start, 'end': self.end, 'color': self.color, 'width': self.width, 'line_dash': [5, 5]}));
		}

		if(vars['type'] === "grid"){
			self.colors = ["#2a576e", "#a0dafb", "#cceeff"];

			self.label_dist = (typeof vars['label_dist'] === "undefined" ? 5 : vars['label_dist']);

			var lines = {'0':[],'1':[],'2':[]};

			var y = Math.floor(self.parent.low_y);
			while(y <= self.parent.high_y+1){
				if(y === 0){
					var type = 0;
				}else if(y % 5 === 0){
					var type = 1;
				}else{
					var type = 2;
				}
				lines[type].push(basic_line({'start': [self.parent.low_x, y], 'end': [self.parent.high_x, y], 'color': self.colors[type]}));
				y += 1;
			}

			var x = Math.floor(self.parent.low_x);
			while(x <= self.parent.high_x+1){
				if(x === 0){
					var type = 0;
				}else if(x % 5 === 0){
					var type = 1;
				}else{
					var type = 2;
				}
				lines[type].push(basic_line({'start': [x, self.parent.low_y], 'end': [x, self.parent.high_y], 'color': self.colors[type]}));
				x += 1;

				self.shapes = lines[2].concat(lines[1]).concat(lines[0]);
			}

			if(self.label_dist > 0){
				var i = Math.floor(self.parent.low_x);
				while(i <= self.parent.high_x){
					if(i % self.label_dist === 0 && i !== 0){
						self.shapes.push(basic_label({"text":i, "pos":[i, 0.2], 'vertical_anchor': 'bottom'}));
					}
					i += 1;
				}
				i = Math.floor(self.parent.low_y);
				while(i <= self.parent.high_y){
					if(i % self.label_dist === 0 && i !== 0){
						self.shapes.push(basic_label({"text":i, "pos":[0.2, i], 'horizontal_anchor': 'left'}));
					}
					i += 1;
				}
			}
		}

		if(vars['type'] === "label"){
			self.text = vars['text'];
			self.pos = vars['pos'];
			self.shapes.push(basic_label(vars));
		}

		if(vars['type'] === "rect"){
			self.pos = vars['pos'];
			self.width = vars['width'];
			self.height = vars['height'];
			self.color = (typeof vars['color'] === "undefined" ? "none" : vars['color']);
			self.corner_x = (typeof vars['corner_x'] === "undefined" ? 0 : vars['corner_x']);
			self.corner_y = (typeof vars['corner_y'] === "undefined" ? 0 : vars['corner_y']);
			self.stroke_color = (typeof vars['stroke_color'] === "undefined" ? "black" : vars['stroke_color']);
			self.stroke_width = (typeof vars['stroke_width'] === "undefined" ? 1 : vars['stroke_width']);
		
			self.shapes.push(basic_line({'start': self.pos, 'end': [self.pos[0]+self.width, self.pos[1]], 'color': self.color}));
			self.shapes.push(basic_line({'start': [self.pos[0]+self.width, self.pos[1]], 'end': [self.pos[0]+self.width, self.pos[1] + self.height], 'color': self.color}));
			self.shapes.push(basic_line({'start': [self.pos[0]+self.width, self.pos[1] + self.height], 'end': [self.pos[0], self.pos[1] + self.height], 'color': self.color}));
			self.shapes.push(basic_line({'start': [self.pos[0], self.pos[1] + self.height], 'end': self.pos, 'color': self.color}));
		}

		if(vars['type'] === "circle"){
			self.shapes.push(basic_arc(vars));
		}

		if(vars['type'] === "dot"){
			self.shapes.push(basic_arc({'pos': vars['pos'], 'radius': 0.15, 'fill_color': vars['fill_color'], 'stroke': false}));
		}
				
		if(vars['type'] === "button_binary"){
			self.pos = vars['pos'];
			self.value = !(typeof vars['state'] === "undefined" ? true : vars['state']);
			self.name = vars['name'];
			self.on_change = vars['on_change'];
			
			if(typeof self.parent.interactive_elements[self.name] !== "undefined"){
				throw('The interactive element name "'+self.name+'" is already taken!');
			}
			
			self.parent.interactive_elements[self.name] = self;
			
			self.update = function(type){
				if(type !== false){return false;}
				self.value = !self.value;
				self.shapes = [];

				if(self.value){
					self.shapes.push(basic_rounded_box({'pos': [self.pos[0]-0.1, self.pos[1]-0.1], 'width': 2.2, 'height': 1.2, 'radius': 0.6, "fill_color": "#4bd865", "stroke": false}));
					self.shapes.push(basic_arc({'pos': [self.pos[0]+1.5, self.pos[1]+0.5], 'radius': 0.5, 'fill_color': "#ffffff", 'stroke': false}));
					self.hitbox = [self.pos[0]+1.5, self.pos[1]+0.5];
				}else{
					self.shapes.push(basic_rounded_box({'pos': [self.pos[0]-0.1, self.pos[1]-0.1], 'width': 2.2, 'height': 1.2, 'radius': 0.6, "fill_color": "#d8d9db", "stroke": false}));
					self.shapes.push(basic_arc({'pos': [self.pos[0]+0.5, self.pos[1]+0.5], 'radius': 0.5, 'fill_color': "#ffffff", 'stroke': false}));
					self.hitbox = [self.pos[0]+0.5, self.pos[1]+0.5];
				}

				if(typeof self.on_change === "function"){
					self.on_change(time, self.value);
				}
			}
			self.update(false);
		}
		
		if(vars['type'] === "slider_vertical"){
			self.pos = vars['pos'];
			self.size = (typeof vars['size'] === "undefined" ? 5 : vars['size']);
			self.raw_value = (typeof vars['state'] === "undefined" ? 0.5 : vars['state']);
			self.snap = (typeof vars['snap'] === "undefined" ? false : vars['snap']);
			if(self.snap === false){
				self.value = self.raw_value;
			}else{
				var configs = 1/self.snap * self.size;
				self.value = Math.round(self.raw_value * configs) / configs;
			}
			self.name = vars['name'];
			self.on_change = vars['on_change'];
			
			self.parent.interactive_elements[self.name] = self;
			
			self.update = function(mouse_move){
				if(mouse_move === false){return false;}
				if(typeof mouse_move !== "undefined"){
					var old_value = self.value;
					self.raw_value = Math.min(Math.max(0, self.raw_value+(mouse_move[1] / (self.size * vmin))), 1);
					if(self.snap === false){
						self.value = self.raw_value;
					}else{
						var configs = 1/self.snap * self.size;
						self.value = Math.round(self.raw_value * configs) / configs;
					}

					if(typeof self.on_change === "function" && old_value != self.value){
						self.on_change(time, self.value);
					}
				}
				
				self.shapes = [];

				self.shapes.push(basic_rounded_box({'pos': [self.pos[0]+0.35, self.pos[1]], 'width': 0.3, 'height': self.size * self.value, 'radius': 0.1, "fill_color": "#4bd865", "stroke_color": "#cccccc"}));
				self.shapes.push(basic_rounded_box({'pos': [self.pos[0]+0.35, self.pos[1] + self.size * self.value], 'width': 0.3, 'height': self.size * (1 - self.value), 'radius': 0.1, "fill_color": "#ffffff", "stroke_color": "#cccccc"}));
				self.shapes.push(basic_rounded_box({'pos': [self.pos[0]+0.2, self.pos[1] + self.size * self.value -0.4], 'width': 0.6, 'height': 0.8, 'radius': 0.1, "fill_color": "#ffffff", "stroke_color": "#cccccc"}));

				self.hitbox = [self.pos[0], self.pos[1] + self.size * self.value];
			}
			self.update();
		}
		
		if(vars['type'] === "slider_horizontal"){
			self.pos = vars['pos'];
			self.size = (typeof vars['size'] === "undefined" ? 5 : vars['size']);
			self.raw_value = (typeof vars['state'] === "undefined" ? 0.5 : vars['state']);
			self.snap = (typeof vars['snap'] === "undefined" ? false : vars['snap']);
			if(self.snap === false){
				self.value = self.raw_value;
			}else{
				var configs = 1/self.snap * self.size;
				self.value = Math.round(self.raw_value * configs) / configs;
			}
			self.name = vars['name'];
			self.on_change = vars['on_change'];
			
			self.parent.interactive_elements[self.name] = self;
			
			self.update = function(mouse_move){
				if(mouse_move === false){return false;}
				if(typeof mouse_move !== "undefined"){
					var old_value = self.value;
					self.raw_value = Math.min(Math.max(0, self.raw_value+(mouse_move[0] / (self.size * vmin))), 1);
					if(self.snap === false){
						self.value = self.raw_value;
					}else{
						var configs = 1/self.snap * self.size;
						self.value = Math.round(self.raw_value * configs) / configs;
					}

					if(typeof self.on_change === "function" && old_value != self.value){
						self.on_change(time, self.value);
					}
				}
				
				self.shapes = [];

				self.shapes.push(basic_rounded_box({'pos': [self.pos[0], self.pos[1]+0.35], 'width': self.size * self.value, 'height': 0.3, 'radius': 0.1, "fill_color": "#4bd865", "stroke_color": "#cccccc"}));
				self.shapes.push(basic_rounded_box({'pos': [self.pos[0] + self.size * self.value, self.pos[1]+0.35], 'width': self.size * (1 - self.value), 'height': 0.3, 'radius': 0.1, "fill_color": "#ffffff", "stroke_color": "#cccccc"}));
				self.shapes.push(basic_rounded_box({'pos': [self.pos[0] + self.size * self.value -0.4, self.pos[1]+0.2], 'width': 0.8, 'height': 0.6, 'radius': 0.1, "fill_color": "#ffffff", "stroke_color": "#cccccc"}));
				self.hitbox = [self.pos[0] + self.size * self.value, self.pos[1] + 0.5];

			}
			self.update();
		}
		
		if(vars['type'] === "movable_point"){
			self.raw_value = vars['pos'];
			self.snap = (typeof vars['snap'] === "undefined" ? false : vars['snap']);
			if(self.snap === false){
				self.value = self.raw_value;
			}else{
				var configs = 1/self.snap;
				self.value = [Math.round(self.raw_value[0] * configs) / configs, Math.round(self.raw_value[1] * configs) / configs];
			}
			self.pos = self.value;


			self.name = vars['name'];
			self.on_change = vars['on_change'];

			self.parent.interactive_elements[self.name] = self;
			
			self.update = function(mouse_move){
				if(mouse_move === false){return false;}

				if(typeof mouse_move !== "undefined"){
					var old_value = self.value;
					self.raw_value = [Math.min(self.parent.high_x, Math.max(self.parent.low_x, self.raw_value[0]+(mouse_move[0] / vmin))), Math.min(self.parent.high_y, Math.max(self.parent.low_y, self.raw_value[1]+(mouse_move[1] / vmin)))];
					if(self.snap === false){
						self.value = self.raw_value;
					}else{
						var configs = 1/self.snap;
						self.value = [Math.round(self.raw_value[0] * configs) / configs, Math.round(self.raw_value[1] * configs) / configs];
					}
					self.pos = self.value;

					if(typeof self.on_change === "function" && (old_value[0] != self.value[0] || old_value[1] != self.value[1])){
						self.on_change(time, self.value);
					}
				}
				self.shapes = [];

				self.shapes.push(basic_arc({'pos': self.pos, 'radius': 0.4, 'stroke_color': '#5cbfe9', 'stroke_width': 0.07}));
				self.shapes.push(basic_arc({'pos': self.pos, 'radius': 0.2, 'stroke_color': '#5cbfe9', 'stroke_width': 0.07}));
				self.hitbox = [self.pos[0], self.pos[1]];
			}
			self.update();
		}
	
		var delta_to_angle = function(pos, delta){
			if(typeof pos === "function" || typeof delta === "function"){
				return function(time){
					p = (typeof pos === "function" ? pos(time) : pos);
					d = (typeof delta === "function" ? delta(time) : delta);
					
					return Math.atan2(-(d[1] - p[1]), d[0] - p[0]);
				}
			}else{
				return Math.atan2(-(delta[1] - pos[1]), delta[0] - pos[0]);
			}
		}
	
		if(vars['type'] === "single_angle"){
			self.pos = (typeof vars['pos'] === "undefined" ? [0,0] : vars['pos']);
			self.delta_1 = vars['delta_1'];
			self.delta_2 = vars['delta_2'];
			self.radius = (typeof vars['radius'] === "undefined" ? 1 : vars['radius']);

			self.shapes.push(basic_arc({'pos': self.pos, 'start_angle': delta_to_angle(self.pos, self.delta_1), 'end_angle': delta_to_angle(self.pos, self.delta_2)}));
		}
		
		if(vars['type'] === "double_angle"){
			self.pos = (typeof vars['pos'] === "undefined" ? [0,0] : vars['pos']);
			self.delta_1 = vars['delta_1'];
			self.delta_2 = vars['delta_2'];
			self.radius = (typeof vars['radius'] === "undefined" ? 1 : vars['radius']);
			
			self.shapes.push(basic_arc({'pos': self.pos, 'start_angle': delta_to_angle(self.pos, self.delta_1), 'end_angle': delta_to_angle(self.pos, self.delta_2)}));
			self.shapes.push(basic_arc({'pos': self.pos, 'start_angle': delta_to_angle(self.pos, self.delta_1), 'end_angle': delta_to_angle(self.pos, self.delta_2), 'radius': 0.8}));
		}
		
		if(vars['type'] === "triple_angle"){
			self.pos = (typeof vars['pos'] === "undefined" ? [0,0] : vars['pos']);
			self.delta_1 = vars['delta_1'];
			self.delta_2 = vars['delta_2'];
			self.radius = (typeof vars['radius'] === "undefined" ? 1 : vars['radius']);
			
			self.shapes.push(basic_arc({'pos': self.pos, 'start_angle': delta_to_angle(self.pos, self.delta_1), 'end_angle': delta_to_angle(self.pos, self.delta_2)}));
			self.shapes.push(basic_arc({'pos': self.pos, 'start_angle': delta_to_angle(self.pos, self.delta_1), 'end_angle': delta_to_angle(self.pos, self.delta_2), 'radius': 0.8}));
			self.shapes.push(basic_arc({'pos': self.pos, 'start_angle': delta_to_angle(self.pos, self.delta_1), 'end_angle': delta_to_angle(self.pos, self.delta_2), 'radius': 0.6}));
		}
		
		if(vars['type'] === "graph"){
			self.func = vars['function'];
			self.color = (typeof vars['color'] === "undefined" ? 'black' : vars['color']);
			self.fill = (typeof vars['fill'] === "undefined" ? false : vars['fill']);

			var func = function(time){
			  _graphic.ctx.beginPath();
				_graphic.ctx.strokeStyle = self.color;
				var res = 3;
				var i = self.parent.low_x * res;
				_graphic.ctx.moveTo(-99999, 99999);
				
				while(i <= self.parent.high_x * res){
					var x = i / res;
					var y = vars['function'](x, time);
					_graphic.ctx.lineTo((x - _graphic.low_x) *vmin, (_graphic.height - y + _graphic.low_y) *vmin);
					i += 1;
				}
				
				_graphic.ctx.lineTo(99999, 99999);
				_graphic.ctx.stroke();
				if(self.fill){
					_graphic.ctx.fillStyle = self.color;
					_graphic.ctx.fill();
				}
			}
			self.shapes.push(func);
		}				
	}

	// Active functions

	self.add_element = function(vars){
		if (typeof vars['type'] === "undefined"){ throw ('You need to set the type when adding a element.'); }
		if (typeof vars['element'] === "undefined"){
			var element = -1;
			for (key in parent.elements){
				element = Math.max(parent.elements[key].element, self.element);
			}
			element += 1;
		}else{
			var element = vars['element'];
		}
		var element = new self.element(vars, self);
		element.enabled = true;
		self.elements.push(element);
		return element;
	}
	
	self.start_time = new Date().getTime();

	vmin = get_vmin() * self.scale;
	self.px_height = Math.ceil(self.height*vmin);
	self.px_width = Math.ceil(self.width*vmin);
	document.getElementById(self.input_element).style.width = self.px_width+'px';
	document.getElementById(self.input_element).style.height = self.px_height+'px';
	document.getElementById(self.input_element+'_canvas').setAttribute("width", self.px_width);
	document.getElementById(self.input_element+'_canvas').setAttribute("height", self.px_height);
	document.getElementById(self.input_element+'_touch_overlay').style.width = self.px_width+'px';
	document.getElementById(self.input_element+'_touch_overlay').style.height = self.px_height+'px';

	self.draw = function(){
		var time_delta = ((new Date().getTime() - self.start_time)/1000 % self.animation_length) / self.animation_length;
		
		_graphic = self;

		var element_variables = {};
		for (key in self.interactive_elements){
			element_variables[key] = self.interactive_elements[key].value;
		}
		self.ctx.clearRect(0, 0, self.px_width, self.px_height);
		for(el_key in self.elements){
			if(self.elements[el_key].enabled){
				for(shape_key in self.elements[el_key]['shapes']){
					self.elements[el_key]['shapes'][shape_key](time_delta, element_variables);
				}
			}
		}

		window.requestAnimationFrame(self.draw);
	}
	self.draw();
}