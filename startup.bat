@echo off

set VENV_PATH=C:\fejlesztes\galleria\myenv\Scripts\activate

call %VENV_PATH%

cd C:\fejlesztes\galleria\backend

python manage.py runserver



