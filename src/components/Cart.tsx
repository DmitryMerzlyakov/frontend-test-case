import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ICartItem } from '../types';
import {
  selectCart,
  selectCartCount,
  selectTotalPrice,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../store/appSlice';

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const cartCount = useSelector(selectCartCount);
  const totalPrice = useSelector(selectTotalPrice);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert('Заказ оформлен!');
      dispatch(clearCart());
      setIsCheckingOut(false);
      setIsOpen(false);
    }, 1000);
  };

  return (
    <div className='cart'>
      <button className='cart-toggle' onClick={() => setIsOpen(!isOpen)}>
        Корзина ({cartCount})
      </button>

      {isOpen && (
        <div className='cart-dropdown'>
          <div className='cart-header'>
            <h3>Корзина</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className='cart-items'>
            {cart.length === 0 ? (
              <p>Корзина пуста</p>
            ) : (
              cart.map((item: ICartItem) => (
                <div key={item.id} className='cart-item'>
                  <img src={item.image.trim()} alt={item.name} />
                  <div className='item-details'>
                    <h4>{item.name}</h4>
                    <p>${item.price}</p>
                    <div className='quantity-controls'>
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button className='remove-btn' onClick={() => handleRemoveItem(item.id)}>
                    Удалить
                  </button>
                </div>
              ))
            )}
          </div>

          <div className='cart-footer'>
            <div className='total'>Итого: ${totalPrice.toFixed(2)}</div>
            <button
              className='checkout-btn'
              onClick={handleCheckout}
              disabled={cart.length === 0 || isCheckingOut}
            >
              {isCheckingOut ? 'Оформляем...' : 'Оформить заказ'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
