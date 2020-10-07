from .settings import *

DEBUG = True

ALLOWED_HOSTS = []

DATABASES = {
    'default': {
        'NAME': 'super_door',
        'ENGINE': 'django.db.backends.mysql',
        'USER': 'root',
        'PASSWORD': ''
    }
}
