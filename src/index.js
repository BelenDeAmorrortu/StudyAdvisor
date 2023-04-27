import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store/index.js'
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <Provider store={store}>
        <BrowserRouter>
        <ThemeProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
        </ThemeProvider>
        </BrowserRouter>
    </Provider>
);
