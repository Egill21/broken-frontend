import {
  IProduct,
  IProducts,
  ICategory,
  ICategories,
  IlogInInfo,
  ILogInError
} from './types';

// Sækja slóð á API úr env
const baseurl: string | undefined = process.env.REACT_APP_API_URL;

async function getProduct(id: number | string): Promise<IProduct> {
  const url = new URL(String(id), `${baseurl}products/`);
  const response = await fetch(url.href);

  const product: IProduct = {
    category: {
      id: 10,
      title: 'Flokkur'
    },
    id: 1,
    image: '',
    price: 100,
    title: 'Prufuvara'
  };

  return response.json();
}

async function getProducts(): Promise<Array<IProduct> | null> {
  const url = new URL(`${baseurl}products?limit=12`);
  const response = await fetch(url.href);

  if (!response.ok) {
    return null;
  }

  const prods: IProducts = await response.json();

  return prods.items;
}

async function getCategories(): Promise<Array<ICategory> | null> {
  const url = new URL(`${baseurl}categories?limit=12`);
  const response = await fetch(url.href);

  if (!response.ok) {
    return null;
  }

  const cats: ICategories = await response.json();

  return cats.items;
}

async function login(
  userName: string,
  password: string
): Promise<IlogInInfo | Array<ILogInError>> {
  const url = new URL(`${baseurl}users/login`);
  const response = await fetch(url.href, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: userName, password: password })
  });
  const temp: IlogInInfo | Array<ILogInError> = await response.json();
  if (!Array.isArray(temp)) {
    localStorage.setItem('token', temp.token);
    localStorage.setItem('user', temp.user.username);
  }
  return temp;
}

async function register(userName: string, password: string, email: string) {
  const url = new URL(`${baseurl}users/register`);
  const response = await fetch(url.href, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: userName,
      email: email,
      password: password
    })
  });
}

export { getProduct, getProducts, getCategories, login, register };
