"""
import heapq

a=[0,1,2,3,4,5,6,6,6,6,6,6,6,6,6,7,8]

heapq.heapify(a)

print (a)

heapq.heapreplace(a,5)

print (a)
1524762811687

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

class Celsius:
    def __init__(self, t = 0):
        self.temperature = t

    def get_temperature(self):
        print("Getting value")
        return self._temperature

    def set_temperature(self, value=6):
        if value < -273:
            raise ValueError("Temperature below -273 is not possible")
        print("Setting value")
        self._temperature = value

    temperature = property(get_temperature,set_temperature)#这个temperature是类属性吗？还是类方法

c= Celsius()
c.temperature
print(c.temperature)
print(Celsius.temperature)
