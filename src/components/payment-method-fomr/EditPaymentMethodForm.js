import React, { useState,useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CustomInput } from "../custom-input/CustomInput";
import { MyVerticallyCenteredModal } from "../modal/Modal";
import {updateFetchPaymentMethod} from '../../pages/payment-method/PaymentMethodAction'
const initialState = {
  status: "inactive",
  name: "",
  description: "",
};
export const EditPaymentMethodForm = () => {
    const dispatch = useDispatch()
  const [form, setForm] = useState(initialState);
  const {selectedPaymentMethod} = useSelector(state=>state.paymentMethod)

  useEffect(() => {
    setForm(selectedPaymentMethod)
  }, [selectedPaymentMethod])
  
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
    const {createdAt,updatedAt,__v,...rest} = form
    console.log(rest)
    dispatch(updateFetchPaymentMethod(rest))
  };
  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      value:form.name,
      required:true
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      value:form.description,
      as: "textarea",
      required:true
    },
  ];
  return (
    <MyVerticallyCenteredModal title='Update Payment Method'>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Check type="switch" name="status" label="status" onChange={handleOnChange} checked={form.status==='active'} />
        </Form.Group>
        {inputFields.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}
        <Form.Group className="mb-3">
          <Button variant="success" type="submit">
            Update Payment Method
          </Button>
        </Form.Group>
      </Form>
    </MyVerticallyCenteredModal>
  );
};
