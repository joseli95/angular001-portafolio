import { Component, OnInit } from '@angular/core';
import { Pokemon } from './pokemon.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  appName:string = 'fundamentals-app';
  angularLogo:string = "https://angular.io/assets/images/logos/angular/angular.svg"

  btnDisabled:boolean = true
  email:string = "edu@eml.run"

  mostrarAlerta() {
    alert("Alerta ⚠️")
  }

  contadorOvejas:number = 0

  contarOveja() {
    this.contadorOvejas += 1
  }

  establecerOvejas(event: Event) {
    const element = event.target as HTMLInputElement;

    try {
      const numeroOvejas: number = parseInt(element.value);
      if (numeroOvejas > 0) {
        this.contadorOvejas = numeroOvejas;
      }
    } catch {
      console.log('No es un número');
    }
  }

  persona:any = {
    nombre: ''
  }

  listaPersonas: string[] = []

  agregarPersona():void {
    this.listaPersonas.push(this.persona.nombre)
    this.persona.nombre = ''
  }

  borrarPersona(index: number):void {
    this.listaPersonas.splice(index, 1)
  }

  miPokedex: Pokemon[] = [];

  ngOnInit(): void {

      /*
      AQUÍ PUEDES CONTINUAR CON EL EJERCICIO PARA OBTENER LA IMAGEN DEL POKÉMON
        -> Recuerda revisar el API de https://pokeapi.co/ <-
      */

    this.getPokemons().then(() => {
      console.log(this.miPokedex)
      this.miPokedex.forEach((el) => {
        fetch(el.url)
          .then((response) => response.json())
          .then((data) => {
            el.image = data.sprites.front_default
          })
      })
    })

  }

  async getPokemons() {
    await fetch(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=${Math.floor(Math.random() * 501)}`)
      .then((response) => response.json())
      .then((data) => {
        this.miPokedex = data.results

      })
  }

  nuevoPokemon: string = "";


}
