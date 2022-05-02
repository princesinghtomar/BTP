## A React + Redux / Django Rest Framework authentication example

### Functionality:

* [x] Login with JWT
* [x] middleware for JWT refresh if expiring
* [x] Registration
* [x] Dynamic navbar switching when user logs in / logs out
* [x] Password Change
* [x] Screen size responsive components & Navbar


### How to use:

- Clone the repo
#### Frontend
1. cd frontend && npm install
2. enter your backend url in actions/backendUrl.js or add an environment variable named REACT_APP_DEV_URL 
3. npm start
#### Backend
1. cd backend, create a virtualenv, activate it and pip (or) pip3 install -r requirements.txt
2. To create the database for the application: python manage.py makemigrations and then python manage.py migrate
3. To run the server: python manage.py runserver 3000


