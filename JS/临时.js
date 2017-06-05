  g1.add_element({'type':'label', 'text':1, 'pos':[1,-0.5]});
  g1.add_element({'type':'label', 'text':'s', 'pos':[6,-0.5]});
  
  g1.add_element({'type':'graph', 'function':f,'min_x':1, 'max_x':6, 'fill':'true','fill_baseline':0,'color':'#CE93D8'});
  g1.add_element({'type':'graph', 'function':f,'min_x':0});
  g1.add_element({'type':'line', 'start':[1,0],'end':[1,f(1)]});
  g1.add_element({'type':'line', 'start':[6,0],'end':[6,f(6)]});
