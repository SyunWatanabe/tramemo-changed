import React, { useContext } from 'react';
import App from 'next/app';
import Firebase from '../components/Firebase';
export const FirebaseContext = React.createContext();
export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <FirebaseContext.Provider value={Firebase}>
        <Component {...pageProps} />
      </FirebaseContext.Provider>
    );
  }
}
