import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import { AppContextProvider } from './context/appContext';
import './index.css';
import persistStore from "redux-persist/es/persistStore"
import {PersistGate} from "redux-persist/lib/integration/react"
import { store } from './features/store';
import { Provider } from 'react-redux';
import App from './App';

const persistedStore=persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <AppContextProvider>
          <Router>
            <Routes>
              <Route path="/*" element={<App/>}/>
            </Routes>
          </Router>
        </AppContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);


