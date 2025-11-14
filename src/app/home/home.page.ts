import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList } from '@ionic/angular/standalone';
import { Calles } from 'src/interfaces/calles';
import { Datos } from 'src/services/datos';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonContent,CommonModule],
})
export class HomePage {
  data: Calles[] = [];
  private cargaDatos = inject(Datos);
  constructor() {}

  async ngOnInit(){
    await this.Llamado();
  }
  async Llamado() {
   try {
    this.data = await this.cargaDatos.getDatos();
   } catch (error) {
    
   }
  }
}
