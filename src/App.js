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
  // TODO: Use values variable for form fields
  // and remove eslint-disable
  // eslint-disable-next-line no-unused-vars
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

  const createField = (data) => {
    switch (data.type) {
      case "text":
        return <Input type="text" />;
      case "select":
        return (
          <Select
            options={data.options.map((option) => ({ label: option.name, value: option.name }))}
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
        <FormElement key={data.id}>
          <p>{data.question}</p>
          {createField(data)}
        </FormElement>
      )) : null}
      <Button>Post Job</Button>
    </FormContainer>
  );
}

export default App;
