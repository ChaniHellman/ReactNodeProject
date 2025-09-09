import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import userSlice from "./redux/userSlice";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const Home = React.lazy(() => import('./store/home'));
const AddProducts = React.lazy(() => import('./store/addProduct'));
const Products = React.lazy(() => import('./store/products'));
const Layout = React.lazy(() => import('./common/layout'));
const Login = React.lazy(() => import('./enter/login'));
const Register = React.lazy(() => import('./enter/register'));
const AddToCart = React.lazy(() => import('./store/addToCart'));
const Store = React.lazy(() => import('./store/myStore'));
const Cart = React.lazy(() => import('./store/Cart'));
const ProdItem = React.lazy(() => import('./store/prodItem'));

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

function App() {
  return (
    <PrimeReactProvider>
      <div className="App">
        <Provider store={store}>
          <Router>

            <Routes>

              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />

                <Route path="add" element={<Suspense fallback="loading..."><AddProducts /></Suspense>} />
                <Route path="addToCart" element={<Suspense fallback="loading..."><AddToCart /></Suspense>} />
                <Route path="store" element={<Suspense fallback="loading..."><Store /></Suspense>} />
                <Route path="login" element={<Suspense fallback="loading..."><Login /></Suspense>} />
                <Route path="products" element={<Suspense fallback="loading..."><Products /></Suspense>} />
                <Route path="register" element={<Suspense fallback="loading..."><Register /></Suspense>} />
                <Route path="cart" element={<Suspense fallback="loading..."><Cart /></Suspense>} />
                <Route path="prodItem" element={<Suspense fallback="loading..."><ProdItem /></Suspense>} />


              </Route>
              <Route
                path="/*"
                element={
                  <h1 style={{
                    fontSize: '6rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: '200px',
                    color: 'black'
                  }}>
                    404 - The page you're looking for doesn't exist.
                  </h1>
                }
              />
            </Routes>
          </Router>
        </Provider>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
