import React, { useEffect, useState } from "react";
import CustomSelect from "./components/CustomSelect";
import Button from "./components/Button";
import FormContainer from "./components/FormContainer";
import FormElement from "./components/FormElement";
import Input from "./components/Input";
import Radio from "./components/Radio";
import Title from "./components/Title";

function App() {
  const [formData, setFormData] = useState([]);
  const [values, setValues] = useState([]);

  const importJsonData = () => {
    fetch("./form.json", {
      headers: {
        "Content-Type": "application.json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setValues(data.map((field) => ({
          id: field.id,
          value: (field.type === "text" ? "" : 0),
          errors: [],
        })));
      });
  };

  useEffect(() => {
    importJsonData();
  }, []);

  const updateValue = (id, value) => {
    setValues(values.map((element) => {
      if (element.id === id) {
        return { ...element, value };
      }
      return element;
    }));
  };

  const renderCheck = ({ render }) => {
    if (!render) {
      return true;
    }
    let result = false;
    render.forEach((rules) => {
      let { length } = rules.rule;
      rules.rule.forEach((rule) => {
        const value = values.find((element) => element.id === rule[0]);
        if (value && value.value === rule[1]) {
          length -= 1;
        }
      });
      if (length === 0) {
        result = true;
      }
    });
    return result;
  };

  const handleValueChange = ({ target: { name, value } }) => {
    updateValue(parseInt(name, 10), value);
  };

  const handleSelectChange = ({ value }, { name }) => {
    updateValue(name, value);
  };

  const handleRadioChange = ({ target: { name, value } }) => {
    updateValue(parseInt(name, 10), parseInt(value, 10));
  };

  const createOptions = (options) => options.map((option) => (
    { label: option.name, value: option.id }));

  const handleClickValidate = () => {
    let isError = false;
    const updatedValues = [];
    formData.forEach((field) => {
      const { type, range, required } = field;
      const value = values.find((element) => element.id === field.id);
      value.errors = [];
      if (range && value.value.length > range[1]) {
        value.errors.push(`Text must be under ${range[1]} letters.`);
        isError = true;
      }
      if (required && renderCheck(field)) {
        if (type === "text" && value.value.length < range[0]) {
          value.errors.push("Text field must be filled.");
          isError = true;
        } else if ((type === "select" || type === "radio") && value.value <= 0) {
          value.errors.push("An option must be selected.");
          isError = true;
        }
      }
      updatedValues.push(value);
    });
    setValues(updatedValues);
    if (isError === false) {
      // eslint-disable-next-line no-alert
      alert("Valid form");
    }
  };

  const createField = (data) => {
    const value = values.find((element) => data.id === element.id);
    switch (data.type) {
      case "text": {
        return (
          <Input
            name={data.id}
            value={value ? value.value : ""}
            onChange={handleValueChange}
            errors={value ? value.errors : []}
          />
        );
      }
      case "select":
        return (
          <CustomSelect
            options={createOptions(data.options)}
            name={data.id}
            onChange={handleSelectChange}
            errors={value ? value.errors : []}
          />
        );
      case "radio":
        return (
          <Radio
            name={data.id}
            options={data.options}
            onChange={handleRadioChange}
            errors={value ? value.errors : []}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormContainer>
      <Title>Form Builder</Title>
      {formData ? formData.map((data) => (
        <div key={data.id}>
          {renderCheck(data) ? (
            <FormElement question={data.question} isRequired={data.required}>
              {createField(data)}
            </FormElement>
          ) : null}
        </div>
      ))
        : null}
      <Button onClick={handleClickValidate}>Post Job</Button>
    </FormContainer>
  );
}

export default App;
