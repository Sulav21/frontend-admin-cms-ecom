import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { CustomInput } from "../custom-input/CustomInput";
import { MyVerticallyCenteredModal } from "../modal/Modal";
import {postFetchPaymentMethod} from '../../pages/payment-method/PaymentMethodAction'
const initialState = {
  status: "inactive",
  name: "",
  description: "",
};
export const PaymentMethodForm = () => {
    const dispatch = useDispatch()
  const [form, setForm] = useState(initialState);
  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(postFetchPaymentMethod(form))
  };
  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required:true
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      as: "textarea",
      required:true
    },
  ];
  return (
    <MyVerticallyCenteredModal title='Add new payment method'>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Check type="switch" name="status" label="status" onChange={handleOnChange} />
        </Form.Group>
        {inputFields.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}
        <Form.Group className="mb-3">
          <Button variant="success" type="submit">
            Add Payment Method
          </Button>
        </Form.Group>
      </Form>
    </MyVerticallyCenteredModal>
  );
};
