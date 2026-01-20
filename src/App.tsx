import React, { useEffect } from 'react';
import { useAppDispatch } from './hooks/useAppDispatch';
import { setProducts, setUser, setLoading } from './store/appSlice';
import { mockProducts } from './utils/mockData';
import {Header, ProductList, Cart} from './components';
import './App.css';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setUser(
        { 
          id: 1,
          name: 'Иван Иванов',
          email: 'ivan@example.com'
        }
      )
    );
    dispatch(setLoading(true));
    dispatch(setProducts(mockProducts));
    dispatch(setLoading(false));
  }, [dispatch]);

  return (
    <div className='app'>
      <Header />
      <div className='main-content'>
        <ProductList />
        <Cart />
      </div>
    </div>
  );
}
