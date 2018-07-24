"""
思路
先遍历一次检查文件哈希值，简历list用来存储哈希值，如果不在list，则放入list中，倘若在直接删除。
"""
import hashlib
import os

def file_md5(filename):  #这个带有防止文件太大的切片功能
    calltimes = 0 # 切片的个数
    file_slim = 100*1024*1024 #切片大小
    hmd5 = hashlib.md5()
    
    with open(filename,'rb') as fp:        #md5读取的是二进制，所以直接读取'rb'，rb是以二进制读取
        f_size = os.stat(filename).st_size #得到文件大小
        if f_size < file_slim:
            hmd5.update(fp.read())
        else:            
            while (f_size >= file_slim ):
                hmd5.update(fp.read(file_slim))
                f_size/= file_slim
                calltimes += 1
            if (f_size>0) and (f_size<=file_slim):
                hmd5.update(fp.read())
        return (hmd5.hexdigest())


def Traverse(path):  # traverse 遍历的意思
    file_list = [] # 用来存储所有文件的地址
    for f_path, f_dirs, f  in os.walk(path):# os.walk()返回的是一个三元tupple(dirpath, dirnames, filenames),其中第一个为起始路径，第二个为起始路径下的文件夹,第三个是起始路径下的文件。都是LIST形式。
        for f1 in f:
            #print(type(os.path.join(f_path,f1)))   #如果地址的格式不对，可能需要用repr（）函数将地址改为字符串
            file_list.append(os.path.join(f_path,f1))
    return file_list

def delete(path):
    hashlist = []
    times = 0
    for f in Traverse(path):
        if file_md5(f) in hashlist:
            os.remove(f)
            times +=1
        else:
            hashlist.append(file_md5(f))
    if  times == 0 :
        print ('没有重复的文件')
    return times 

a = r'C:\Users\Easy-\OneDrive\图片\智慧美丽坚强勇敢善良的汉贞'
print (delete(a))


#open(r"d:/a.png",'r')
