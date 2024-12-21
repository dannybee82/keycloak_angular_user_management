import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { EMPTY, Observable, forkJoin, of, switchMap } from 'rxjs';
import { KeycloakUserService } from '../../services/keycloak-user.service';
import { ToastrService } from 'ngx-toastr';
import { UserKeyCloak, UserKeyCloakGroup } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ChangeRoleDialogComponent } from './change-role-dialog/change-role-dialog.component';
import { AllMatModules } from '../../all-mat-modules.module';
import { KeycloakUser } from '../../models/keycloak-user.interface';
import { KeycloakService } from 'keycloak-angular';
import { ApplicationRoles } from '../../models/application-roles.enum';
import { Router } from '@angular/router';
import { TokenUpdateService } from '../../services/token-update.service';

@Component({
  selector: 'app-admin-keycloak-users',
  standalone: true,
  imports: [
    AllMatModules
  ],
  templateUrl: './admin-keycloak-users.component.html',
  styleUrl: './admin-keycloak-users.component.scss'
})
export class AdminKeycloakUsersComponent implements OnInit {

  dataSaved = false;
  allUsersData: UserKeyCloak[] = [];
  userIdUpdate = null;
  userGroups: UserKeyCloakGroup[] = [];
  private _allLinkedUsers: KeycloakUser[] = [];
  private _uniqueGroups: UserKeyCloakGroup[] = [];
  allLoaded: WritableSignal<boolean> = signal(false);
  isAdmin: WritableSignal<boolean> = signal(false);

  public dialog = inject(MatDialog);
  private userService = inject(KeycloakUserService);
  private toastr = inject(ToastrService);  
  private router = inject(Router);
  private tokenUpdateService = inject(TokenUpdateService);
  private readonly keycloak = inject(KeycloakService);  
  
  ngOnInit() {
    this.loadAllData();
  }

  loadAllData() : void {
    const loadData$ = [this.userService.getAllUsers(), this.userService.getAllGroups()];

    forkJoin(loadData$).subscribe({
      next: (result: any[]) => {
        this.allUsersData = result[0];
        this._uniqueGroups = result[1];
        this._allLinkedUsers = result[2];

        this.allUsersData.map(item => item.group = ApplicationRoles.UNKNOWN);
      },
      error: () => {
        this.toastr.error("Unable to load data.");
      },
      complete: () => {
        this.getAndAssignGroupMembers();
      }
    });
  }

  changeUserEnabled(id: string): void {
    let user: UserKeyCloak | undefined = this.allUsersData.find(item => item.id === id);

    if(user != undefined) {
      const dialogRef = this.dialog.open(ChangeRoleDialogComponent, {
        data: {typeEnableUser: true, userIsEnabled: user.enabled}
      });

      const dialog$ = dialogRef.afterClosed().pipe(
        switchMap(dialog => {
          if(dialog !== undefined && user?.enabled != dialog && user != undefined) {
            delete user?.group;
            user.enabled = dialog;

            console.log(user);
            return this.userService.updateUser(user);
          } else {
            return EMPTY;
          }
        })
      );

      dialog$.subscribe({
        next: (result) => {
          this.toastr.success("User updated successfully.");
        },
        error: () => {
          this.toastr.error("Unable to update user.");
        }, 
        complete: () => {
          this.loadAllData();
        }
      });
    } else {
      this.toastr.error("User not found.");
    }
  }

  changeUserRole(userId: string) : void {
    let user: UserKeyCloak | undefined = this.allUsersData.find(item => item.id === userId);

    if(user != undefined) {
      let currentGroup: string = user.group ?? '';
      let deleteFromGroup: UserKeyCloakGroup | undefined = this._uniqueGroups.find(item => item.name === currentGroup);

      const dialogRef = this.dialog.open(ChangeRoleDialogComponent, {
        data: {typeEnableUser: false, selectedRole: currentGroup}
      });
  
      const selectedRole$ = dialogRef.afterClosed().pipe(
        switchMap(dialog => {
          if(dialog !== undefined && currentGroup !== dialog) {
            let addToGroup: UserKeyCloakGroup | undefined = this._uniqueGroups.find(item => item.name === dialog);
            
            if(addToGroup != undefined) {
              const actions$: Array<Observable<any>> = [];

              if(deleteFromGroup != undefined) {
                actions$.push(this.userService.deleteGroupFromUser(userId, deleteFromGroup));
              }
              actions$.push(this.userService.updateGroupOfUser(userId, addToGroup));

              return forkJoin(actions$);
            } else {
              this.toastr.error("Cant add user to unknown Group.");
              return of();
            }            
          } else {
            return of();
          }
        })
      );

      selectedRole$.subscribe({
        next: (result) => {
          this.toastr.success("User Group is updated.");
        },
        error: () => {
          this.toastr.error("Group not updated.");
        },
        complete: () => {
          this.allLoaded.set(false);
          this.loadAllData();
        }
      });
    } else {
      this.toastr.error("User not found.");
    }
  }

  delete(userId: string) {
    let user: UserKeyCloak | undefined = this.allUsersData.find(item => item.id === userId);

    if(user != undefined) {
      let data: any = (user != undefined) ? {width: '300px', "value": user.firstName + ' ' + user.lastName + ' - ' + user.username + ' - ' + user.group} :  {width: '300px', "value": ''};

      const dialogRef = this.dialog.open(DeleteDialogComponent, 
        {data}
      );

      const deleteAction$ = dialogRef.afterClosed().pipe(
        switchMap(result => {
          if(result != undefined && result.confirmDelete === true && user != undefined) {
            return this.userService.deleteUser(user);
          } else {
            return of();
          }
        }) 
      );

      deleteAction$.subscribe({
        next: () => {
          this.toastr.success("User deleted.");
        },
        error: () => {
          this.toastr.error("User not deleted.");
        },
        complete: () => {
          this.allLoaded.set(false);
          this.loadAllData();
        }
      });
    } else {
      this.toastr.error("User not found.");
    }
  }

  resetForm() {
    this.dataSaved = false;
  }

  isUserLinked(keycloakId: string): boolean {
    if(this._allLinkedUsers.length > 0) {
      const index: number = this._allLinkedUsers.findIndex(item => item.keycloakId === keycloakId);
      return index > -1 ? true : false;
    }

    return false;
  }

  addKeycloakUser(): void {
    this.router.navigate(['add-user']);
  }

  logout() : void {
    this.tokenUpdateService.stop();
    this.keycloak.logout();
  }
  
  getApplicationRoles(): typeof ApplicationRoles {
    return ApplicationRoles;
  }

  private getAndAssignGroupMembers() : void {
    if(this._uniqueGroups != undefined) {
      const actions$: Array<Observable<any>> = [];
      let groupNames: string[] = [];

      this._uniqueGroups.forEach(item => {
        actions$.push( this.userService.getMembersOfGroup(item.id) );
        groupNames.push(item.name);
      });

      forkJoin(actions$).subscribe({
        next: (result: any[]) => {
          for(let i = 0; i < result.length; i++) {
            result[i].forEach((element: any) => {
              let found: UserKeyCloak | undefined = this.allUsersData.find(item => item.id === element.id);

              if(found != undefined && i < groupNames.length) {
                found.group = groupNames[i];
              }
            });
          }
        },
        error: () => {
          this.toastr.error("Unable to fetch members of group.");
          this.allLoaded.set(true);
        },
        complete: () => {
          this.allLoaded.set(true);
        }
      });
    } else {
      console.log("unique groups are undefined ...");
    }
  }

}