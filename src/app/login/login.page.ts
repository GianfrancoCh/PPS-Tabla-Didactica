import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup,ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { IonButton, IonInput, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonHeader, IonToolbar, IonButtons, IonTitle, IonCol, IonGrid, IonRow, IonText, IonItem, IonIcon } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonItem, IonText, IonRow, IonGrid, IonCol, IonTitle, IonButtons, IonToolbar,  
    CommonModule,
    FormsModule,
    IonContent,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    RouterModule,
    ReactiveFormsModule,
    IonHeader
  ]
})
export class LoginPage {

  loginForm: FormGroup;
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  async login() {
    const { email, password } = this.loginForm.value;
    try {
      const { data, error } = await this.authService.signIn(email, password);
      if (error) {
        if (error.message === 'Invalid login credentials') {
          this.errorMessage = 'Email o contraseña incorrectos.';
        } else if (error.message === 'missing email or phone') {
          this.errorMessage = 'Falta correo o contraseña.';
        }else{
          this.errorMessage = error.message;
        }
        return;
      }

      // Opcional: navegar a otra ruta
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home']);
      });
      console.log('Login exitoso:', data.user);
    } catch (err) {
      this.errorMessage = 'Error al iniciar sesión.';
    }
  };

  // autocompletarLogin(email:String) {
    
  //   this.loginForm.patchValue({
  //     email: email,
  //     password: password
      
  //   })
  // };

  autocompletarLogin(numUser: number) {

  
    switch (numUser) {
      case 1:
        this.email = 'admin@admin.com';
        this.password = '111111';
        break;
      case 2:
        this.email = 'invitado@invitado.com';
        this.password = '222222';
        break;
      case 3:
          this.email = 'usuario@usuario.com';
          this.password = '333333';
        break;
      case 4:
            this.email = 'anonimo@anonimo.com';
            this.password = '444444';
        break;
      case 5:
        this.email = 'tester@tester.com';
        this.password = '555555';
        break;
      default:
        break;
    }

    this.loginForm.patchValue({
          email: this.email,
          password: this.password
    });
    
  } // end of loadFast

  volverAlHome() {
    this.router.navigate(['/home']);
  };
}
