      //导函数图像。
  var g3 = new graphic({'input_element': "g3", 'low_x': -15, 'high_x': 15, 'low_y': -15, 'high_y': 15});
  
  g3.add_element({'type': 'grid'});
  
  f_2_coords.push(g3.add_element({'type': 'drag_point', 'pos': [-4,0], "snap":0.5}));
  
  f_2_coords.push(g3.add_element({'type': 'drag_point', 'pos': [-0,0], "snap":0.5}));
  
  f_2_coords.push(g3.add_element({'type': 'drag_point', 'pos': [4,0], "snap":0.5}));
  
  g3.add_element({'type': 'graph', 'function': line, "color": "red"});