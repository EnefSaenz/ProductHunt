import React from "react";
import Header from "./Header";
import Head from "next/head";

const Layout = (props) => {
  return (
    <>
      <Head>
        <title>Product Hunt - Firebase y NextJS</title>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&family=Varela+Round&display=swap"
          rel="stylesheet"
        />
        <link href="/static/css/app.css" rel="stylesheet" />
      </Head>

      <Header />

      <main>{props.children}</main>
    </>
  );
};

export default Layout;
