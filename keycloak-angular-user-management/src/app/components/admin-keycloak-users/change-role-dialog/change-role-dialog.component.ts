import { Component, inject, OnInit, WritableSignal, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { AllMatModules } from '../../../all-mat-modules.module';
import { applicationRolesArr, applicationRolesTranslations } from '../../../models/application-roles.enum';
import { I18nSelectPipe } from '@angular/common';
import { DialogData } from '../../../models/dialog-data.interface';

@Component({
  selector: 'app-change-role-dialog',
  templateUrl: './change-role-dialog.component.html',
  styleUrls: ['./change-role-dialog.component.scss'],
  imports: [
    AllMatModules,
    I18nSelectPipe
  ]
})
export class ChangeRoleDialogComponent implements OnInit {

  protected selectedVal: WritableSignal<string> = signal('');
  protected applicationRolesArr = applicationRolesArr;
  protected applicationRolesTranslations = applicationRolesTranslations;

  public dialogRef = inject(MatDialogRef<ChangeRoleDialogComponent>);
  public data: DialogData = inject(MAT_DIALOG_DATA);
 
  ngOnInit(): void {
    if(this.data.typeEnableUser && this.data.userIsEnabled) {
      this.selectedVal.set(this.data.userIsEnabled.toString());
    }

    if(!this.data.typeEnableUser && this.data.selectedRole) {
      this.selectedVal.set(this.data.selectedRole);
    }   
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onValChange(val: string) {
    this.selectedVal.set(val);

    if(this.data.typeEnableUser) {
      this.data.userIsEnabled = this.selectedVal() === 'true' ? true : false;
    } else {
      this.data.selectedRole = this.selectedVal();
    }    
  }

  changeRole(event: MatRadioChange): void {
    this.data.selectedRole = event.value;
  }

  returnData() : boolean | string {
    if(this.data.typeEnableUser) {
      return this.data.userIsEnabled;
    } else {
      return this.data.selectedRole;
    }
  }

}