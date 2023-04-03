# DevOps: Nutzerdatenbank
This project contains an example application to demonstrate DevOps methodoligies.
We have constructed a build pipeline that automatically tests and builds the applications when
new code is pushed to the repository.

## Installation
Installing the demo application is as simple as executing a `docker-compose` file:
1. Make sure you have a running and working `Docker` installation
2. Download the file [`docker-compose.yml`](deploy/docker-compose.yml)
3. View the file and edit to your needs. If you just want to run it, keep the file as is
4. Deploy the file (all the services defined) by running the command `docker-compose up -d`
5. Open your browser and visit the url [`http://localhost:8888/`](http://localhost:8888/)
