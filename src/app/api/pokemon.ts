import { fetchBaseQuery } from '@rtk-incubator/rtk-query';
import { createIntegratedApi } from './api-factory';

// Define a service using a base URL and expected endpoints
export const pokemonApi = createIntegratedApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<{ types: any[] }, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});
