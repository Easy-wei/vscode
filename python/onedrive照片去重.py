"""
思路
先遍历一次检查文件哈希值，简历list用来存储哈希值，如果不在list，则放入list中，倘若在直接删除。
"""
import hashlib


def get_image_hash(a):
    with open (a,'r+') as f1:
        image_hash = hashlib.md5(f1.read()).hexdigest()
    return image_hash

hashlist = []

def test_copy(x):
    if get_image_hash(x) in hashlist:
        

#print(get_image_hash(C:\Users\Easy-\OneDrive\图片\本机照片\00ad934e-141f-43ab-8870-95df0829ab37.png))
a =r'C:\Users\Easy-\OneDrive\图片\本机照片\00ad934e-141f-43ab-8870-95df0829ab37.png'
print (get_image_hash(a))


#open(r"d:/a.png",'r')
