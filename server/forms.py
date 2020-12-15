from django import forms
from server.models import Task


class TaskCreationForm(forms.ModelForm):
    TNC = forms.BooleanField()

    class Meta:
        model = Task
        fields = ["title", "description", "pay", "days"]