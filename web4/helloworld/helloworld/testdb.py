from django.http import HttpResponse

from TestModel.models import Test


#数据库操作
def testdb(request):

    test1 = Test(name='shirley2')
    test1.save()
    return HttpResponse("<p>数据添加成功 shirley！</p>")

    #初始化
    respone = ''
    respone1 = ''
    
    # 通过objects这个模型管理器的all()获得所有数据行，相当于SQL中的SELECT * FROM
    list = Test.objects.all()

    # filter相当于SQL中的WHERE，可设置条件过滤结果
    respone2 = Test.objects.filter(id=1)

    # 获取单个对象
    respone3 = Test.objects.get(id=1)

    # 限制返回的数据 相当于 SQL 中的 OFFSET 0 LIMIT 2;
    Test.objects.order_by ('name')[0:2]

    #数据排序
    Test.objects.order_by("id")

    # 上面的方法可以连锁使用

    Test.objects.filter(name='shirley1').order_by("id")

    for var in list :
        respone1 +=var.name+""
    respone = respone1
    return HttpResponse("<p>"+respone+"</p>")

        # 修改其中一个id=1的name字段，再save，相当于SQL中的UPDATE
    test1 = Test.objects.get(id=1)
    test1.name = 'Google'
    test1.save()
    
    # 另外一种方式
    #Test.objects.filter(id=1).update(name='Google')
    
    # 修改所有的列
    # Test.objects.all().update(name='Google')
    
    return HttpResponse("<p>修改成功</p>")

 