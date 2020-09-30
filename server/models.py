from django.conf import settings
from django.db import models
from django.utils.timezone import now as timezone_now


class Task(models.Model):
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    create_date = models.DateTimeField(db_index=True, default=timezone_now)
    title = models.CharField(max_length=100, db_index=True)
    accepted = models.BooleanField(default=False)
    days = models.PositiveIntegerField(default=10)
    pay = models.PositiveIntegerField(default=10)
    description = models.TextField(default="")

    def __str__(self):
        return self.title


class AcceptedTask(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    accepted_task = models.ForeignKey(Task, on_delete=models.CASCADE)
    accept_date = models.DateTimeField(db_index=True, default=timezone_now)

    IN_PROGRESS = 1
    SUCCESS = 2
    FAILED = 3

    status = models.PositiveSmallIntegerField(default=IN_PROGRESS)
    STATUS_TYPES = [
        IN_PROGRESS,
        SUCCESS,
        FAILED,
    ]

    def __str__(self):
        return self.user.username
