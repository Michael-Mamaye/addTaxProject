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
import "../styles/radioButtonAndCheckboxStyle.css";

const FormComponent = () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const [searchText, setsearchText] = useState(null);
  // const [bracelets, setBracelets] = useState(false);

  const filterItems = () =>
    searchText
      ? resourceData.filter((data) =>
          data.name.toLowerCase().includes(searchText.toLowerCase())
        )
      : resourceData;

  const braces = filterItems().filter((data) =>
    data.parent_id === 14866 ? data.id : null
  );
  console.log({ filterItems });

  const items = filterItems().filter((data) =>
    data.parent_id === null ? data.id : null
  );
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
          alert(JSON.stringify(values, null, 2));
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
              <input
                style={taxInputStyle}
                onChange={(e) => setsearchText(e.target.value)}
                type="text"
                placeholder="Search terms"
              />
            </label>

            {/*  the below code is for the nested checkbox
             */}

            {braces.length > 0 && (
              <label style={labelStyle}>
                <input
                  type="checkbox"
                  id="selectAllBracelets"
                  className="checkmark"
                  onClick={async () => {
                    for (let i = 0; i < braces.length; i++) {
                      await document.getElementById(braces[i].id).click();
                    }
                  }}
                />
                <span>Bracelets</span>
              </label>
            )}
            {braces.map((data) => (
              <label
                className="container"
                style={{ ...labelStyle, marginLeft: 20 }}
              >
                <Field name="applicableItems">
                  {({ field }) => (
                    <input
                      className="checkmark"
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

            {/* for the items or null parent_id checkbox */}
            {items.length > 0 && (
              <label style={labelStyle}>
                <input
                  type="checkbox"
                  className="checkmark"
                  id="selectAllItems"
                  onClick={async () => {
                    for (let i = 0; i < items.length; i++) {
                      await document.getElementById(items[i].id).click();
                    }
                  }}
                />
              </label>
            )}
            {items.map((data) => (
              <label
                className="container"
                style={{ ...labelStyle, marginLeft: 20 }}
              >
                <Field name="applicableItems">
                  {({ field }) => (
                    <input
                      {...field}
                      className="checkmark"
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
            {filterItems().length === 0 && (
              <div>
                <p>No Items Found</p>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                marginTop: 10,
              }}
            >
              <button type="submit" style={{ ...submitButtonStyle }}>
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
