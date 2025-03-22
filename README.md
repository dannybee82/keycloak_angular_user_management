# KeycloakAngularUserManagement

A demo application that runs on localhost only. 

Angular application to add, manage (enable/disable users and or change the user role) and delete keycloak users.

See images in the root folder for examples.

*   Frontend: Angular 19 ( [Angular CLI](https://github.com/angular/angular-cli) version 19.2.4) + Angular Material
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

Next, click at the button **Create  Realm** 

Click at **Browse...** and select the file mentioned here above: _realm.export.json_

**Note:** this file doesn't contain users - due to security users can't be exported.

Create users from the _Users_ menu in Keycloak.

In the _admin console_ check under _Groups -> Admin -> Role Mapping_ whether the 3 client roles are assigned:

\- **realm management** _manage users_

\- **realm management** _queryusers_

\- **realm management** _view users_

When this is not the case assign these 3 client roles to _Admin -_ steps_:_

_Groups -> Admin -> Role Mapping -> Assign Role (button) -> Filter by clients_ (dropdown at the left) -> check the 3 client roles: _manage users, queryusers_ and _view users._

## Installation + running Angular application

**Command to install**

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_