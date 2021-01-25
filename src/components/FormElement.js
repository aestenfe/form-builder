import React from "react";
import { bool, node, string } from "prop-types";
import styled from "styled-components";

const FormContainer = styled.div`
  padding: 0.6em 5%;
`;

const FormElement = ({ children, question, isRequired }) => (
  <FormContainer>
    <p>{`${question}${isRequired ? " *" : ""}`}</p>
    {children}
  </FormContainer>
);

FormElement.propTypes = {
  children: node.isRequired,
  question: string,
  isRequired: bool,
};

FormElement.defaultProps = {
  question: "",
  isRequired: false,
};

export default FormElement;
