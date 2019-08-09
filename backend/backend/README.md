# Jackbox Online Backend

API URL BASE: https://blobcast.jackboxgames.com/room/

Current project is using:
1. Django (Django-Rest)
2. SqliteDb (Previously used Postgres)

## Commands for the Project

### Running the Django Application

1. Go into the Python backend folder of the project.
2. Run the following:
	```
	python manage.py runserver
	```
3. Run the room finder:
    ```
    python manage.py start_room_finder
    ```

### Migrate Any Setting Changes to the App
1. Run the following command after making the change:
    ```
    python manage.py makemigrations
    ```
    ```
    python manage.py migrate
    ```

### Database Commands
#### Create a SQLite DB

### To Delete All the Data in a DB
1. Go into the Python backend folder.
2. Run the following:
	```
	python manage.py clear_models
	```

### API Endpoints:

** Log into Admin first to initiate
```
localhost:8000/admin
username = destinesavior
pass = (j)
```


1. To view all the rooms
	- localhost:8000/api/v1/rooms/
2. To view only online rooms:
	- localhost:8000/api/v1/rooms/?online=Y
3. To view selected fields:
	- localhost:8000/api/v1/rooms/?fields=room_code
4. Ordering of Field:
	- localhost:8000/api/v1/rooms/?ordering=last_updated
5. To start the Jackbox.TV API for the Db
	- localhost:8000/api/v1/initiate

## Requirements
1. You will need to install all the python modules via
    ```
    pip install -r requirements.txt
    ```
    
    1. You can also update all the python modules and update the requirements.txt file by doing
    
    ```
    pip-review --local --interactive
    ```
    ```
    pip freeze > requirements.txt
    ```
    
