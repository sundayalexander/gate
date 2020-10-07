"""
WSGI config for gate project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

from gate.settings.settings import WHICH

os.environ.setdefault('DJANGO_SETTINGS_MODULE', "gate.settings.{}".format(WHICH))

application = get_wsgi_application()
