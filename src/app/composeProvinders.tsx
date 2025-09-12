import React from 'react';

type ProviderProps = { children: React.ReactNode };
type ProviderComponent = React.ComponentType<ProviderProps>;

export function composeProviders(providers: ProviderComponent[]) {
  return ({ children }: ProviderProps) =>
    providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, children);
}
