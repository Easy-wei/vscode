"""
import heapq

a=[0,1,2,3,4,5,6,6,6,6,6,6,6,6,6,7,8]

heapq.heapify(a)

print (a)

heapq.heapreplace(a,5)

print (a)
1524762811687
"""
class Root:
    __total = 0
    def __init__(self,v):
        self.__value = v
        self.__total += 1

    def show(self):
        print('self__value:',self.__value)
        print('Root.__total:',Root.__total)
        print('self__total:',self.__total)

    @classmethod
    def classShowTotal(cls):
        print(cls.__total)

    @staticmethod
    def staticShowTotal():
        print(Root.__total)

r = Root(4)

r.show()

rr= Root(5)

r.show()
rr.show()
