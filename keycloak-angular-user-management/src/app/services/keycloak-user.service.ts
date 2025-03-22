import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserKeyCloak, UserKeyCloakGroup } from '../models/user';
import Keycloak from 'keycloak-js';
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
  private readonly keycloak = inject(Keycloak);
  
  getAllUsers() : Observable<UserKeyCloak[]> {
    return this.http.get<UserKeyCloak[]>(`${this.keycloak.authServerUrl}/admin/realms/${this.keycloak.realm}/users?`);
  }

  updateUser(user: UserKeyCloak) : Observable<UserKeyCloak> {
    return this.http.put<UserKeyCloak>(`${this.keycloak.authServerUrl}/admin/realms/${this.keycloak.realm}/users/${user.id}`, user);
  }

  getGroupOfUser(userId: string) : Observable<UserKeyCloakGroup> {
    return this.http.get<UserKeyCloakGroup>(`${this.keycloak.authServerUrl}/admin/realms/${this.keycloak.realm}/users/${userId}/groups`);
  }

  updateGroupOfUser(userId: string, group: UserKeyCloakGroup) {
    return this.http.put(`${this.keycloak.authServerUrl}/admin/realms/${this.keycloak.realm}/users/${userId}/groups/${group.id}`, group.id);
  }

  deleteGroupFromUser(userId: string, group: UserKeyCloakGroup) {
    return this.http.delete(`${this.keycloak.authServerUrl}/admin/realms/${this.keycloak.realm}/users/${userId}/groups/${group.id}`);
  }

  getAllGroups() : Observable<UserKeyCloakGroup[]> {
    return this.http.get<UserKeyCloakGroup[]>(`${this.keycloak.authServerUrl}/admin/realms/${this.keycloak.realm}/groups/`);
  }

  getMembersOfGroup(groupId: string) : Observable<any> {
    return this.http.get<any>(`${this.keycloak.authServerUrl}/admin/realms/${this.keycloak.realm}/groups/${groupId}/members`);
  }

  deleteUser(user: UserKeyCloak) : Observable<any> {
    return this.http.delete<any>(`${this.keycloak.authServerUrl}/admin/realms/${this.keycloak.realm}/users/${user.id}`);
  }

  addUser(data: AddUser): Observable<void> {
    return this.http.post<void>(`${this.keycloak.authServerUrl}/admin/realms/${this.keycloak.realm}/users`, data, {headers: headers});
  }

}