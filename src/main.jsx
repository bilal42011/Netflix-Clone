import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import HomeUserScreen from './screens/HomeUserScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import './index.css'
import { store } from "./app/store.js";
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements
} from "react-router-dom";
import HomeScreen from './screens/HomeScreen.jsx'

const user = false;

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    {
      user ? <Route index element={<HomeUserScreen />} /> : <Route index element={<HomeScreen />} />
    }
    <Route path="/login" element={<LoginScreen />} />
    <Route path="/test" element={<div>Test</div>} />
  </Route>
));


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
