import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';import Home from './component/Layout/Home';
import Index from './component/Blog/Index';
import Detail from './component/Blog/Detail';
import Indexmember from './component/Member/Indexmember';
import Update from './component/Product/Update';
import Myproduct from './component/Product/Myproduct';
import Addproduct from './component/Product/Addproduct';
import Editproduct from './component/Product/Editproduct';
import Allproduct from './component/Product/Allproduct';
import Productdetail from './component/Product/Productdetail';
import Mycart from './component/Product/Mycart';
import Wishlist from './component/Product/Wishlist';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
        <Route index path='/home' element={<Home />} />
        <Route path='blog/index' element={<Index/>} />
        <Route path='blog/detail/:id' element={<Detail/>}/>
        <Route path='member/index' element={<Indexmember/>}/>
        <Route path='account/index' element={<Update/>}/>
        <Route path='account/myproduct' element={<Myproduct/>}/>
        <Route path='account/addproduct' element={<Addproduct/>}/>
        <Route path='account/editproduct/:id' element={<Editproduct/>}/>
        <Route path='allproduct' element={<Allproduct/>}/>
        <Route path='product/detail/:id' element={<Productdetail/>}/>
        <Route path='mycart' element={<Mycart/>}/>
        <Route path='whishlist' element={<Wishlist/>}/>
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
