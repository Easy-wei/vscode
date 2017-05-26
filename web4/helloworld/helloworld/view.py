from django.http import HttpResponse
from django.shortcuts import render
 
def hello(request):
    context = {}
    context['hello']='helloworldcontext333'
    return render(request, 'hello.html',context)


def fuck (request):
    context = {}
    context['hello']='helloworldcontext333'
    return render(request, 'fuck.html',context)