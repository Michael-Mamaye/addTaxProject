import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import {
  inputPercentStyle,
  labelStyle,
  submitButtonStyle,
  taxInputStyle,
  taxPercentInputStyle,
} from "../styles/styles";
import * as Yup from "yup";
import resourceData from "../data/resource.json";
import "../styles/radioButtonAndCheckboxStyle.css";

const FormComponent = () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const [searchText, setsearchText] = useState(null);
  const [count, setCount] = useState(1);

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
          appliedTo: "apply to some",
          applicableItems: [],
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("name is required"),
        })}
        onSubmit={async (values) => {
          await sleep(500);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, errors }) => (
          <Form>
            {/* if there is an error scroll to top */}

            {errors.name && window.scrollTo(0, 0)}
            <label style={labelStyle}>
              <Field name="name">
                {({ field }) => (
                  <input
                    {...field}
                    style={
                      errors.name
                        ? { ...taxInputStyle, border: "1px solid red" }
                        : { ...taxInputStyle }
                    }
                    type="text"
                    placeholder="Tax name"
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
                  <input
                    {...field}
                    type="radio"
                    id="applyToAll"
                    onClick={async (e) => {
                      if (count !== 2) {
                        if (
                          !document.getElementById("selectAllBracelets").checked
                        )
                          await document
                            .getElementById("selectAllBracelets")
                            .click();
                        if (!document.getElementById("selectAllItems").checked)
                          await document
                            .getElementById("selectAllItems")
                            .click();
                      }
                      setCount(2);
                    }}
                    value="apply to all"
                  />
                )}
              </Field>
              Apply to all items in collection
            </label>
            <br />
            <label style={labelStyle}>
              <Field name="appliedTo">
                {({ field }) => (
                  <input
                    {...field}
                    type="radio"
                    id="applyToSome"
                    onClick={async (e) => {
                      if (count !== 1) {
                        if (
                          document.getElementById("selectAllBracelets").checked
                        )
                          await document
                            .getElementById("selectAllBracelets")
                            .click();
                        if (document.getElementById("selectAllItems").checked)
                          await document
                            .getElementById("selectAllItems")
                            .click();
                      }
                      setCount(1);
                    }}
                    defaultChecked
                    value="apply to some"
                  />
                )}
              </Field>
              Apply to specific items
            </label>

            <hr style={{ marginTop: 15, opacity: 0.7 }} />

            <label style={labelStyle}>
              <input
                style={taxInputStyle}
                onChange={(e) => setsearchText(e.target.value)}
                type="search"
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
                  onClick={async () => {
                    if (
                      !document.getElementById("selectAllBracelets").checked
                    ) {
                      for (let i = 0; i < braces.length; i++) {
                        await document.getElementById(braces[i].id).click();
                      }
                    } else
                      for (let i = 0; i < braces.length; i++) {
                        if (
                          document.getElementById(braces[i].id).checked !== true
                        )
                          await document.getElementById(braces[i].id).click();
                      }
                    if (
                      document.getElementById("selectAllBracelets").checked &&
                      document.getElementById("selectAllItems").checked
                    ) {
                      await document.getElementById("applyToAll").click();
                    } else {
                      document.getElementById("applyToAll").checked=false;
                      document.getElementById("applyToSome").checked=true;
                    }
                  }}
                />
                <span>Bracelets</span>
              </label>
            )}
            {braces.map((data) => (
              <label
                key={data.id}
                className="container"
                style={{ ...labelStyle, marginLeft: 20 }}
              >
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

            {/* for the items or null parent_id checkbox */}
            {items.length > 0 && (
              <label style={labelStyle}>
                <input
                  type="checkbox"
                  id="selectAllItems"
                  onClick={async () => {
                    if (!document.getElementById("selectAllItems").checked) {
                      for (let i = 0; i < items.length; i++) {
                        await document.getElementById(items[i].id).click();
                      }
                    } else
                      for (let i = 0; i < items.length; i++) {
                        if (
                          document.getElementById(items[i].id).checked !== true
                        )
                          await document.getElementById(items[i].id).click();
                      }
                    if (
                      document.getElementById("selectAllBracelets").checked &&
                      document.getElementById("selectAllItems").checked
                    ) {
                      await document.getElementById("applyToAll").click();
                    } else {
                      document.getElementById("applyToAll").checked=false;
                      document.getElementById("applyToSome").checked=true;
                    }
                  }}
                />
              </label>
            )}
            {items.map((data) => (
              <label
                key={data.id}
                className="container"
                style={{ ...labelStyle, marginLeft: 20 }}
              >
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
