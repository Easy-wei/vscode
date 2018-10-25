"""
s1 = ['bacon\n', 'eggs\n', 'ham\n', 'guido\n']
s2 = ['python\n', 'eggy\n', 'ham\n', 'guido\n']

import sys
import difflib

for line in difflib.context_diff(s1, s2, fromfile='before.py', tofile='after.py'):
    sys.stdout.write(line)  

*** before.py
--- after.py
***************
*** 1,4 ****
! bacon
! eggs
! ham
  guido
--- 1,4 ----
! python
! eggy
! hamster
  guido
  """
import sys 
print (__file__+'.text',isinstance(__file__,str))

with open (__file__+'.text','a+') as f:
    f.write('hehehhe')
