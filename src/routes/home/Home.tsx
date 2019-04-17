import React, { Fragment, useState, useEffect } from 'react';
import Helmet from 'react-helmet';
// import { useAsyncEffect } from 'use-async-effect';

import { IProduct, ICategory } from '../../api/types';

import Products from '../../components/products/Products';
import Button from './../../components/button/Button';
import Categories from '../../components/categories/Categories';

import './Home.scss';

import { getProducts, getCategories, login } from '../../api/index';

export default function Home() {
  const [products, setProduct] = useState<Array<IProduct> | null>([]);
  const [categories, setCategories] = useState<Array<ICategory> | null>([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const myProducts: IProduct[] | null = await getProducts();
    const myCategories: ICategory[] | null = await getCategories();
    setProduct(myProducts);
    setCategories(myCategories);

    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <Helmet title="Forsíða" />
      <h2 className="home__heading">Nýjar vörur</h2>
      <div className="home__row">
        {products && <Products productList={products} />}
        <Button className="home__button">Skoða alla flokka</Button>
      </div>
      <h2 className="home__subheading">Skoðaðu vöruflokkana okkar</h2>
      <div className="home__row">
        {categories && <Categories isFrontPage={true} categorieList={categories} />}
      </div>
    </Fragment>
  );
}
