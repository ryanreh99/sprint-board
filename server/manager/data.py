from server.models import Task
from server.manager.upload import get_task_image_path

def get_all_tasks() -> list:
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
    return task_context
