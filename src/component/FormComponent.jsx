import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import {
  inputPercentStyle,
  labelStyle,
  submitButtonStyle,
  taxInputStyle,
  taxPercentInputStyle,
} from "../styles/styles";
import resourceData from "../data/resource.json";
const FormComponent = () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const [bracelets, setBracelets] = useState(false);

  const braces = resourceData.filter((data) =>
    data.parent_id === 14866 ? data.id : null
  );

  const items = resourceData.filter((data) =>
    data.parent_id === 14866 ? data.id : null
  );

  const filterItems = () => resourceData.filter((data) => data.includes());
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          rate: 5,
          appliedTo: "",
          applicableItems: [],
        }}
        // validationSchema={{}}
        onSubmit={async (values) => {
          await sleep(500);
          let toBeDisplayed=values;
          toBeDisplayed.rate=toBeDisplayed.rate/100
          alert(JSON.stringify(toBeDisplayed, null, 2));
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <Form>
            {console.log(values)}
            <label style={labelStyle}>
              <Field name="name">
                {({ field }) => (
                  <input
                    {...field}
                    style={taxInputStyle}
                    type="text"
                    placeholder="Tax Placeholder"
                  />
                )}
              </Field>
              <Field name="rate">
                {({ field }) => (
                  <input
                    {...field}
                    style={taxPercentInputStyle}
                    type="number"
                    placeholder={values.rate}
                  />
                )}
              </Field>
              <span style={inputPercentStyle}>%</span>
            </label>
            <label style={labelStyle}>
              <Field name="appliedTo">
                {({ field }) => (
                  <input {...field} type="radio" value="apply to all" />
                )}
              </Field>
              Apply to all items in collection
            </label>
            <br />
            <label style={labelStyle}>
              <Field name="appliedTo">
                {({ field }) => (
                  <input {...field} type="radio" value="apply to some" />
                )}
              </Field>
              Apply to specific items
            </label>

            <hr style={{ marginTop: 15, opacity: 0.7 }} />

            <label style={labelStyle}>
              <Field name="appliedTo">
                {({ field }) => (
                  <input {...field} style={taxInputStyle} type="text" placeholder="Search terms" />
                )}
              </Field>
            </label>

            {/*  the below code is for the nested checkbox
             */}

            <label style={labelStyle}>
              <input
                type="checkbox"
                id="selectAllBracelets"
                onClick={() => setBracelets(!bracelets)}
              />
              <span>Bracelets</span>
            </label>
            {braces.map((data) => (
              <label style={{ ...labelStyle, marginLeft: 20 }}>
                <Field name="applicableItems">
                  {({ field }) => (
                    <input
                      {...field}
                      id={data.id}
                      type="checkbox"
                      value={data.id}
                    />
                  )}
                </Field>
                <span>{data.name}</span>
                <br />
              </label>
            ))}
            <label style={labelStyle}>
              <input
                type="checkbox"
                id="selectAllItems"
                onClick={() => setBracelets(!bracelets)}
              />
            </label>
            {items.map((data) => (
              <label style={{ ...labelStyle, marginLeft: 20 }}>
                <Field name="applicableItems">
                  {({ field }) => (
                    <input
                      {...field}
                      id={data.id}
                      type="checkbox"
                      value={data.id}
                    />
                  )}
                </Field>
                <span>{data.name}</span>
                <br />
              </label>
            ))}
            <div style={{display:'flex',flexDirection:'row',justifyContent:'end'}}>
            <button type="submit" style={{...submitButtonStyle}}>
              {`Apply tax to ${values.applicableItems.length} Item(s)`}
            </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormComponent;
