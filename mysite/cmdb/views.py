from django.shortcuts import render
from django.shortcuts import HttpResponse
from cmdb import models
# Create your views here.
"""
user_list = [{'user': 'jack', 'pwd': 'abc'},
             {'user': 'daige', 'pwd': 'ABC'},
             ]
"""


def index(request):
    if request.method == 'POST':
        username = request.POST.get("username", None)
        password = request.POST.get("password", None)
        models.UserInfo.objects.create(user=username, pwd=password)
        #temp = {'user': username, 'pwd': password}
        print(username, password)
    user_list = models.UserInfo.objects.all()
    # request.GET
    # return HttpResponse("Hello world")
    return render(request, "index.html", {"data": user_list})
