import os
import difflib
"""
def traverse(path):
    f_list = []
    path_list = []

    for f_path, f_dirs, f in os.walk(path):
        pass
        #for f1 in f:
            #f_list.append(f)
        #path_list.append(os.path.join(f_path,f))
    return (f)
"""
def name_test (path):
    for f_path, f_dirs, f in os.walk(path):
        pass
    duplicate_list = []
    for i in range(len(f),0,-1):
        k = 0
        for j in range(i-1,0,-1):
            if (difflib.SequenceMatcher(None,f[i],f[j]).quick_ratio() > 0.3):
                duplicate_list.append(f[j])
                k = 1
        if k == 1:
            duplicate_list.append(f[i])
    return duplicate_list


a = r'C:\Users\Easy-\OneDrive\图片\智慧美丽坚强勇敢善良的汉贞'

#print(name_test(a))

#for f_path, f_dirs, f in os.walk(a):
    #print (f)

test_list=['1409979163987.jpeg', '2012-11-08 16.50.28_副本.jpg.jpeg', '2012-11-08 16.50.28_副本_副本.jpg.jpeg', '2013-08-07 20.22.16.jpg.jpeg', '2013-08-07 20.22.29.jpg.jpeg', '371f220bd8b545fc6141dbf19dea9bcd.jpg', '3ad5e1e6a3ac686dfaac9c6391916c50.jpg', '5.jpg', '5557d60aa1db3b4b85f30556c70f2280.jpg', '5e5bee61eedea4c9d4c617d163d4194b.jpg', '877dd6515b3cf3e494a280395b4f9d7a.jpg', '8e1a82e84adc6374cf164e69e6bae196.jpg', 'dbe1537678224a8bfd326ca10662219f.jpg', 'f9fc56ccaa90254559e44dbbdae64edf.jpg', 'IMG_8332.JPG', 'mmexport1405953278505.jpg', 'mmexport1405953283719.jpg', 'mmexport1409806687340.jpg', 'mmexport1428753232545.jpg', 'mmexport1428753254499.jpg', 'mmexport1428753259391.jpg', 'mmexport1428753321821.jpg', 'mmexport1428753324208 1.jpg', 'mmexport1428753326804.jpg', 'mmexport1428753331676.jpg', 'mmexport1428753334908.jpg', 'mmexport1428753339381.jpg', 'mmexport1428753345588.jpg', 'mmexport1435550671375.jpg', 'mmexport1435550678460.jpg', 'mmexport1435550687042.jpg', 'mmexport1435550700725.jpg', 'mmexport1435550713192.jpg', 'mmexport1435550761135.jpg', 'mmexport1435550771472.jpg', 'mmexport1435550780716.jpg', 'mmexport1435556489154.jpg', 'mmexport1435556691011.jpg', 'mmexport1435556702381.jpg', 'mmexport1435556720435.jpg', 'mmexport1435556731135.jpg', 'mmexport1435556736144.jpg', 'mmexport1435556752997.jpg', 'mmexport1435674759684.jpg', 'mmexport1435674772540.jpg', 'mmexport1435674776856.jpg', 'mmexport1435674788842.jpg', 'mmexport1435674796117 1.jpg', 'mmexport1435981593219.jpg', 'mmexport1444473424330.jpg', 'mmexport1445326071797.jpg', 'mmexport1445326082495.jpg', 'mmexport1445326089374.jpg', 'mmexport1445326095412.jpg', 'mmexport1445326100452.jpg', 'mmexport1445326104967.jpg', 'mmexport1445326110736.jpg', 'mmexport1445326121918.jpg', 'mmexport1445326127548.jpg', 'mmexport1445326154954.jpg', 'mmexport1445326166680.jpg', 'mmexport1445326249988.jpg']

def name_test1 (f):
    duplicate_list = []
    for i in range(len(f),0,-1):
        k = 0
        for j in range(i-1,1,-1):
            if (difflib.SequenceMatcher(None,f[i],f[j]).quick_ratio() > 0.3):
                duplicate_list.append(f[j])
                k = 1
        if k == 1:
            duplicate_list.append(f[i])
    return duplicate_list



print (name_test1(test_list))

