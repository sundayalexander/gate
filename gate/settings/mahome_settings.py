from .settings import *

DEBUG = True

ALLOWED_HOSTS = ["*"]

DATABASES = {
    'default': {
        'NAME': 'gates',
        'ENGINE': 'django.db.backends.mysql',
        'USER': 'root',
        'PASSWORD': '252552'
    }
}
