# KeycloakAngularUserManagement

A demo application that runs on localhost only. 

Angular application to add, manage (enable/disable users and or change the user role) and delete keycloak users.

See images in the root folder for examples.

*   Frontend: Angular 18 ( [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12) + Angular Material
*   Keycloak version 26.0.7

## Installation of Keycloak with Docker Desktop

See the docker-compose file in the folder _Docker-compose_. 

Change username and password to the needs.

Command:

**docker-compose up --build -d**

## Import Keycloak Realm

See the folder _keycloak-realm-demo_ and the file: _realm.export.json_

When Keycloak is running in a Docker Container then log in.

At the upper left there is a drop-down with 'Keycloak master'. 

Click at this dropdown field.

Next, click at the button **Create  Realm**.

Click at **Browse...** and select the file mentioned here above: _realm.export.json_

**Note:** this file doesn't contain users - due to security users can't be exported.

Create users from the _Users_ menu in Keycloak.

## Installation + running Angular application

**Command to install**

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_