# KeycloakAngularUserManagement

A demo application that runs on localhost only. 

Angular application to add, manage (enable/disable users and or change the user role) and delete keycloak users.

See images in the root folder for examples.

*   Frontend: Angular 22 ( [Angular CLI](https://github.com/angular/angular-cli) version 22.1.7) + Angular Material
*   Keycloak version 26.7.3

## Installation of Keycloak with Docker Desktop

See the docker-compose file in the folder _keycloak_docker-compose_. 

Change username and password to the needs.

Command:

**docker-compose up --build -d**

## Import Keycloak Realm

See the folder _keycloak-realm-demo_ and the file: _realm.export.json_

When Keycloak is running in a Docker Container then log in.

At the upper left there is the menu item 'Manage realms'. 

From the 'Manage realms' page, click at 'Create realm'.

Click at **Browse...** and select the file mentioned here above: _realm.export.json_ from the folder folder _keycloak-realm-demo_.

**Note:** this file doesn't contain users - due to security users can't be exported.

Create users from the _Users_ menu in Keycloak.

In the _admin console_ check under _Groups -> Admin -> Role Mapping_ whether the 3 client roles are assigned:

\- **realm management** _manage users_

\- **realm management** _queryusers_

\- **realm management** _view users_

When this is not the case assign these 3 client roles to _Admin -_ _steps:_

_Groups -> Admin -> Role Mapping -> Assign Role (button) -> Filter by clients_ (dropdown at the left) -> check the 3 client roles: _manage users, query users_ and _view users._

**Note:** When adding new users from the frontend, the new users can login with their name in lowercase letters.
e.g. firstname: Juliette => password: juliette
The password and profile will be updated after the first login.

## Installation + running Angular application

**Command to install**

**Angular 22** needs a **Node.js** version of at least _22.22.3_

_npm install_

or shorter:

_npm i_

**Command to run the application:**

_ng serve --open_

or shorter:

_ng s --o_

### **Changelog:**

_Septmber 2026_

\- Changed Keycloak version to 26.7.3 and updated the demo-realm.

\- Upgrade to _Angular 22_ and upgraded other packages.

\- Migrated _@Injectable_ to _@Service_.

\- Using the default: _ChangeDetectionStrategy.OnPush_ in stead of _ChangeDetectionStrategy.Eager_.

\- Using the latest file naming conventions - and deleting the old schematics from _angular.json_

\- Removed package _ngx_toastr_ and replaced it by custom service.

_January 2026_

\- Upgrade to _Angular 21_ and upgraded other packages.

*   Removed deprecated _Karma_ and installed _Vitest._
*   Migrated _Jasmine_ tests to _Vitest_ tests for future use (command: **ng generate refactor-jasmine-vitest**).
*   HttpClient unchanged (makes use of an interceptor).

\- Migration to _Zoneless_ (No use of _Zone.js_ and removed it's references).

\- Other minor changes.

_June 2025_

\- Upgrade to Angular 20. 

\- Removed unnecessary package _@angular/platform-browser-dynamic_

\- Using the keyword **protected** for properties that are only accessible in the template.

\- Using the keyword **readonly** for properties initialized by Angular (input(), output(), model()).

\- Using inline template for _app.component.ts_.

\- Some small changes, e.g. converted variables to _signals_.
