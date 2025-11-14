import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, 
         IonItem, IonButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { Auth } from 'src/services/auth';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, logInOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonButton, IonButton, IonItem, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  private auth = inject(Auth) ;
  constructor() {
    addIcons({ mailOutline, lockClosedOutline, logInOutline });
  }

  ngOnInit() {
    this.loginForm = new FormGroup({ 
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }); 
  
  }
  async login() {
    try {
      if (this.loginForm.valid) {
        const formValue = this.loginForm.value;
        console.log('Form Value:', formValue);
        const isAuthenticated = await this.auth.login(formValue);
        
        if (isAuthenticated) {
          console.log('Login exitoso');
          // Add navigation logic here
        } else {
          console.log('Error de autenticación');
        }
      }
    } catch (error) {
      console.error('Error en login:', error);
    }
  }
}

