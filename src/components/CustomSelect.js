import { func, instanceOf, number } from "prop-types";
import React from "react";
import Select from "react-select";
import Errors from "./Errors";

const CustomSelect = ({
  name, onChange, options, errors,
}) => {
  const defaultTheme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary50: "#B372AC",
      primary25: "#DED7DD",
      primary: "#674263",
    },
  });

  return (
    <div>
      <Select
        options={options}
        name={name}
        onChange={onChange}
        theme={defaultTheme}
      />
      <Errors errors={errors} />
    </div>
  );
};

CustomSelect.propTypes = {
  name: number.isRequired,
  onChange: func.isRequired,
  options: instanceOf(Array).isRequired,
  errors: instanceOf(Array),
};

CustomSelect.defaultProps = {
  errors: [],
};

export default CustomSelect;
