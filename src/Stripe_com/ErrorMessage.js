import * as React from "react";
import styled from "styled-components";

/** Theme */



const ErrorMessage = styled.p`
  text-align: center;
  margin-top: 10px;
  color: #f00;
`;

const ErrorMessageContainer = ({
  errorMessage
}) => {
  return <ErrorMessage>{errorMessage}</ErrorMessage>;
};

export default ErrorMessageContainer;
