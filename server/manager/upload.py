import os
import hashlib

from django.conf import settings


def write_task_image(path, file_data):
    file_path = os.path.join(settings.LOCAL_UPLOADS_DIR, path)
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'wb') as f:
        f.write(file_data)

def get_task_image_path(task_id, basename):
    return f'{str(task_id)}/{basename}'

def create_task_basename(file_name):
    hexdigest = hashlib.md5(file_name.encode("utf-8")).hexdigest()
    return hexdigest

def upload_task_image(task_id, hashpath, file):
    relative_dir = get_task_image_path(task_id, hashpath)
    write_task_image(relative_dir, file.read())
