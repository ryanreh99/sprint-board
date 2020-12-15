from django.urls import path
from django.views.static import serve
from django.conf import settings

from server.views import task_list, create_task, get_task, redirect_to_home
import os

app_name = 'server'

urlpatterns = [
    path('accounts/profile/', redirect_to_home),
    path('', task_list, name='task-list'),
    path('create', create_task, name='create-task'),
    path('tasks/<int:pk>', get_task, name='get-task'),
]

uploads_url = path(
        'task_images/<path:path>',
        serve,
        {'document_root': os.path.join(settings.LOCAL_UPLOADS_DIR)},
    )
urlpatterns += [uploads_url]