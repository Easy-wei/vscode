
def check_file (file_name):
    try :
        f = open (str(file_name),'r')
        f.close
    except IOError:
        f = open(str(file_name),'w')


check_file(r'E:\code\vscode\大数据比赛重做版\vehicle3.xlsx')