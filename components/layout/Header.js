import React, { useContext } from "react";
import Link from "next/link";
import Router from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Search from "../ui/Search";
import Navigator from "./Navigator";
import Button from "../ui/Button";
import { FirebaseContext } from "../../firebase";

const HeaderCointainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Header = () => {
  // Contexts
  const { user, firebase } = useContext(FirebaseContext);

  const onSignOut = () => {
    firebase.signOutUser();
    Router.push("/");
  };

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--light-gray);
        padding: 1rem 0;
      `}
    >
      <HeaderCointainer>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <svg
              css={css`
                &:hover {
                  cursor: pointer;
                }
              `}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20"
                  fill="#DA552F"
                ></path>
                <path
                  d="M22.667 20H17v-6h5.667a3 3 0 010 6m0-10H13v20h4v-6h5.667a7 7 0 100-14"
                  fill="#FFF"
                ></path>
              </g>
            </svg>
          </Link>

          <Search />

          <Navigator />
        </div>

        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hola {user.displayName}!
              </p>
              <Button bgColor="true" type="button" onClick={onSignOut}>
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button bgColor="true">Iniciar Sesión</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Crear Cuenta</Button>
              </Link>
            </>
          )}
        </div>
      </HeaderCointainer>
    </header>
  );
};

export default Header;
