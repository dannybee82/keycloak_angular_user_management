import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { AllMatModules } from '../../../all-mat-modules.module';

export interface DialogData {
  typeEnableUser: boolean,
  userIsEnabled: boolean,
  selectedRole: string
}

@Component({
  selector: 'app-change-role-dialog',
  templateUrl: './change-role-dialog.component.html',
  styleUrls: ['./change-role-dialog.component.scss'],
  standalone: true,
  imports: [
    AllMatModules
  ]
})
export class ChangeRoleDialogComponent implements OnInit {

  public selectedVal: string = '';

  constructor(
    public dialogRef: MatDialogRef<ChangeRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    if(this.data.typeEnableUser && this.data.userIsEnabled) {
      this.selectedVal = this.data.userIsEnabled.toString();
    }

    if(!this.data.typeEnableUser && this.data.selectedRole) {
      this.selectedVal = this.data.selectedRole;
    }   
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  public onValChange(val: string) {
    this.selectedVal = val;

    if(this.data.typeEnableUser) {
      this.data.userIsEnabled = this.selectedVal === 'true' ? true : false;
    } else {
      this.data.selectedRole = this.selectedVal;
    }    
  }

  public changeRole(event: MatRadioChange): void {
    this.data.selectedRole = event.value;
  }

  returnData() : any {
    if(this.data.typeEnableUser) {
      return this.data.userIsEnabled;
    } else {
      return this.data.selectedRole;
    }
  }

}
