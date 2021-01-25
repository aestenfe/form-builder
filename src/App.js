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

  useEffect(() => {
    fetch("./form.json")
      .then((data) => data.json())
      .then((data) => {
        setFormData(data);
      });
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
      {formData.map((data) => (
        <FormElement key={data.id}>
          <p>{data.question}</p>
          {createField(data)}
        </FormElement>
      ))}
      <Button>Post Job</Button>
    </FormContainer>
  );
}

export default App;
