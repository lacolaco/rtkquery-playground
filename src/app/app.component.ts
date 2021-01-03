import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { pokemonApi } from './api/pokemon';
import { RootState } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data$: Observable<any>;

  constructor(private store: Store<RootState>) {
    this.data$ = this.store.select(
      pokemonApi.endpoints.getPokemonByName.select('pikachu')
    );
  }

  ngOnInit() {
    pokemonApi.endpoints.getPokemonByName.initiate('pikachu')(
      this.store.dispatch,
      this.store.getState, // doesn't exist
      {}
    );
  }
}
