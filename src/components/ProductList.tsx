import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IGeneralQuery, IProduct, TFiltersType } from '../types';
import { selectProducts, selectLoading, addToCart } from '../store/appSlice';
import { ProductCard } from './ProductCard';
import { useSearchQueryParams } from '../hooks/useSearch';
import { Category, Filters, SortBy } from '../models';

export const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const { createSearch, getSearchData } = useSearchQueryParams();
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const { search: searchRaw, category: categoryRaw, sort: sortRaw }: IGeneralQuery = getSearchData();

  const search = searchRaw ?? '';
  const category = Object.values(Category).includes(categoryRaw as Category) ? (categoryRaw as Category) : Category.all;
  const sort = sortRaw === SortBy.name || sortRaw === SortBy.price ? sortRaw : SortBy.name;

  const filteredAndSorted = useMemo<IProduct[]>(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === Category.all || product.category === category;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sort === SortBy.name) return a.name.localeCompare(b.name);
        if (sort === SortBy.price) return a.price - b.price;
        return 0;
      });
  }, [products, search, category, sort]);  

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    createSearch({
      'search': e.target.value
    })
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, type: TFiltersType) => {
    createSearch({
      [type]: e.target.value
    })
  };

  const handleAddToCart = (product: IProduct) => {dispatch(addToCart(product))}

  if (loading) {
    return <div className='loading'>Загрузка товаров...</div>;
  }

  return (
    <div className='product-list'>
      <div className='filters'>
        <div className='search'>
          <input
            type='text'
            placeholder='Поиск товаров...'
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className='filter-controls'>
          {showFilters && 
            <select 
              value={category} 
              onChange={(e) => handleSelectChange(e, Filters.category)}
            >
              <option value={Category.all}>Все категории</option>
              <option value={Category.phones}>Телефоны</option>
              <option value={Category.laptops}>Ноутбуки</option>
              <option value={Category.tablets}>Планшеты</option>
            </select>
          }
          {showFilters && 
            <select 
              value={sort} 
              onChange={(e) => handleSelectChange(e, Filters.sort)}
            >
            <option value={SortBy.name}>По названию</option>
            <option value={SortBy.price}>По цене</option>
          </select>}
          <button onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
          </button>
        </div>
      </div>
      <div className='products'>
        {filteredAndSorted.map((product: IProduct) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};
