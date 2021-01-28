import { func, instanceOf, number } from "prop-types";
import React from "react";
import Errors from "./Errors";

const Radio = ({
  name, options, onChange, errors,
}) => (
  <div>
    {options.map((option) => (
      <div key={option.id}>
        <input type="radio" name={name} value={option.id} onClick={onChange} />
        <label htmlFor={option.id}>{option.value}</label>
      </div>
    ))}
    <Errors errors={errors} />
  </div>
);

Radio.propTypes = {
  name: number.isRequired,
  options: instanceOf(Array).isRequired,
  onChange: func.isRequired,
  errors: instanceOf(Array),
};

Radio.defaultProps = {
  errors: [],
};

export default Radio;
