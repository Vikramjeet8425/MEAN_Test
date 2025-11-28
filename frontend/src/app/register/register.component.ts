import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    username: '',
    password: ''
  };

  constructor(private service: UserService, private router: Router) { }

  register() {
    this.service.register(this.user).subscribe((data: any) => {
      if(data){
        this.router.navigate(['/login']);
      } else {
        alert("Error in registration!");
      }
    });
  }
}
