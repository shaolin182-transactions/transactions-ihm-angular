# Contribute to transactions-ihm-angular development

## Prerequisites

On your local machine, install those tools
- docker

## Run app

In development mode, you can run a dev container through thoses steps for having a complete node environment

```shell
# From root repo folder
cd .config/dev_environment

# Start Dev environement
docker compose up -d --build --remove-orphans

# Go inside dev container
docker compose exec -it angular-dev-container bash

# Start App
# option 'host 0.0.0.0' allow an access to Angular app from outside container
ng serve -c development --host 0.0.0.0


# Run tests
ng test --watch=false
```