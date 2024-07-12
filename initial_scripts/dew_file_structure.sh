#!/bin/zsh

# Root directory
mkdir -p dew

# Frontend structure
mkdir -p dew/frontend/public
mkdir -p dew/frontend/src/{assets,components,containers,redux,services,styles,utils}
touch dew/frontend/src/{App.js,index.js}
touch dew/frontend/.env
touch dew/frontend/package.json

# Backend structure
mkdir -p dew/backend/{core,apps/{users,policies,claims},services/{user_service,policy_service,claims_service},db/backup}
touch dew/backend/core/{settings.py,urls.py,wsgi.py,asgi.py}
mkdir -p dew/backend/apps/{users/{migrations},policies/{migrations},claims/{migrations}}
touch dew/backend/apps/users/{migrations/__init__.py,models.py,serializers.py,views.py,urls.py}
touch dew/backend/apps/policies/{migrations/__init__.py,models.py,serializers.py,views.py,urls.py}
touch dew/backend/apps/claims/{migrations/__init__.py,models.py,serializers.py,views.py,urls.py}
touch dew/backend/services/user_service/{Dockerfile,app.py,requirements.txt}
touch dew/backend/services/policy_service/{Dockerfile,app.py,requirements.txt}
touch dew/backend/services/claims_service/{Dockerfile,app.py,requirements.txt}
touch dew/backend/db/init.sql
touch dew/backend/{Dockerfile,docker-compose.yml,manage.py,requirements.txt}

# Documentation structure
mkdir -p dew/docs/{api,architecture,deployment}
touch dew/docs/api/{user_api.md,policy_api.md,claims_api.md}
touch dew/docs/architecture/{microservices_diagram.png,database_schema.png}
touch dew/docs/deployment/{aws_setup.md,kubernetes_setup.md}

# Scripts structure
mkdir -p dew/scripts
touch dew/scripts/{deploy.sh,backup.sh,restore.sh}

# Tests structure
mkdir -p dew/tests/{frontend/{components},backend/{unit,integration}}

# Other files
touch dew/.gitignore
touch dew/README.md

echo "File structure created successfully."
