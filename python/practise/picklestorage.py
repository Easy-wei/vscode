import pickle
 def Storage(a):
 pickle_file = open ('C:\Users\233\Desktop\code\practise\pickle_file.pkl','wb')
 pickle.dump(a,pickle_file)
 pickle_file.close()
 