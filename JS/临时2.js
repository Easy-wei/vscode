if(step === 0){
			return function(){
				g6 = new graphic({'input_element': "graph_6", 'low_x':-2,'high_x': 9,'low_y': -2,'high_y': 9,  });
                g6.add_element({'type': 'grid',    'x_label': 'x',    'y_label': 'y' });
				g6.add_element({'type': 'grid'});  	  
				g6.draw();
			};		
		}else if(step === 1){
			return function(){

               g6.draw();
			};
		}