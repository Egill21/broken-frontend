import React, { Fragment, useEffect, useState } from "react";

import { getCategories } from "../../api/index";
import { ICategory } from "../../api/types";
import Categories from "../../components/categories/Categories";

export default function CategoriesRoute() {

  const [categories, setCategories] = useState<Array<ICategory> | null>([]); // tslint:disable-line
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const myCategories: ICategory[] | null = await getCategories();
    setCategories(myCategories);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      {loading &&
        <p>Hleð gögnum...</p>
      }
      {!loading &&
        <div className="categories">
          {categories && <Categories isFrontPage={false} categorieList={categories} ></Categories>}
        </div>
      }
    </Fragment>
  );
}
