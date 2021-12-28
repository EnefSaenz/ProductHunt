import React, { useState } from "react";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import { Error, Field, Form, InputSubmit } from "../components/ui/Form";

import firebase from "../firebase";

// Validations
import useValidator from "../hooks/useValidator";
import validateSignIn from "../validation/validateSingIn";

const INITIAL_STATE = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [error, setError] = useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidator(INITIAL_STATE, validateSignIn, createAccount);

  const { email, password } = values;

  async function createAccount() {
    try {
      await firebase.signInUser(email, password);
      Router.push("/");
    } catch (error) {
      console.error("Hubó un error al iniciar sesión", error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1 className="page-title">Iniciar sesión</h1>
          <Form onSubmit={handleSubmit}>
            <Field>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@mail.com"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </Field>

            <Field>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </Field>

            {errors.email ? (
              <Error>{errors.email}</Error>
            ) : errors.password ? (
              <Error>{errors.password}</Error>
            ) : null}

            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="Iniciar sesión" />
          </Form>
        </>
      </Layout>
    </div>
  );
};

export default SignIn;
