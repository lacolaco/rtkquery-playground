import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { combineReducers } from '@reduxjs/toolkit';
import { pokemonApi } from './api/pokemon';

const reducers = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export type RootState = ReturnType<typeof reducers>;

@NgModule({
  imports: [StoreModule.forRoot(reducers)],
})
export class AppStoreModule {}
