from django.http import HttpRequest, HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User, Group
from django.core.exceptions import ObjectDoesNotExist
from django.forms.models import model_to_dict

from rest_framework import status, viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response

from server.models import Task
from server.forms import TaskCreationForm
from server.serializers import UserSerializer, GroupSerializer
from server.manager.upload import create_task_basename, upload_task_image, get_task_image_path


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


def task_list(request: HttpRequest) -> HttpResponse:
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


@api_view(['GET'])
def get_task(request: HttpRequest, pk: int) -> HttpResponse:
    try:
        task = Task.objects.get(pk=pk)  
    except ObjectDoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    task.create_date = str(task.create_date)
    task_obj = model_to_dict(task)
    task_obj['creator'] = task.creator.username
    return Response(task_obj, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def create_task(request: HttpRequest) -> HttpResponse:
    if request.method == "GET":
        context = {}
        return render(request, "create_task.html", context)
    if request.method == "POST":
        form = TaskCreationForm(request.POST)
        if not form.is_valid():
            return Response(data = form.errors, status=status.HTTP_400_BAD_REQUEST)

        data = request.POST
        user = request.user
        user_file = list(request.FILES.values())
        image_hash = None
        if len(user_file) == 1:
            image_hash = create_task_basename(user_file[0].name)
        
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
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_201_CREATED)


def redirect_to_home(request: HttpRequest) -> HttpResponse:
    return redirect('server:task-list')