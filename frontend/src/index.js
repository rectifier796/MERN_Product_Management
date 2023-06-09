import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProductComponent from './component/product/ProductComponent';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/product' element={<ProductComponent/>}/>
    </Routes>
  </BrowserRouter>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);
