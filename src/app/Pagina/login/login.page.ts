import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, 
         IonItem, IonButton, IonIcon, IonLabel, LoadingController, NavController} from '@ionic/angular/standalone';
import { AuthService } from 'src/services/auth';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, logInOutline } from 'ionicons/icons';
import { Alerts } from 'src/services/alerts/alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonButton, IonButton, IonItem, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  private loadingController = inject(LoadingController);
    private Alerts = inject(Alerts)
    private authService = inject(AuthService)
    private Nav = inject(NavController)
  constructor() {
    addIcons({ mailOutline, lockClosedOutline, logInOutline });
  }
  

  ngOnInit() {
    this.loginForm = new FormGroup({ 
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }); 
  
  }

  async login(){
    if (this.loginForm.invalid) return this.Alerts.DataVacia();

  const loading = await this.loadingController.create({
    message: 'Iniciando sesión...',
  });
  await loading.present();

  try {
    const formValue = this.loginForm.value;
    const result = await this.authService.login({
      email: formValue.email,
      password: formValue.password
    });
    
    if (result.success && result.user) {
      console.log('🎉 Login exitoso, rol:', result.user.role);
      
      // 🔥 NAVEGAR SEGÚN EL ROL DEL USER
      if (result.user.role === 'admin') {
        this.Nav.navigateRoot('/home-admin');
      } else if (result.user.role === 'conductor') {
        this.Nav.navigateRoot('/home-conductor');
      } else {
        this.Nav.navigateRoot('/login');
      }
      
      await loading.dismiss();
    } else {
      await loading.dismiss();
    }
  } catch (error) {
    console.error('Error during login:', error);
    await loading.dismiss();
    this.Alerts.DataIncorreta();
  }
 }
  
}

