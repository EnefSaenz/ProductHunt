import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/Layout";
import { Field, InputSubmit } from "../../components/ui/Form";
import Button from "../../components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductContainer = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  width: 100%;
`;

const Badge = styled.span`
  color: #000;
  background-color: #ffc107;
  display: inline-block;
  padding: 0.25em 0.4em;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const Product = () => {
  // Product states
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [comment, setComment] = useState({});
  const [queryDB, setQueryDB] = useState(true);

  // Routing for getting the ID
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const {
    name,
    enterprise,
    created,
    creator,
    urlImage,
    description,
    comments,
    url,
    votes,
    haveVoted,
  } = product;

  // Firebase context
  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && queryDB) {
      const getProduct = async (id) => {
        try {
          const response = await firebase.getProductById(id);
          if (response.exists()) {
            setProduct(response.data());
            setQueryDB(false);
          } else {
            setError(true);
            setQueryDB(false);
          }
        } catch (ex) {
          console.log(ex);
          setError(true);
        }
      };

      getProduct(id);
    }
  }, [id]);

  // Managing votes
  const voteForProduct = () => {
    // Verify history of users who have voted
    if (haveVoted.includes(user.uid)) return;

    // Increment votes
    const newTotal = votes + 1;

    // Update DB
    firebase.updateProduct(id, {
      votes: newTotal,
      haveVoted: [...haveVoted, user.uid],
    });

    // Update State
    setProduct({
      ...product,
      votes: newTotal,
    });

    setQueryDB(true); // Querying DB again
  };

  // Managing comments
  const onComment = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const addComment = (e) => {
    e.preventDefault();

    // Adding user info
    comment.userId = user.uid;
    comment.userName = user.displayName;

    // Adding to array
    const newCommentsArray = [...comments, comment];

    // Update DB
    firebase.updateProduct(id, {
      comments: newCommentsArray,
    });

    // Update State
    setProduct({
      ...product,
      comments: newCommentsArray,
    });

    setQueryDB(true); // Querying DB again
  };

  // For validating if user is creator
  const isCreator = (id) => {
    if (creator.id == id) return true;
  };

  // For deleting a product
  const deleteProduct = async () => {
    try {
      //TODO delete on DB
      await firebase.deleteProductById(id);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {Object.keys(product).length === 0 && !error ? (
        <div className="loader lds-hourglass"></div>
      ) : (
        <>
          {error ? (
            <Error404 />
          ) : (
            <div className="container">
              <h1 className="text-center">{name}</h1>

              <ProductContainer>
                <div>
                  <p>
                    Publicado hace:{" "}
                    {formatDistanceToNow(new Date(created), { locale: es })}
                  </p>
                  <p>
                    Por: {creator.name} de {enterprise}
                  </p>
                  <Image src={urlImage} alt={name} />
                  <p>{description}</p>

                  {user && (
                    <>
                      <h2>Agrega tu comentario</h2>
                      <form onSubmit={addComment}>
                        <Field>
                          <input
                            type="text"
                            name="message"
                            onChange={onComment}
                          />
                        </Field>
                        <InputSubmit type="submit" value="Agregar comentario" />
                      </form>
                    </>
                  )}
                  <h2
                    css={css`
                      margin: 2rem 0;
                    `}
                  >
                    Comentarios
                  </h2>
                  {comments.length === 0 ? (
                    "Aún no hay comentarios"
                  ) : (
                    <ul>
                      {comments.map((comment, i) => (
                        <li
                          key={`${comment.userId}-${i}`}
                          css={css`
                            border: 1px solid #e1e1e1;
                            padding: 2rem;
                          `}
                        >
                          <p>{comment.message}</p>
                          <p>
                            Escrito por:{" "}
                            {isCreator(comment.userId) ? (
                              <Badge>
                                {comment.userName}{" "}
                                <FontAwesomeIcon
                                  icon={["fas", "star"]}
                                  fixedWidth
                                />
                              </Badge>
                            ) : (
                              <span
                                css={css`
                                  font-weight: bold;
                                `}
                              >
                                {comment.userName}
                              </span>
                            )}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <aside>
                  <Button target="_blank" bgColor={true} href={url}>
                    <FontAwesomeIcon
                      icon={["fas", "external-link-alt"]}
                      fixedWidth
                    />{" "}
                    Visitar URL
                  </Button>

                  <div
                    css={css`
                      margin-top: 5rem;
                    `}
                  >
                    <p className="text-center">{votes} Votos</p>
                    {user && (
                      <Button onClick={voteForProduct}>
                        <FontAwesomeIcon
                          icon={["fas", "vote-yea"]}
                          fixedWidth
                        />{" "}
                        Votar
                      </Button>
                    )}
                  </div>
                </aside>
              </ProductContainer>

              {user && isCreator(user.uid) && (
                <Button onClick={deleteProduct}>
                  <FontAwesomeIcon icon={["fas", "trash"]} fixedWidth />{" "}
                  Eliminar
                </Button>
              )}
            </div>
          )}
        </>
      )}
    </Layout>
  );
};

export default Product;
