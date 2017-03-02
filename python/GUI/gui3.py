# coding: utf-8

from Tkinter import *

root = Tk()

textlabel = Label(root, text="您说下载的东西含有未成年人限制")
textlabel.pack()

photo = PhotoImage(file= 1.gif)
imglabel = Label(root, Image=photo)
imglabel.pack()

mainloop()