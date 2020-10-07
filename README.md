# AUTHENTICATION #

This is a Single Authentication for all Gates Web projects..
This uses sso

### Setup/Configuation procedure: ###

* Install the project requirements using "pip install -r requirements.txt"    
* Create application or client details(public key, private key) in the server side in the django shell.
from simple_sso.sso_server.models import Token, Consumer
    Consumer.objects.create(public_key='your_application_public_key', 
    private_key='your_application_private_key', name='your_application_name').
* Public key is the server's SECRET_KEY which is found the settings file.
* Private key is the client's SECRET_KEY which is found the client settings file.
* Name is the project name. 

### Contributors ###

* Sunday Alexander

### Requirements: ###
This project requirements can be found in the requirements.txt file
which include but not limited to the following:

* asgiref==3.2.3
* Django==3.0.2
* django-subdomains==2.1.0
* mysqlclient==1.4.6
* pytz==2019.3
* sqlparse==0.3.0