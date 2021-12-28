import styled from "@emotion/styled";
import React, { useState } from "react";
import { css } from "@emotion/react";
import Router from "next/router";

const InputText = styled.input`
  border: 1px solid var(--light-gray);
  padding: 1rem;
  min-width: 300px;
`;

const ButtonSubmit = styled.button`
  height: 3.6rem;
  width: 4rem;
  display: block;
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
  background-color: white;
  border: none;
  color: var(--gray);

  &:hover {
    cursor: pointer;
  }
`;

const Search = () => {
  const [search, setSearch] = useState("");

  const searchProduct = (e) => {
    e.preventDefault();

    if (search.trim() === "") return;

    // Redirect user to search
    Router.push({ pathname: "/search", query: { q: search } });
  };

  return (
    <form
      css={css`
        position: relative;
        margin: 0 1rem;
      `}
      onSubmit={searchProduct}
    >
      <InputText
        type="text"
        placeholder="Buscar productos"
        onChange={(e) => setSearch(e.target.value)}
      />

      <ButtonSubmit type="submit">
        <span className="material-icons">search</span>
      </ButtonSubmit>
    </form>
  );
};

export default Search;
