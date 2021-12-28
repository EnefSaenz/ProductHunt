import React, { useState } from "react";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import { Error, Field, Form, InputSubmit } from "../components/ui/Form";

import firebase from "../firebase";

// Validations
import useValidator from "../hooks/useValidator";
import validateSignUp from "../validation/validateSignUp";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [error, setError] = useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidator(INITIAL_STATE, validateSignUp, createAccount);

  const { name, email, password } = values;

  async function createAccount() {
    try {
      await firebase.register(name, email, password);
      Router.push("/");
    } catch (error) {
      console.error("Hubó un error al registrar al usuario", error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1 className="page-title">Crear cuenta</h1>
          <Form onSubmit={handleSubmit}>
            <Field>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tu nombre"
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </Field>

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

            {errors.name ? (
              <Error>{errors.name}</Error>
            ) : errors.email ? (
              <Error>{errors.email}</Error>
            ) : errors.password ? (
              <Error>{errors.password}</Error>
            ) : null}

            {error && <Error>{error}</Error>}

            <InputSubmit type="submit" value="Crear cuenta" />
          </Form>
        </>
      </Layout>
    </div>
  );
};

export default SignUp;
