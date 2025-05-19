import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonText, IonFab, IonFabButton, IonCardContent, IonCardHeader, IonCard, IonCardTitle, IonIcon, IonFabList } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '@supabase/supabase-js';
import { CommonModule } from '@angular/common';

const colors = ['red', 'yellow', 'green', 'black', 'blue', 'purple'];
const animals = ['lion', 'monkey', 'cow', 'rabbit', 'chicken', 'cat'];
const numbers = ['number-1', 'number-2', 'number-3', 'number-4', 'number-5', 'number-6'];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonFabList, IonIcon, IonCardTitle, IonCard, IonCardHeader, IonCardContent, IonFabButton, IonFab, IonText, IonButton, IonHeader, 
    IonToolbar, IonTitle, IonContent, RouterModule, IonButton, CommonModule, IonButtons],
})
export class HomePage implements OnInit{

  user: User | null = null;
  isLoggedIn = false;
  selectedLanguage: string = 'es'; // Idioma por defecto
  selectedTheme: string = 'animals'; // Tema predeterminado (Colores)
  cardsElegidas: string[] = animals; 
  isPortrait: boolean = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      console.log('Usuario en home:', user);
    });

    this.checkOrientation();

    window.addEventListener('resize', () => {
      this.checkOrientation();
    });
  };

  checkOrientation() {
    this.isPortrait = window.innerHeight > window.innerWidth;
  } 

  getThemeIcon(): string {
    switch (this.selectedTheme) {
      case 'colors': return 'assets/temas/colors.png';
      case 'numbers': return 'assets/temas/numbers.png';
      default: return 'assets/temas/animals.png';
    }
  };

  getLanguageIcon(): string {
  switch (this.selectedLanguage) {
    case 'en': return 'assets/flags/uk.png';
    case 'pt': return 'assets/flags/pt.png';
    default: return 'assets/flags/sp.png';
    }
  }
  
  goToLogin() {
    this.router.navigate(['/login']);
  };
  
  goToRegister() {
    this.router.navigate(['/register']);
  };

  logout() {
    this.authService.signOut(); // Esto también redirige al login
  };

  changeLanguage(language: string) {
    this.selectedLanguage = language;
    console.log(`Idioma seleccionado: ${this.selectedLanguage}`);
    // Aquí puedes implementar la lógica para actualizar el idioma en la app
  }

  // Cambiar tema
  changeTheme(theme: string) {

    this.selectedTheme = theme;

    this.cardsElegidas = [];
    switch (theme) {
      case 'colors':
        this.cardsElegidas = colors;
        break;
      case 'animals':
        this.cardsElegidas = animals;
        break;
      case 'numbers':
        this.cardsElegidas = numbers;
        break;
    }
   
    console.log(`Tema seleccionado: ${this.selectedTheme}`);
    // Aquí puedes implementar la lógica para cambiar el tema en la app
  }

  pressCard(card: string) {
    console.log(`Idioma ${this.selectedLanguage}`);
    console.log(`Tarjeta clickeada: ${card}`);

    const audioPath = `assets/audio/${this.selectedTheme}/${card}_${this.selectedLanguage}.mp3`;
    const audio = new Audio(audioPath);
    audio.play().catch((error) => {
      console.error('Error al reproducir el audio:', error);
    });
  };

  // Función de ejemplo para los botones principales
  onButtonClick(button: string) {
    console.log(`Botón clickeado: ${button}`);
    // Aquí puedes manejar lo que ocurre al presionar los botones principales
  }


}
