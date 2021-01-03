import { Store } from '@ngrx/store';
import {
  BaseQueryFn,
  EndpointDefinitions,
  Api,
  Module,
  buildCreateApi,
  coreModule,
} from '@rtk-incubator/rtk-query';
import { StartQueryActionCreatorOptions } from '@rtk-incubator/rtk-query/dist/esm/ts/core/buildInitiate';
import { QueryArgFrom } from '@rtk-incubator/rtk-query/dist/esm/ts/endpointDefinitions';

export const integrationModuleName = Symbol();
export type IntegrationModule = typeof integrationModuleName;

declare module '@rtk-incubator/rtk-query' {
  export interface ApiModules<
    BaseQuery extends BaseQueryFn,
    Definitions extends EndpointDefinitions,
    ReducerPath extends string,
    EntityTypes extends string
  > {
    [integrationModuleName]: {
      endpoints: {
        [K in keyof Definitions]: {
          initiate2: (
            args: QueryArgFrom<Definitions[K]>,
            options?: StartQueryActionCreatorOptions
          ) => (ngrxStore: Store<any>) => void;
          myEndpointProperty: string;
        };
      };
    };
  }
}

export const integrationModule = (): Module<IntegrationModule> => ({
  name: integrationModuleName,

  init(api, options, context) {
    // initialize stuff here if you need to
    const { baseQuery } = options;

    return {
      injectEndpoint(endpoint, definition) {
        const buildInitiateQuery = (
          args: QueryArgFrom<typeof definition>,
          {}: StartQueryActionCreatorOptions = {}
        ) => {
          const internalQueryArgs = definition.query(args);
          const queryCacheKey = options.serializeQueryArgs({
            queryArgs: args,
            internalQueryArgs,
            endpoint,
          });
          return (ngrxStore: Store<any>) => {
            baseQuery(
              internalQueryArgs,
              {
                dispatch: ngrxStore.dispatch,
                getState: () => {},
                ...api,
              },
              {}
            );
          };
        };

        const anyApi = (api as any) as Api<
          any,
          Record<string, any>,
          string,
          string,
          IntegrationModule
        >;
        anyApi.endpoints[endpoint].myEndpointProperty = 'test';
        anyApi.endpoints[endpoint].initiate2 = buildInitiateQuery;
      },
    };
  },
});

export const createIntegratedApi = buildCreateApi(
  coreModule(),
  integrationModule()
);
