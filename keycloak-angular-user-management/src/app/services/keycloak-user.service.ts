import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserKeyCloak, UserKeyCloakGroup } from '../models/user';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { AddUser } from '../models/add-user.interface';

const headers: HttpHeaders = new HttpHeaders(
  {'Content-type': 'application/json'}
);

@Injectable({
  providedIn: 'root'
})
export class KeycloakUserService {

  private http = inject(HttpClient);
  private readonly keycloak = inject(KeycloakService);
  
  getAllUsers() : Observable<UserKeyCloak[]> {
    let keycloakInstance = this.keycloak.getKeycloakInstance();
    return this.http.get<UserKeyCloak[]>(keycloakInstance.authServerUrl + '/admin/realms/' + keycloakInstance.realm + '/users?');
  }

  updateUser(user: UserKeyCloak) : Observable<UserKeyCloak> {
    let keycloakInstance = this.keycloak.getKeycloakInstance();
    return this.http.put<UserKeyCloak>(keycloakInstance.authServerUrl + '/admin/realms/' + keycloakInstance.realm + '/users/' + user.id, user);
  }

  getGroupOfUser(userId: string) : Observable<UserKeyCloakGroup> {
    let keycloakInstance = this.keycloak.getKeycloakInstance();
    return this.http.get<UserKeyCloakGroup>(keycloakInstance.authServerUrl + '/admin/realms/' + keycloakInstance.realm + '/users/' + userId + '/groups');
  }

  updateGroupOfUser(userId: string, group: UserKeyCloakGroup) {
    let keycloakInstance = this.keycloak.getKeycloakInstance();
    return this.http.put(keycloakInstance.authServerUrl + '/admin/realms/' + keycloakInstance.realm  + '/users/' + userId + '/groups/' + group.id, group.id);
  }

  deleteGroupFromUser(userId: string, group: UserKeyCloakGroup) {
    let keycloakInstance = this.keycloak.getKeycloakInstance();
    return this.http.delete(keycloakInstance.authServerUrl + '/admin/realms/' + keycloakInstance.realm  + '/users/' + userId + '/groups/' + group.id);
  }

  getAllGroups() : Observable<UserKeyCloakGroup[]> {
    let keycloakInstance = this.keycloak.getKeycloakInstance();
    return this.http.get<UserKeyCloakGroup[]>(keycloakInstance.authServerUrl + '/admin/realms/' + keycloakInstance.realm + '/groups/');
  }

  getMembersOfGroup(groupId: string) : Observable<any> {
    let keycloakInstance = this.keycloak.getKeycloakInstance();
    return this.http.get<any>(keycloakInstance.authServerUrl + '/admin/realms/' + keycloakInstance.realm + '/groups/' + groupId + '/members');;
  }

  deleteUser(user: UserKeyCloak) : Observable<any> {
    let keycloakInstance = this.keycloak.getKeycloakInstance();
    return this.http.delete<any>(keycloakInstance.authServerUrl + '/admin/realms/' + keycloakInstance.realm + '/users/' + user.id);
  }

  addUser(data: AddUser): Observable<void> {
    const keycloakInstance = this.keycloak.getKeycloakInstance();
    return this.http.post<void>(keycloakInstance.authServerUrl + '/admin/realms/' + keycloakInstance.realm + '/users', data, {headers: headers});
  }

}
