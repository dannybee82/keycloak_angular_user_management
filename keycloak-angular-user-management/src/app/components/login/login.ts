import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Base } from '../shared/base';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [
    MatButtonModule,
    MatIconModule
  ]
})
export class Login extends Base implements OnInit {

  override ngOnInit(): void {
    super.ngOnInit();

    if(this.authenticated()) {
      if(this.isAdmin()) {        
        this.router.navigate(['/admin']);
      }
    }
  }

}