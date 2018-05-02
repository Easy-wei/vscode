
def demo(newitem,old_item=[]):
    old_item.append(newitem)
    return old_item

print(demo('5',[1,2,3,4]))
print(demo('aaa',['bb','cd']))
print (demo('a'))
print (demo('b'))


def demo2(newitem, old_item=1):
    if old_item ==1:
        old_item= []
    old_item.append(newitem)
    return old_item

print(demo2('5',[1,2,3,4]))
print(demo2('aaa',['bb','cd']))
print (demo2('a'))
print (demo2('b'))