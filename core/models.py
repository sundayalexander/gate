import os

from django.db import models


# GATE MODEL
class Gate(models.Model):
    name = models.CharField(max_length=90)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return self.name

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._watch_list = ['image', ]
        for field in self._watch_list:
            setattr(self, '_original_%s' % field, getattr(self, field))

    def save(self, *args, **kwargs):
        try:
            for field in self._watch_list:
                orig = '_original_%s' % field
                if getattr(self, orig) != getattr(self, field):
                    os.remove(getattr(self, field).path)
        except:
            pass
        super(Gate, self).save(*args, **kwargs)

    def delete(self, **kwargs):
        try:
            for field in self._watch_list:
                orig = '_original_%s' % field
                if getattr(self, orig) != getattr(self, field):
                    # os.remove(getattr(self, field).path)
                    getattr(self, field).delete()
        except:
            pass
        super(Gate, self).delete(**kwargs)
