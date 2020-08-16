import React from 'react';
import Header from './Header';
import IndexPage from './IndexPage';

const MyApp = ({ children }) => (
  <main>
    <IndexPage />
    <Header />
    {children}
  </main>
);

export default MyApp;
