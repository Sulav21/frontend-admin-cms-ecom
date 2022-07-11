import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { AdminLayout } from "../layouts/AdminLayout";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {updatePassAction, updateAdminProfileAction} from './AdminProfileAction'

const passInitialState= {
  currentPassword: "",
  password:"",
  confirmPassword:"",
}
export const AdminProfile = () => {
  const [form, setForm] = useState({});
  const dispatch = useDispatch()
  const [passUpdateForm, setPassUpdateForm] = useState(passInitialState)
  const [error, setError] = useState("")
  const [disableBtn, setDisableBtn] = useState(true)
  const { user,passResettingEmail} = useSelector((state) => state.admin);

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

  // password update

  const handleOnPasswordChange=e=>{
    const {name,value}=e.target
   if (name==='password' || name==='confirmPassword'){
    setError("")
    !disableBtn && setDisableBtn(true)
   }
    setPassUpdateForm({
      ...passUpdateForm,
      [name]:value
    })

    if(name ==='confirmPassword'){
      const {password} = passUpdateForm
      password !== value && setError('Password do not match')
      password.length < 6 && setError('Password must be longer than 6 characters')

      !/[a-z]/.test(password) && setError('Password must contain lower case')

      !/[A-Z]/.test(password) && setError('Password must contain upper case')

      !/[0-9]/.test(password) && setError('Password must contain a number')

      !passUpdateForm.password && setError('New Password must be provided')

    }
  }

  const handleOnPasswordSubmit = (e) => {
    e.preventDefault();
    const {currentPassword,confirmPassword,password} = passUpdateForm
    if(confirmPassword !== password){
      return alert('Passwords do not match')
    }
    const obj= {
      password,
      email:user.email,
      currentPassword,

    }
    dispatch(updatePassAction(obj))
  };

  const disableButton=()=>{
    !error && setDisableBtn(false)
  }


  const resetPassField = [
    {
      label: "Current Password",
      name: "currentPassword",
      type: "password",
      value:passUpdateForm.currentPassword,
      required:true
    },
    {
      label: "New Password",
      name: "password",
      type: "password",
      value:passUpdateForm.password,
      required:true
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      onBlur:disableButton, 
      value:passUpdateForm.confirmPassword,
      required:true
    },
  ]
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
        <hr />
      <div className="update-password">
        <h3>Password Update</h3>
      </div>
        <Form onSubmit={handleOnPasswordSubmit}>
          {resetPassField.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnPasswordChange} />
          ))}
          <Form.Group className='mb-3'>
          <Form.Text muted>Password must contain Uppercase, Lowercase, Number and at least 6 character long</Form.Text>
          <div className="text-danger fw-bold mb-3">
          {error}
          </div>
          </Form.Group>
          <Button type="submit" disabled={disableBtn}>Update Password</Button>
        </Form>
      </div>
     
    </AdminLayout>
  );
};
