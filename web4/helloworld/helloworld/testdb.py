from django.http import HttpResponse

from TestModel.models import Test


#数据库操作
def testdb(request):
    test1 = Test(name= 'shirley')
    test1.save()
    return HttpResponse("<p>数据库添加完成，shirley")