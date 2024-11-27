# documents-assignment

# setup instruction
gitclone: git clone https://github.com/SolutionPr/documents-assignment

# fetch all the  branch
git fetch --all

# swith to backend
git checkout backend

# create the  environmet file
python -m venv env

# cd to project file
cd documnet_listing_project/

# install the required pakages
pip install -r requirements.txt

# make models 
python manage.py makemigrations
python manage.py migrate


# runserver 
python manage.py runserver 8000
