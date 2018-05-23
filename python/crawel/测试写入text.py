from __future__ import print_function
dic={'11542': {'68784': 5.0, '43485': 5.0, '83646': 5.0, '109754': 5.0, '119735': 3.0, '42640': 2.0, '69983': 5.0, '119736': 5.0}}
dicfile=open('dic.txt','w')
for key in dic:
    for innerkey in dic[key]:
        print('{0:<10}{1:<10}{2}'.format(key,innerkey,dic[key][innerkey]),file=dicfile)
dicfile.close()