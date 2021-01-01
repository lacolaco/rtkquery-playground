import { Component } from '@angular/core';
import { pokemonApi } from './api/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data = null;

  constructor() {}

  ngOnInit() {
    pokemonApi.endpoints.getPokemonByName.initiate('pikachu');
  }
}
