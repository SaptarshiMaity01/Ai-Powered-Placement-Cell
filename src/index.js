import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css'; 
import App from './App'; 
import { configureStore } from '@reduxjs/toolkit';
import globalReducer from "state";
import { Provider } from 'react-redux';
import { AuthProvider } from "../src/services/AuthContext";
import userReducer from './redux/userSlice'; // adjust path if needed



const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <BrowserRouter>
    <Provider store ={store}>
    <AuthProvider>
      <App />  
    </AuthProvider>
    </Provider>
    </BrowserRouter>
 

);

