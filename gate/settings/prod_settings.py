from .settings import *
DEBUG = False

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'NAME': 'gates',
        'ENGINE': 'django.db.backends.mysql',
        'USER': 'gates',
        'PASSWORD': 'GGw=9nZ~hn8T}s*'
    }
}

LOGS_DIR = BASE_DIR / '../logs'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format': "[%(asctime)s] [%(levelname)s %(levelno)s] [%(filename)s:%(lineno)s] %(message)s",
            'datefmt': "%d/%b/%Y %H:%M:%S"
        },
    },
    'handlers': {
        'error': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': os.path.join(LOGS_DIR, 'error.log'),
            'formatter': 'standard',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['error'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}
