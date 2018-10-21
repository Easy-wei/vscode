
def check_file (file_name):
    try :
        f = open (str(file_name),'r')
        f.close
    except IOError:
        f = open(str(file_name),'w')


check_file(r'E:\code\vscode\大数据比赛重做版\vehicle3.xlsx')



http://yingyan.baidu.com/api/v3/track/getdistance?process_option=need_denoise=1,radius_threshold=20,need_mapmatch=1,transport_mode=driving&end_time=1533396038&start_time=1533309639&supplement_mode=driving&entity_name=4_5&ak=9GctB73jNG4AGsH6RldMqnCvGzafFylt&service_id=205445&is_processed=1
http://yingyan.baidu.com/api/v3/track/getdistance?process_option=need_denoise=1,radius_threshold=20,need_mapmatch=1,transport_mode=driving&start_time=1525104000&end_time=1525190399&supplement_mode=driving&entity_name=1号车&ak=9GctB73jNG4AGsH6RldMqnCvGzafFylt&service_id=205445&is_processed=1