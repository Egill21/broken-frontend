import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '../../api/types';

import './Products.scss';

export default function Products(props: {
  productList: IProduct[];
  onClick?: any;
}) {
  const { productList, onClick } = props;

  return (
    <Fragment>
      {productList.map((product, i) => {
        return (
          <div key={i} className="products__col">
            <div className="products__product">
              <Link
                onClick={() => onClick(product.id)}
                className="products__link"
                to={`/product/${product.id}`}
              >
                <div className="products__imgcont">
                  <img className="products__image" src={product.image} />
                </div>
                <div className="products__info">
                  <div className="products__descr">
                    <h3
                      className="products__title"
                      dangerouslySetInnerHTML={{ __html: product.title }}
                    ></h3>
                    <p>{product.category_title}</p>
                  </div>
                  <p className="products__price">{product.price} kr.-</p>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
}
