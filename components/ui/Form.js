import styled from "@emotion/styled";

export const Form = styled.form`
  max-width: 60rem;
  width: 95%;
  margin: 5rem auto;

  fieldset {
    margin: 2rem 0;
    border: 1px solid var(--light-gray);
    font-size: 2rem;
    padding: 2rem;
  }
`;

export const Field = styled.div`
  margin-bottom: 2rem;
  display: inline-block;
  align-items: center;
  width: 100%;

  label {
    font-size: 1.8rem;
  }

  input,
  textarea {
    padding: 1rem;
    width: 99%;
  }

  textarea {
    height: 20rem;
  }

  input[type="file"] {
    display: none;
  }
`;

export const InputImage = styled.label`
  display: inline-block;
  padding: 1rem;
  border: 1px solid rgb(118, 118, 118);
  border-radius: 0.3rem;
  cursor: pointer;
  position: relative;
  font-size: 2rem;
  color: var(--gray);
  width: 99%;

  span {
    font-family: "Material Icons";
    font-size: 2.8rem;
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 1rem;
  }
`;

export const InputSubmit = styled.input`
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  padding: 1.5rem;
  background-color: ${(props) => (props.bgColor ? "white" : "var(--orange)")};
  color: ${(props) => (props.bgColor ? "black" : "white")};
  font-size: 1.8rem;
  font-family: "Varela Round", sans-serif;
  width: 100%;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

export const Error = styled.p`
  background-color: rgb(200, 0, 0);
  padding: 1rem;
  font-weight: 700;
  font-size: 1.4rem;
  color: white;
  text-align: center;
  text-transform: uppercase;
  margin: 2rem 0;
`;
