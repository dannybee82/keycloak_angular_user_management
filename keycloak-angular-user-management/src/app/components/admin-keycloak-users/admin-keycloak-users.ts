import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { EMPTY, Observable, forkJoin, of, switchMap } from 'rxjs';
import { KeycloakUser } from '../../services/keycloak/keycloak-user';
import { UserKeyCloak, UserKeyCloakGroup } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from './delete-dialog/delete-dialog';
import { ChangeRoleDialog } from './change-role-dialog/change-role-dialog';
import { AllMatModules } from '../../all-mat-modules.module';
import { ApplicationRoles } from '../../models/application-roles.enum';
import { Base } from '../shared/base';
import { DeleteDialogData } from '../../models/delete-dialog-data.interface';

@Component({
  selector: 'app-admin-keycloak-users',
  imports: [
    AllMatModules
  ],
  templateUrl: './admin-keycloak-users.html',
  styleUrl: './admin-keycloak-users.scss'
})
export class AdminKeycloakUsers extends Base implements OnInit {

  protected allUsersData: WritableSignal<UserKeyCloak[]> = signal([]);
  private _uniqueGroups: WritableSignal<UserKeyCloakGroup[]> = signal([]);
  protected allLoaded: WritableSignal<boolean> = signal(false);

  public dialog = inject(MatDialog);
  private userService = inject(KeycloakUser);
  
  override ngOnInit(): void {
    super.ngOnInit();
    this.loadAllData();
  }

  loadAllData() : void {
    const loadData$ = {
      allUsers: this.userService.getAllUsers(),
      allGroups: this.userService.getAllGroups()
    };

    forkJoin(loadData$).subscribe({
      next: (data) => {
        this.allUsersData.set(data.allUsers as UserKeyCloak[]);
        this._uniqueGroups.set(data.allGroups as UserKeyCloakGroup[]);

        this.allUsersData().map(item => item.group = ApplicationRoles.UNKNOWN);
      },
      error: () => {
        this.toastr.show("Unable to load data.", 'error');
      },
      complete: () => {
        this.getAndAssignGroupMembers();
      }
    });
  }

  changeUserEnabled(id: string): void {
    let user: UserKeyCloak | undefined = this.allUsersData().find(item => item.id === id);

    if(user != undefined) {
      const dialogRef = this.dialog.open(ChangeRoleDialog, {
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
          this.toastr.show("User updated successfully.", 'success');
          this.allLoaded.set(false);
          this.loadAllData();
        },
        error: () => {
          this.toastr.show("Unable to update user.", 'error');
        },
      });
    } else {
      this.toastr.show("User not found.", 'error');
    }
  }

  changeUserRole(userId: string): void {
    let user: UserKeyCloak | undefined = this.allUsersData().find(item => item.id === userId);

    if(user != undefined) {
      let currentGroup: string = user.group ?? '';
      let deleteFromGroup: UserKeyCloakGroup | undefined = this._uniqueGroups().find(item => item.name === currentGroup);

      const dialogRef = this.dialog.open(ChangeRoleDialog, {
        data: {typeEnableUser: false, selectedRole: currentGroup}
      });
  
      const selectedRole$ = dialogRef.afterClosed().pipe(
        switchMap(dialog => {
          if(dialog !== undefined && currentGroup !== dialog) {
            let addToGroup: UserKeyCloakGroup | undefined = this._uniqueGroups().find(item => item.name === dialog);
            
            if(addToGroup != undefined) {
              const actions$: Array<Observable<any>> = [];

              if(deleteFromGroup != undefined) {
                actions$.push(this.userService.deleteGroupFromUser(userId, deleteFromGroup));
              }
              actions$.push(this.userService.updateGroupOfUser(userId, addToGroup));

              return forkJoin(actions$);
            } else {
              this.toastr.show("Can\'t add user to unknown Group.", 'error');
              return EMPTY;
            }            
          } else {
            return EMPTY;
          }
        })
      );

      selectedRole$.subscribe({
        next: (result) => {
          this.toastr.show("User Group is updated.", 'success');

          this.allLoaded.set(false);
          this.loadAllData();
        },
        error: () => {
          this.toastr.show("Group not updated.", 'error');
        }
      });
    } else {
      this.toastr.show("User not found.", 'error');
    }
  }

  delete(userId: string): void {
    let user: UserKeyCloak | undefined = this.allUsersData().find(item => item.id === userId);

    if(user != undefined) {
      const data: DeleteDialogData = {
        title: 'Delete',
        message: 'Do you really want to delete the user below?',
        additionalData: `${user.firstName} ${user.lastName} - ${user.username} - ${user.group}`,
        confirmDelete: false
      };

      const dialogRef = this.dialog.open(DeleteDialog, 
        {data}
      );

      const deleteAction$ = dialogRef.afterClosed().pipe(
        switchMap(result => {
          if(result != undefined && result.confirmDelete === true && user != undefined) {
            return this.userService.deleteUser(user);
          } else {
            return EMPTY;
          }
        }) 
      );

      deleteAction$.subscribe({
        next: () => {
          this.toastr.show("User deleted.", 'success');
          this.allLoaded.set(false);
          this.loadAllData();
        },
        error: () => {
          this.toastr.show("User not deleted.", 'error');
        }
      });
    } else {
      this.toastr.show("User not found.", 'error');
    }
  }

  addKeycloakUser(): void {
    this.router.navigate(['add-user']);
  }
  
  getApplicationRoles(): typeof ApplicationRoles {
    return ApplicationRoles;
  }

  private getAndAssignGroupMembers() : void {
    if(this._uniqueGroups() != undefined) {
      const actions$: Array<Observable<any>> = [];
      let groupNames: string[] = [];

      this._uniqueGroups().forEach(item => {
        actions$.push( this.userService.getMembersOfGroup(item.id) );
        groupNames.push(item.name);
      });

      forkJoin(actions$).subscribe({
        next: (result: any[]) => {
          for(let i = 0; i < result.length; i++) {
            result[i].forEach((element: any) => {
              let found: UserKeyCloak | undefined = this.allUsersData().find(item => item.id === element.id);

              if(found != undefined && i < groupNames.length) {
                found.group = groupNames[i];
              }
            });
          }
        },
        error: () => {
          this.toastr.show("Unable to fetch members of group.", 'error');
          this.allLoaded.set(true);
        },
        complete: () => {
          this.allLoaded.set(true);
        }
      });
    } else {
      this.toastr.show("Unique groups are undefined.", 'error');
    }
  }

}