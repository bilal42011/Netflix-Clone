import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import HomeScreen from './components/HomeScreen'
import LoginScreen from './components/LoginScreen.jsx'
import './index.css'
import { store } from "./app/store.js";
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<HomeScreen />} />
    <Route path="/login" element={<LoginScreen />} />
    <Route path="/test" element={<div>Test</div>} />
  </Route>
));


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
