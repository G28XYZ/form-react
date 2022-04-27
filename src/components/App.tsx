import React from 'react';
import Form from './Form';
import { StoreProvider } from '../context/context';

export default function App() {
  return (
    <StoreProvider>
      <Form />
    </StoreProvider>
  );
}
