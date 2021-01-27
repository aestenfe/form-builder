import React, { useEffect, useState } from "react";
import Select from "react-select";
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

  const handleValueChange = ({ target: { name, value } }) => {
    updateValue(parseInt(name, 10), value);
  };

  const handleSelectChange = ({ value }, { name }) => {
    updateValue(name, value);
  };

  const handleClickValidate = () => {
    console.log(values);
    // eslint-disable-next-line no-alert
    alert("Valid form");
  };

  const renderCheck = (data) => {
    if (!data.render) {
      return true;
    }

    let result = false;
    data.render.forEach((rules) => {
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

  const createField = (data) => {
    switch (data.type) {
      case "text": {
        const value = values.find((element) => data.id === element.id);
        return <Input type="text" name={data.id} value={value ? value.value : ""} onChange={handleValueChange} />;
      }
      case "select":
        return (
          <Select
            options={data.options.map((option) => ({ label: option.name, value: option.id }))}
            name={data.id}
            onChange={handleSelectChange}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary50: "#B372AC",
                primary25: "#DED7DD",
                primary: "#674263",
              },
            })}
          />
        );
      case "radio":
        return <Radio data={data} />;
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
