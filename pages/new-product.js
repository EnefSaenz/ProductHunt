import React, { useContext, useEffect, useState } from "react";
import Router from "next/router";
import { css } from "@emotion/react";

import Layout from "../components/layout/Layout";
import {
  Error,
  Field,
  Form,
  InputImage,
  InputSubmit,
} from "../components/ui/Form";
import Error403 from "../components/layout/403";

import { FirebaseContext } from "../firebase";

// Validations
import useValidator from "../hooks/useValidator";
import validateNewProduct from "../validation/validateNewProduct";

const INITIAL_STATE = {
  name: "",
  enterprise: "",
  image: "",
  url: "",
  description: "",
};

const NewProduct = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageObj, setImageObj] = useState();

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidator(INITIAL_STATE, validateNewProduct, createProduct);

  const { name, enterprise, image, url, description } = values;

  // Context CRUD from firebase
  const { user, firebase } = useContext(FirebaseContext);

  async function createProduct() {
    try {
      setLoading(true);

      const urlImage = await firebase.uploadImage(imageObj);

      // To create new product object
      const product = {
        name,
        enterprise,
        urlImage,
        url,
        description,
        votes: 0,
        comments: [],
        created: Date.now(),
        creator: {
          id: user.uid,
          name: user.displayName,
        },
        haveVoted: [],
      };

      // For inserting on Firebase's DB
      await firebase.insertProduct(product);
      setLoading(false);

      Router.push("/");
    } catch (error) {
      setLoading(false);
      console.error("Hubó un error al registrar el producto", error.message);
      setError(error.message);
    }
  }

  // Function to be called when submitting an image
  const handleImageChange = (e) => {
    handleChange(e);
    setImageObj(e.target.files[0]);
  };

  return (
    <div>
      <Layout>
        {!user ? (
          <Error403 />
        ) : (
          <>
            <h1 className="page-title">Agregar producto</h1>
            <Form onSubmit={handleSubmit}>
              <fieldset>
                <legend>Información general</legend>

                <Field>
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nombre del producto"
                    value={name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Field>

                <Field>
                  <label htmlFor="enterprise">Empresa</label>
                  <input
                    type="text"
                    id="enterprise"
                    name="enterprise"
                    placeholder="Nombre de la empresa o compañía"
                    value={enterprise}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Field>

                <Field>
                  <label htmlFor="file-label">Imágen</label>
                  <InputImage
                    id="file-label"
                    htmlFor="image"
                    css={
                      image &&
                      css`
                        background-color: rgb(232, 240, 254);
                        color: black;
                      `
                    }
                  >
                    {image ? image : "Subir imágen..."}
                    <span>file_upload</span>
                  </InputImage>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    value={image}
                    onChange={handleImageChange}
                    onBlur={handleBlur}
                    required
                  />
                </Field>

                <Field>
                  <label htmlFor="url">URL</label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    placeholder="URL del producto"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Field>

                {errors.name ? (
                  <Error>{errors.name}</Error>
                ) : errors.enterprise ? (
                  <Error>{errors.enterprise}</Error>
                ) : errors.image ? (
                  <Error>{errors.image}</Error>
                ) : errors.image ? (
                  <Error>{errors.url}</Error>
                ) : null}
              </fieldset>

              <fieldset>
                <legend>Sobre tu producto</legend>

                <Field>
                  <label htmlFor="description">Descripción</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                </Field>

                {errors.description && <Error>{errors.description}</Error>}
              </fieldset>

              {error && <Error>{error}</Error>}

              {loading ? (
                <div className="text-center">
                  <div className="lds-hourglass"></div>
                </div>
              ) : (
                <InputSubmit type="submit" value="Crear producto" />
              )}
            </Form>
          </>
        )}
      </Layout>
    </div>
  );
};

export default NewProduct;
