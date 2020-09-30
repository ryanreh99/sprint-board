from django.urls import path

from .views import task_list, create_task, get_task

app_name = 'server'

urlpatterns = [
    path('', task_list, name='task-list'),
    path('accounts/profile/', task_list, name='task-list'),
    path('create', create_task, name='create-task'),
    path('getTask', get_task, name='get-task'),
]