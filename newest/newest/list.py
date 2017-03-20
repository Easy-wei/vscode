from django.shortcuts import render_to_response

address = [
    {
        'name': '张三',
        'address': '地址一'
    },
    {
        'name': 'lisi',
        'address': 'dizhier'
    },
]


def index(request):
    return render_to_response('list.html', {'address': address})
