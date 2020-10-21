from django.urls import path
from django.views.static import serve
from django.conf import settings

from .views import task_list, create_task, get_task
import os

app_name = 'server'

urlpatterns = [
    path('', task_list, name='task-list'),
    path('accounts/profile/', task_list, name='task-list'),
    path('create', create_task, name='create-task'),
    path('getTask', get_task, name='get-task'),
]

avatars_url = path(
        'task_images/<path:path>',
        serve,
        {'document_root': os.path.join(settings.LOCAL_UPLOADS_DIR)},
    )
urlpatterns += [avatars_url]