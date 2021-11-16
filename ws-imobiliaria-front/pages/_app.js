import '../styles/globals.css';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import Store from '../redux/store/Store';
import NavBar from '../components/Navbar';
import React from 'react';

function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={Store}>
        <NavBar />
        <Component {...pageProps} />
        {/* <Toaster /> */}
      </Provider>
    </>
  )
}

const makeStore = () => Store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(App);