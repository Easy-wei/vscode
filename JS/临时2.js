  g7.add_element({'type': 'dot',    'pos': [array[0][1][0],0] });
  g7.add_element({'type': 'label', 'pos': [array[0][1][0]-0.5,1], 'text': 'A'});
  g7.add_element({'type': 'dot',    'pos': [array[1][1][0],0] });
  g7.add_element({'type': 'label', 'pos': [array[1][1][0],1], 'text': 'B'});
  g7.add_element({'type': 'dot',    'pos': [array[2][1][0],0] });
  g7.add_element({'type': 'label', 'pos': [array[2][1][0],1], 'text': 'C'});
  g7.add_element({'type': 'line_stroked',    'start': [array[0][1][0], 0],    'end': [array[2][1][0], 0]  });
  g7.draw();
  g7.add_element({'type': 'label', 'pos': [coordinate[0],(coordinate[0]==array[1][1][0])?2:1], 'text': 'G'});
