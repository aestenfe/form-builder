import { instanceOf } from "prop-types";
import React from "react";
import styled from "styled-components";
import { uniqueId } from "lodash";

const ErrorStyle = styled.p`
  color: red;
  font-size: 0.7em;
`;

const Errors = ({ errors }) => (
  <div>
    {errors ? errors.map((error) => (
      <ErrorStyle key={uniqueId()}>{error}</ErrorStyle>
    )) : null}
  </div>
);

Errors.propTypes = {
  errors: instanceOf(Array),
};

Errors.defaultProps = {
  errors: [],
};

export default Errors;
