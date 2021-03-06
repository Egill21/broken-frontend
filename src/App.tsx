import React from "react";
import Helmet from "react-helmet";
import { Route, Switch, withRouter } from "react-router-dom";

import Header from "./components/header/Header";

import Cart from "./routes/cart/Cart";
import Categories from "./routes/categories/Categories";
import Category from "./routes/category/Category";
import Home from "./routes/home/Home";
import Login from "./routes/login/Login";
import Order from "./routes/orders/Order";
import Orders from "./routes/orders/Orders";
import Product from "./routes/product/Product";
import Register from "./routes/register/Register";

import NotFound from "./routes/system-pages/NotFound";

import "./App.scss";
import "./grid.css";

type Props = { // tslint:disable-line
  location: Location;
};

function App(props: Props) {
  return (
    <React.Fragment>
      <Helmet defaultTitle="Vefforritunarbúðin" titleTemplate="%s – Vefforritunarbúðin" />

      <Header />

      <div className="app">

        <main>
          <Switch location={props.location}>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/categories/" exact component={Categories} />
            <Route path="/categories/:id" exact component={Category} />
            <Route path="/product/:id" exact component={Product} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/orders/:id" exact component={Order} />
            <Route component={NotFound} />
          </Switch>
        </main>

      </div>
    </React.Fragment>
  );
}

export default withRouter(App);
