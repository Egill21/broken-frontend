import React, { Fragment, useState } from 'react';

import Button from '../button/Button';

import { addToCart } from '../../api/index';
import { IProduct } from '../../api/types';
import { Context } from '../../User';

import './Product.scss';

export default function SingleProduct(props: { product: IProduct }) {
  const { product } = props;

  const [input, setInput] = useState<number | string>(1);
  const [added, setAdded] = useState<boolean>(false);

  function updateQuantity(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = parseInt(e.target.value); // tslint:disable-line
    const value = isNaN(inputValue) ? '' : inputValue;
    if (typeof value === 'number' && value < 1) {
      setInput(1);
    } else {
      setInput(value);
    }
  }

  async function addItem(
    quantity: number | string,
    token: string | null
  ): Promise<void> {
    if (typeof quantity === 'number') {
      await addToCart(product.id, quantity, token);
      setAdded(true);
    }
  }

  const desc = product.description;
  const textArr = desc ? desc.split('\n') : [];
  const descElement = textArr.map((paragraph, i) => {
    return (
      <p key={i} className="product__description">
        {paragraph}
      </p>
    );
  });

  return (
    <Context.Consumer>
      {({ user, token }) => {
        return (
          <Fragment>
            <div className="product__col">
              <img className="product__image" src={product.image} />
            </div>
            <div className="product__col">
              <div>
                <h2
                  className="product__title"
                  dangerouslySetInnerHTML={{ __html: product.title }}
                ></h2>
                <div className="product__description">
                  <p>
                    Flokkur: {product.category_title} <br />
                    Verð: {`${product.price} kr-`}
                  </p>
                </div>
                {descElement}
                {user && (
                  <Fragment>
                    <label>Fjöldi</label>
                    <input
                      onChange={updateQuantity}
                      value={input}
                      className="product__input"
                      type="number"
                    ></input>
                    <Button
                      onClick={() => addItem(input, token)}
                      className="product__button"
                    >
                      Bæta við körfu
                    </Button>
                    {added && (
                      <label className="product__added">Bætt við körfu!</label>
                    )}
                  </Fragment>
                )}
              </div>
            </div>
          </Fragment>
        );
      }}
    </Context.Consumer>
  );
}
