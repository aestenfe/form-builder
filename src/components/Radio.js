import { instanceOf } from "prop-types";
import React from "react";

const Radio = ({ data }) => (
  <div>
    {data.options.map((option) => (
      <div key={option.id}>
        <input type="radio" name={data.id} id={option.id} />
        <label htmlFor={option.id}>{option.value}</label>
      </div>
    ))}
  </div>
);

Radio.propTypes = {
  data: instanceOf(Object).isRequired,
};

export default Radio;
