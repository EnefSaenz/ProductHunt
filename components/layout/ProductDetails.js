import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";

const Product = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;

  @media (max-width: 768px) {
    display: block;
  }
`;

const ProductInfo = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Image = styled.img`
  width: 200px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
    display: block;
  }
`;

const Title = styled.a`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;

  :hover {
    cursor: pointer;
  }
`;

const Description = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: #888;
`;

const Comments = styled.div`
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  border: 1px solid #e1e1e1;
  padding: 0 1rem;
  cursor: pointer;

  p {
    margin-left: 2rem;
    font-weight: 700;
  }
`;

const Votes = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;

  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const ProductDetails = ({ product }) => {
  const { id, comments, created, description, name, urlImage, votes } = product;

  return (
    <Product>
      <ProductInfo>
        <div>
          <Link href={`/products/${id}`} passHref>
            <Image src={urlImage} />
          </Link>
        </div>

        <div>
          <Link href={`/products/${id}`} passHref>
            <Title>{name}</Title>
          </Link>

          <Description>{description}</Description>

          <Link href={`/products/${id}`} passHref>
            <Comments>
              <FontAwesomeIcon
                icon={["far", "comments"]}
                size="lg"
                fixedWidth
              />
              <p>{comments.length} Comentarios</p>
            </Comments>
          </Link>

          <p>
            Publicado hace:{" "}
            {formatDistanceToNow(new Date(created), { locale: es })}
          </p>
        </div>
      </ProductInfo>

      <Votes>
        <FontAwesomeIcon icon={["fas", "caret-up"]} size="2x" fixedWidth />
        <p>{votes}</p>
      </Votes>
    </Product>
  );
};

export default ProductDetails;
