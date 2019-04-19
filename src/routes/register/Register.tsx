import React, { Children, Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { post2 } from "../../api/index";
import { IFieldError } from "../../api/types";
import Button from "./../../components/button/Button";
import Input from "./../../components/input/Input";

import "./Register.scss";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Array<IFieldError>>([]); // tslint:disable-line

  let status = 200;

  function changeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function changePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function changeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function makeUser() {
    const data = {
      username: username, // tslint:disable-line
      password: password, // tslint:disable-line
      email: email, // tslint:disable-line
    };
    const response = await post2("users/register", data);
    console.log("TCL: makeUser -> response", response); // tslint:disable-line

    status = response.status;
    console.log("TCL: makeUser -> status", status); // tslint:disable-line
    if (status !== 200) {
      const final: IFieldError[] = response.response.errors;
      setErrors(final);
    }
  }

  return (
    <React.Fragment>
      <div className="register__col">
        <h1 className="register__title">Nýskráning</h1>
        {errors &&
          errors.map((i: IFieldError, index: number) => {
            return (
              <label className="register__errors__item" key={index}>
                {i.field}: {i.error}
              </label>
            );
          })}
        <div className="register__input">
          <Input
            onChange={changeUsername}
            name="userName"
            type="text"
            text="Notendanafn:"
          />
          <Input
            onChange={changePassword}
            name="password"
            type="password"
            text="Lykilorð:"
          />
          <Input
            onChange={changeEmail}
            name="email"
            type="email"
            text="Netfang:"
          />
          <Button onClick={makeUser} className="register__button">
            Nýskrá
        </Button>
        </div>
      </div>
      <Link to="/login" className="register__login">Innskráning</Link>
    </React.Fragment>
  );
}
