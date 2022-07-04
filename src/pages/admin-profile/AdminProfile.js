import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { AdminLayout } from "../layouts/AdminLayout";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {updateAdminProfileAction} from './AdminProfileAction'

export const AdminProfile = () => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.admin);
  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {createdAt,status,emailValidationCode,updatedAt,__v,...rest} = form
    console.log(rest, "form data");
    dispatch(updateAdminProfileAction(rest))

  };
  const inputField = [
    {
      label: "First Name",
      name: "fname",
      type: "text",
      value: form.fName,
      required: true,
    },
    {
      label: "Last Name",
      name: "lname",
      type: "text",
      value: form.lName,
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      value: form.email,
      required: true,
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      value: form.phone,
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      value: form.address,
      disabled:true
    },
    {
      label: "Dob",
      name: "dob",
      type: "date",
      value: form.dob ? form.dob.substr(0,10):undefined,
    },
    {
      label: "Current Password",
      name: "password",
      type: "password",
    },
  ];
  return (
    <AdminLayout>
      <div className="update-info mt-5">
        <h3>Your Profile</h3>
        <Form onSubmit={handleOnSubmit}>
          {inputField.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}
          <Button type="submit">Update Profile</Button>
        </Form>
      </div>
      <hr />
      <div className="update-password">
        <h3>Password Update</h3>
      </div>
    </AdminLayout>
  );
};
