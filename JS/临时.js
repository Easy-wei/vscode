  var g1= new g1raphic({'input_element':'g2','low_x':coord[0][0],'hig1h_x':coord[0][1],'low_y':coord[1][0],'hig1h_y':coord[1][1],});
  g1.add_element({'type':'g1rid'});
  g1.add_element({'type':'g1raph', 'function':f,'min_x':0});
  g1.add_element({'type':'dot', 'pos':[v1,f(v1)]});
  g1.add_element({'type':'label', 'text':'P','pos':[v1+0.7,f(v1)]});
  g1.add_element({'type':'g1raph', 'function':f_1, 'max_x':v1,'min_x':0,'fill':'true','fill_baseline':f});  