import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApplicationRoles } from '../../../models/application-roles.enum';
import { KeycloakUserService } from '../../../services/keycloak-user.service';
import { ToastrService } from 'ngx-toastr';
import { AddUser } from '../../../models/add-user.interface';
import { Credentials } from '../../../models/credentials.interface';
import { Router } from '@angular/router';
import { AllMatModules } from '../../../all-mat-modules.module';

@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [
    AllMatModules,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.scss'
})
export class AddUsersComponent implements OnInit {

  addUserForm: UntypedFormGroup = new FormGroup({});

  availableRoles: ApplicationRoles[] = [
    ApplicationRoles.ADMIN,
    ApplicationRoles.USER,
    ApplicationRoles.REGISTERED
  ];  

  private fb = inject(FormBuilder);
  private keycloakUserService = inject(KeycloakUserService);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [this.availableRoles[2], Validators.required]
    });
  }

  goBack(): void {
    this.router.navigate(['admin']);
  }

  submit(): void {
    if(this.addUserForm.valid) {
      this.addUserForm.disable();

      const data: AddUser = {
        realmRoles: [this.getRole(this.addUserForm.get('role')?.value ?? '')],
        groups: [this.addUserForm.get('role')?.value],
        requiredActions: ["UPDATE_PASSWORD", "UPDATE_PROFILE"],
        enabled: true,
        firstName: this.addUserForm.get('firstName')?.value ?? '',
        lastName: this.addUserForm.get('lastName')?.value ?? '',
        email: this.addUserForm.get('email')?.value.toString().trim() ?? '',
        username: this.addUserForm.get('email')?.value ?? '',
        credentials: this.createCredentials(this.addUserForm.get('firstName')?.value ?? '')
      };     

      this.addUser(data);
    } else {
      this.addUserForm.markAllAsTouched();
        this.toastr.error('Form is invalid.');
    }
  }

  private getRole(role: string): string {
    let found: number = this.availableRoles.findIndex(item => item.toString() === role);

    if(found > -1) {
      return this.availableRoles[found].toString();
    }

    return ApplicationRoles.REGISTERED.toString();
  }

  private createCredentials(firstName: string): Credentials[] {
    let arr: Credentials[] = [];

    const data: Credentials = {
      temporary: true,
      type: "password",
      value: firstName.toLowerCase()
    }

    arr = [data];

    return arr;
  }

  private addUser(data: AddUser): void {
    this.keycloakUserService.addUser(data).subscribe({
      next: (result) => {
        console.log(result);
        this.toastr.success('User successfully added.');
      },
      error: () => {
        this.toastr.error('Can\'t add User.');
      },
      complete: () => {
        this.router.navigate(['admin']);
      }
    });   
  }

}