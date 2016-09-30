Game of Life
=

This is a browser-based version of John Conway's Game of Life, a cellular automaton that simulates the evolution of an organism using a simple deterministic rule.

### What concerns you identified and how you separated them?

#### install required linux packages
`sudo apt-get install libmysqlclient-dev python-dev`

#### install required python packages
* `sudo pip install -r requirements.txt`

#### download murmur
`git clone https://github.com/haystack/murmur.git`

#### What the program modules are
* configure your relay_server (postfix or something else) in config/settings.py
* use port other than 25 (default is currently set at 587)
* edit database details in a new file called private.py. http_handler/settings.py looks for this file to populate database information
* create file /opt/murmur/env with single word containing "dev", "staging", or "prod" for the type of server you are setting up
* create file /opt/murmur/debug with single word containing "true" or "false" to turn on debug mode


#### setup the database 
* `mysql -u root -p`
* `create database murmur`
* Give privileges to the user that will access the database from django: `grant all privileges ON murmur.* TO admin@localhost;`

#### install schema and create superuser
* `python manage.py syncdb`

#### run murmur server
* `lamson start`
* `python manage.py runserver`
