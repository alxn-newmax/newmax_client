import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const TanstackProvider: React.FC<{ children: React.ReactNode }> = (props) => (
  <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
);

export default TanstackProvider;
