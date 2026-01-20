import { IProduct } from '../types';

interface IProductCardProps {
  product: IProduct;
  onAddToCart: () => void;
}

export const ProductCard = ({ product, onAddToCart }: IProductCardProps) => {
  return (
    <div className='product-card'>
      <img src={product.image.trim()} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className='price'>${product.price}</div>
      <button onClick={onAddToCart}>Добавить в корзину</button>
    </div>
  );
};
