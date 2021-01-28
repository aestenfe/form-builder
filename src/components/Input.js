import {
  func, instanceOf, number, string,
} from "prop-types";
import React from "react";
import styled from "styled-components";
import Errors from "./Errors";

const InputStyle = styled.input`
  width: 100%;
  height: 24px;
  border-radius 4px;
  border: solid 1px;
  border-color: #CCCCCC;
  font-size: inherit;
  padding: 0.4em 0;

  &:hover {
    border-color: #B0B0B0;
  }

  &:focus {
    border: solid 2px;
    border-color: #674263;
    outline: none;
    height: 22px;
  }
`;

const Input = ({
  name, value, onChange, errors,
}) => (
  <div>
    <InputStyle
      type="text"
      name={name}
      value={value}
      onChange={onChange}
    />
    <Errors errors={errors} />
  </div>
);

Input.propTypes = {
  name: number.isRequired,
  value: string.isRequired,
  onChange: func.isRequired,
  errors: instanceOf(Array),
};

Input.defaultProps = {
  errors: [],
};

export default Input;
