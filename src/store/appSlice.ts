import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, IUser, IAppState } from '../types';

const initialState: IAppState = {
  products: [],
  cart: [],
  user: null,
  loading: false,
  error: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload;
    },
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.cart.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.cart.find(i => i.id === action.payload.id);
      if (item && action.payload.quantity > 0) {
        item.quantity = action.payload.quantity;
      }
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  setProducts,
  addToCart,
  removeFromCart,
  updateQuantity,
  setUser,
  setLoading,
  setError,
  clearCart,
} = appSlice.actions;

export const selectProducts = (state: { app: IAppState }) => state.app.products;
export const selectCart = (state: { app: IAppState }) => state.app.cart;
export const selectUser = (state: { app: IAppState }) => state.app.user;
export const selectLoading = (state: { app: IAppState }) => state.app.loading;

export const selectCartCount = createSelector(
  [selectCart],
  (cart) => cart.reduce((sum, item) => sum + item.quantity, 0)
);

export const selectTotalPrice = createSelector(
  [selectCart],
  (cart) => cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export default appSlice.reducer;
