math_visuals.coordinate={

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
    label:function(array=[[0.3,0.3],['O']]){//[[id][坐标点1][要输入的标示量]]
		g1.add_element({'type': 'label','pos': array[0],'text': array[1]});
    },
    line:function(array=[[0,0],[0,1]]){
		g1.add_element({'type': 'line','start': array[0],'end': array[1]});
    },

};


