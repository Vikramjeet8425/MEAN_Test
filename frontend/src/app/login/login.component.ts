import { Component } from '@angular/core';
import { UserService } from '../Services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private service: UserService, private router: Router) { }

  logIn() {
    const data = {
      username: this.username,
      password: this.password
    };
    this.service.login(data).subscribe((data: any) => {
      if(data){
        localStorage.setItem('token', data.token);
        this.router.navigate(['/product']);
      } else {
        alert("Error in login!");
      }
    });
  }
}
