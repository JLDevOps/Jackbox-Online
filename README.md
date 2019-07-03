# Jackbox.online

## Frontend
### Running the Different Frontend Platorms:
        * change directory to your new project
        $ cd jackboxOnline

        $ Then run the these commands to get started:

        * To run development Web server
        $ npm run web

        * To run Android on connected device (after installing Android Debug Bridge "adb" - https://developer.android.com/studio/releases/platform-tools)
        $ npm run android

        * To run ios simulator (after installing Xcode - only on Apple devices)
        $ npm run ios

        * To run tests for Native and Web
        $ npm run test

        * To run build for Web
        $ npm run build


## Backend
### Running the Django Application

1. Go into the Python backend folder of the project.
2. Run the following:
	```
	python manage.py runserver
	```


### To Delete All the Data in a DB
1. Go into the Python backend folder.
2. Run the following:
	```
	python manage.py clear_models
	```


### API Endpoints:

1. To view all the rooms
	- localhost:8080/api/v1/jackboxrooms/
2. To view only online rooms:
	- localhost:8080/api/v1/jackboxrooms/?online=Y
3. To view selected fields:
	- localhost:8080/api/v1/jackboxrooms/?fields=room_code
4. To start the Jackbox.TV API for the Db
	- localhost:8080/api/v1/initiate



DB Information:
Postgres:
username: postgres
pass: normal 
port: 5432