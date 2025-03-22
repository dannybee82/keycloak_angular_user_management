import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseComponent } from '../shared/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    MatButtonModule,
    MatIconModule
  ]
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    if(this.authenticated()) {
      if(this.isAdmin()) {        
        this.router.navigate(['/admin']);
      }
    }
  }

}