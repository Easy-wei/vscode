math_graphic={
    graphic:function(array=[['g1'],[-6,6],[-6,6]]){//重新开图一定要注意这句话//array的必要格式为[[第一个是id变量,函数内部使用id],[坐标点1],[坐标点2]]
		g1 = new graphic({'input_element': array[0][0], 'low_x': array[1][0],'high_x': array[1][1],'low_y': array[2][0],'high_y': array[2][1],});
    },
    draw:function(){
		g1.draw();
    },
    grid:function(){
		g1.add_element({'type': 'grid',});
    },
    dot:function(array=[[0,0]]){
		g1.add_element({'type': 'dot','pos': array[0]});
    },
    label:function(array=[[-0.3,-0.3],['O']]){//[[id][坐标点1][要输入的标示量]]
		g1.add_element({'type': 'label','pos': array[0],'text': array[1]});
    },
    line:function(array=[[0,0],[0,1]]){
		g1.add_element({'type': 'line','start': array[0],'end': array[1]});
    },
};

var v1=math.randomInt(3,6);
var v2=math.randomInt(3,8);
array_lines=[[0,0],[0,1],[2,1],[2,v1],[3,v1],[3,1],[v2,1],[v2,0]];

function lines_make(array) {
    for (var i = 1; i < array.length ; i++) {
      g1.add_element({'type': 'line','start': array[i-1],'end': array[i]});
    }
    g1.add_element({'type': 'line','start': array[array.length-1],'end': array[0]});
}

var array_coordinate=[['g1'],[-2,8],[-2,9]];
	self.text = function() {
		return `What is ?<div id='g1'></div>
		[answer]`;
	};
self.post_load = function () {
  math_graphic.graphic(array_coordinate);
  math_graphic.grid();
  math_graphic.label();
  lines_make(array_lines);
  math_graphic.draw();
};
self.step_js = function(wrong_answer, step){

};
	self.step = function(wrong_answer, step){
		var steps = [
			"First do this", 
			"Then do that", 
		];
		return steps[step];
	};

	self.misconception = function(answer){
		return 0; // Default
	};

	self.correct_answers = function() {
		return [];
	};