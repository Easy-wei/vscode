  //self.order=False;
  var vec1 = [math_tools.rand_int(-3, 3, [0]), math_tools.rand_int(-5, 5, [0])];
  var vec2 = [math_tools.rand_int(-4, 4, [0]), math_tools.rand_int(-5, 5, [0])];

  array_extremum = function (array) {
      var x_abs_max = 5;
      var y_abs_max = 5;
      for (var i = 0; i < array.length; i++) {
          if (x_abs_max < math.abs(array[i][0])) {
              x_abs_max = math.abs(array[i][0]);
          }
          if (y_abs_max < math.abs(array[i][1])) {
              y_abs_max = math.abs(array[i][1]);
          }
      }
      return [x_abs_max, y_abs_max];
  };


  do {
      var v1 = math_tools.rand_int(-5, 5, [0]);
      var v2 = math_tools.rand_int(-5, 5, [0]);
      var v3 = math_tools.rand_int(0, 2);
  }
  while ((v1 + v2) % 2 !== 0);

  f = function (x) {
      return (x - v1) * (x - v2);
  };

  array = [[v1, 0],[v2, 0],[0, f(0)], [(v1 + v2) / 2, f((v1 + v2) / 2)]];

  equation = `\\mathrm{y}=(x` + (-v1).signed() + `)(x` + (-v2).signed() + `)`;

  points = [`when y=0`, `when x=0`, `the value of y minmum`];

  self.text = function () {
      return `The equation is ~` + equation + `~Find the point when ~\\mathrm{y}=0~<div id="graph" style="margin: auto;"></div>`;
  };


  self.post_load = function () {
      var end = function (time, vars) {
          return vars.end;
      };

      var g = new graphic({
          'input_element': "graph",
          'low_x': -array_extremum(array)[0] - 1,
          'high_x': array_extremum(array)[0] + 1,
          'low_y': -array_extremum(array)[1] - 1,
          'high_y': array_extremum(array)[1] + 1,      });
      g.add_element({          'type': 'grid'      });
      //g.add_element({'type': 'line_head_arrow', 'end': vec1, 'color': 'green'});
      //g.add_element({'type': 'line_head_arrow', 'end': vec2, 'color': 'red'});
      //g.add_element({'type': 'line_head_arrow', 'end': end});
      //g.add_element({'type': 'line_head_arrow', 'end': end1,'color':'yellow'});
      turning_point = g.add_element({
          'type': 'drag_point',
          'pos': [4, 4],
          'name': 'end',
          'snap': 1
      });
      g.add_element({
          'type': 'label',
          'text': 'Turning point',
          'pos': function () {
              return turning_point.value;
          },
          'vertical_anchor': 'bottom'
      });
      y_intercept = g.add_element({
          'type': 'drag_point',
          'pos': [2, 2],
          'name': 'end1',
          'snap': 1
      });
      g.add_element({
          'type': 'label',
          'text': 'y intercept',
          'pos': function () {
              return y_intercept.value;
          },
          'vertical_anchor': 'bottom'
      });
      x_intercept_1 = g.add_element({
          'type': 'drag_point',
          'pos': [1, 1],
          'name': 'end2',
          'snap': 1
      });
      g.add_element({
          'type': 'label',
          'text': 'x intercept',
          'pos': function () {
              return x_intercept_1.value;
          },
          'vertical_anchor': 'bottom'
      });
      x_intercept_2 = g.add_element({
          'type': 'drag_point',
          'pos': [0, 0],
          'name': 'end3',
          'snap': 1
      });
      g.add_element({
          'type': 'label',
          'text': 'x intercept',
          'pos': function () {
              return x_intercept_2.value;
          },
          'vertical_anchor': 'bottom'
      });
  };


  self.step_js = function (wrong_answer, step) {
	var g1 = new graphic({
          'input_element': "g1",
          'low_x': -array_extremum(array)[0] - 1,
          'high_x': array_extremum(array)[0] + 1,
          'low_y': -array_extremum(array)[1] - 1,
          'high_y': array_extremum(array)[1] + 1,      });
    g1.add_element({'type': 'grid'});
	g1.add_element({'type':'graph','function':f,'color':'#ff1744'});
	g1.add_element({'type': 'circle', 'text': 'label', 'pos': array[0],'fill_color':'#76ff03','radius':'0.2'});
	g1.add_element({'type': 'circle', 'text': 'label', 'pos': array[1],'fill_color':'#76ff03','radius':'0.2'});
	g1.add_element({'type': 'circle', 'text': 'label', 'pos': array[2],'fill_color':'#76ff03','radius':'0.2'});
	g1.add_element({'type': 'circle', 'text': 'label', 'pos': array[3],'fill_color':'#76ff03','radius':'0.2'});
  };

  self.step = function (wrong_answer, step) {
      var steps = [
		"<div id='g1'></div>",
          `as you see all the dots are pointed on the coordinate`,
		`When ~y=0~,therefore ~`+equation+`=0~ it's easy to find ~x_{1}=`+v1+`, x_{2}=`+v2+`~`,
		`When ~x=0~,therefore ~\\mathrm{y}=(0`+(-v1).signed()+`)(0`+(-v2).signed()+`)=`+v1*v2+``+`~`,
		`When ~x=\\dfrac{(`+v1+v2.signed()+`)}{2}, \\mathrm{y}_{_min}=`+array[3][1]+`~`,
      ];
      return steps[step];
  };

  self.check_answer = function () {
      if (turning_point.value[0] !== array[3][0] || turning_point.value[1] !== array[3][1]) {
          return false;
      }
      if (y_intercept.value[0] !== array[2][0] || y_intercept.value[1] !== array[2][1]) {
          return false;
      }

      var match = false;
      if ((x_intercept_1.value[0] === array[0][0] && x_intercept_1.value[1] === array[0][1]) || (x_intercept_1.value[0] === array[1][0] && x_intercept_1.value[1] === array[1][1])) {
          match = true;
      }

      if (!match) {
          return false;
      }
      return true;
  };