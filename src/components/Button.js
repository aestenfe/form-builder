import styled from "styled-components";

const Button = styled.button`
  min-width: 200px;
  margin: 20px;
  align-content: center;
  display: inline-block;
  background-color: #674263;
  color: white;
  font-weight: 500;
  text-decoration: none;
  border: solid 2px;
  border-color: #22C761;
  border-radius: 8px;
  font-size: 1.2em;
  padding: 0.6em;

  &:hover {
    background-color: #784D74;
  }

  &:active {
    background-color: #B372AC;
    color: #674263;
  }
`;

export default Button;
