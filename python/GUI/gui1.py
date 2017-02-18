# coding: utf-8

from Tkinter import *

class APP:
    

    def __init__(self, master):
        frame = Frame(master)
        frame.pack(side=LEFT, padx = 10, pady =10)
        self.hi_there = Button(frame, text="打招?",bg="black", fg ="white", command = self.say_hi)
        self.hi_there.pack()
        self.hi_nihao = Label(text="你好")
        self.hi_nihao.pack()

    def say_hi(self):
        print "大家吼啊?"


root = Tk()
root.title("我的第二个窗?")

app = APP(root)

root.mainloop()
