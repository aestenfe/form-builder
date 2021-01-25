import styled from "styled-components";

const Input = styled.input`
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

export default Input;
