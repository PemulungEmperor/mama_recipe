import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from "axios"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//redux toolkit
import { Provider } from 'react-redux'
import  {store}  from './redux/store'

//persist store
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore } from 'redux-persist'
axios.defaults.withCredentials = true

// let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// export default Router