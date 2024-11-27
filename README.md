# 🗂️ CURD documents-assignment  
A simple project for performing CRUD (Create, Read,Delete) operations on files, built with Django.


## 📖 Table of Contents  
- [Clone the Repository](#1-clone-the-repository)  
- [Fetch All Branches](#2-fetch-all-branches)  
- [Switch to `backend` Branch](#3-switch-to-backend-branch)  
- [Create a Virtual Environment](#4-create-a-virtual-environment)  
- [Navigate to the Project Directory](#5-navigate-to-the-project-directory)  
- [Install Required Packages](#6-install-required-packages)  
- [Apply Migrations](#7-apply-migrations)  
- [Run the Development Server](#8-run-the-development-server)  


### ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/SolutionPr/documents-assignment
```


### 2. Fetch all branches
```bash
git fetch --all
```

### 3. switch to backend branch
```bash
git checkout backend
```

### 4. create a virtual environment
```python
python -m venv env
```

### 5. navigate to the project directory
```bash
cd documents-assignment/documnet_listing_project
```


### 6. install required packages

```python
pip install -r requirements.txt
```

### 7. apply migrations 
Run the following commands to set up the database models:
```python
python manage.py makemigrations
```
```python
python manage.py migrate
```

### 8. run the development server 
```python
python manage.py runserver 8000
```

