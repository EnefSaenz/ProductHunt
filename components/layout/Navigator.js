import React, { useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { FirebaseContext } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Nav = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 1.8rem;
    margin-right: 2rem;
    color: var(--gray);
    font-family: "Varela Round", sans-serif;

    &:last-of-type {
      margin-right: 0;
      display: inline-flex;
    }
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const Menu = styled.div`
  position: relative;
  cursor: pointer;
  border: 1px solid var(--light-gray);
  padding: 0.2rem;
  margin-left: auto;
  margin-right: 1rem;

  svg {
    font-size: 3rem;
  }

  :hover {
    div {
      display: block;
    }
  }

  @media (min-width: 601px) {
    display: none;
  }
`;

const MenuContent = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #f9f9f9;
  min-width: 16rem;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
  }

  a:hover {
    background-color: #f1f1f1;
  }
`;

const Navigator = () => {
  // Contexts
  const { user } = useContext(FirebaseContext);

  return (
    <>
      <Menu>
        <FontAwesomeIcon icon={["fas", "bars"]} fixedWidth />
        <MenuContent>
          <Link href="/">Inicio</Link>
          <Link href="/popular">Populares</Link>
          {user && <Link href="/new-product">Nuevo Producto</Link>}
        </MenuContent>
      </Menu>
      <Nav>
        <Link href="/">Inicio</Link>
        <Link href="/popular">Populares</Link>
        {user && <Link href="/new-product">Nuevo Producto</Link>}
      </Nav>
    </>
  );
};

export default Navigator;
