import React from "react";
// import resourceData from "../data/resource.json";
import { mainComponentDiv } from "../styles/styles";
import FormComponent from "./FormComponent";

const MainComponent = () => {
  return (
    <div style={mainComponentDiv}>
      <h1 style={{ marginBottom: 5,fontWeight:'normal' }}>Add Tax</h1>
      <div>
        <FormComponent />
      </div>
    </div>
  );
};

export default MainComponent;
