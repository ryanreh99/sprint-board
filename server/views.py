from django.http import HttpResponse
from django.shortcuts import render

from .models import Task
from .manager.upload import create_task_basename, upload_task_image, get_task_image_path
import json

def task_list(request):
    task_context = []
    for task in Task.objects.all():
        image_src = "https://mdbootstrap.com/img/Photos/Others/photo8.jpg"
        if task.image_hash:
            image_src = "task_images/" + get_task_image_path(task.id, task.image_hash)
        task_context.append({
            "id": task.id,
            "title": task.title,
            "pay": task.pay,
            "days": task.days,
            "image_src": image_src
        })
    context = {
        'tasks': task_context,
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
        user_file = list(request.FILES.values())
        if len(user_file) == 1:
            image_hash = create_task_basename(user_file[0].name)
        else:
            image_hash = None
        
        try:
            task = Task.objects.create(
                creator=user,
                title=data.get('title', ''),
                days=int(data.get('days', '')),
                pay=int(data.get('pay', '')),
                description=data.get('description', ''),
            )
            if len(user_file) == 1:
                upload_task_image(task.id, image_hash, user_file[0])
                t = Task.objects.get(pk=task.id)
                t.image_hash = image_hash
                t.save()
                 
        except Exception as e:
            print(e)
            return HttpResponse(status=403)
        return HttpResponse(status=204)

    elif request.method == "GET":
        context = {}
        return render(request, "create_task.html", context)
