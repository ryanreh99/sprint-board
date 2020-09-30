from django.http import HttpResponse
from django.shortcuts import render

from .models import Task
import json


def task_list(request):
    context = {
        'tasks': Task.objects.all(),
    }
    return render(request, "task_list.html", context)


def get_task(request):
    if request.method == "GET":
        data = request.GET
        try:
            task = Task.objects.filter(pk=int(data.get('task_id')))
            send_data = list(task.values())[0]
            send_data["create_date"] = str(send_data["create_date"])
        except:
            return HttpResponse(status=403)
        return HttpResponse(json.dumps(send_data))


def create_task(request):
    if request.method == "POST":
        data = request.POST
        user = request.user
        try:
            Task.objects.create(
                creator=user,
                title=data.get('title', ''),
                days=int(data.get('days', '')),
                pay=int(data.get('pay', '')),
                description=data.get('description', ''),
            )
        except:
            return HttpResponse(status=403)
        return HttpResponse(status=204)

    elif request.method == "GET":
        context = {}
        return render(request, "create_task.html", context)
