"""
ab8bd593817db867df2e0cbb1ee9dc5d gist_id
ab0f9d7dd4dc4f29c6b454c74beeeb587d02dd7c  token 令牌
312d79cf1088a64b89cc8087687e12915af46fcb    token 令牌
7457f3d31f0b5694919c327f5699ce15 gist_id
"""
import threading

def printHello():  
    print ("Hello World")
    t = threading.Timer(2, printHello)  
    t.start()  
  
  
if __name__ == "__main__":  
    printHello() 