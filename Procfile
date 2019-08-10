release: python manage.py migrate && python manage.py runserver
web: gunicorn backend.wsgi --log-file -