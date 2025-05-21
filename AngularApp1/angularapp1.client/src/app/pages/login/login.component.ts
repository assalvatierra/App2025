import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit  {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('auth-token', response.token);
          this.router.navigate(['/Entities']);
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
