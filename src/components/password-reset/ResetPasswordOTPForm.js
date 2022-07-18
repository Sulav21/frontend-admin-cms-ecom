import React, {useState} from "react";
import { Form, Button, Container, Spinner,Alert } from "react-bootstrap";
import "./resetPassword.css";
import { useDispatch, useSelector } from "react-redux";

import {resetPassAction} from '../../pages/admin-profile/AdminProfileAction'
const initialState ={
  otp:"",
  password:"",
  confirmPassword:"",
}
export const ResetPasswordOTPForm = () => {
  const dispatch = useDispatch();
  const { passResetResponse,isLoading,passResettingEmail } = useSelector((state) => state.admin);

  const [form,setForm] = useState(initialState)
  const [error, setError] = useState("")
  const [disableBtn, setDisableBtn] = useState(true)

  
  const handleOnChange=e=>{
    const {name,value}=e.target
    setError("")
    !disableBtn && setDisableBtn(true)
    setForm({
      ...form,
      [name]:value
    })

    if(name ==='confirmPassword'){
      const {password} = form
      password !== value && setError('Password do not match')
      password.length < 6 && setError('Password must be longer than 6 characters')

      !/[a-z]/.test(password) && setError('Password must contain lower case')

      !/[A-Z]/.test(password) && setError('Password must contain upper case')

      !/[0-9]/.test(password) && setError('Password must contain a number')

      !form.password && setError('New Password must be provided')

    }
  }

 
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {confirmPassword,...rest} = form
    if(confirmPassword !== rest.password){
      return alert('Passwords do not match')
    }
    rest.email = passResettingEmail
    dispatch(resetPassAction(rest))
   console.log(form)
  };

  const disableButton=()=>{
    !error && setDisableBtn(false)
  }
  return (
    <Container>
      <div className="form-content">
        <h3>Reset Password!</h3>
        <hr/>
        {isLoading && <Spinner variant='primary' animation='border'/>}
        {
          passResetResponse.message && <Alert variant={passResetResponse.status==='success'?"success":"danger"}>
            {passResetResponse.message}
          </Alert>
        }
        <Form onSubmit={handleOnSubmit}>

          <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
            <Form.Label>OTP*</Form.Label>
            <Form.Control
              name="otp"
              // ref={emailRef}
              type='number'
              onChange={handleOnChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
            <Form.Label>New Password*</Form.Label>
            <Form.Control
              name="password"
              // ref={emailRef}
              type="password"
              onChange={handleOnChange}
              
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
            <Form.Label>Confirm Password*</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              onChange={handleOnChange}
              onBlur={disableButton}
              // ref={emailRef}
              required
            />
            <Form.Text muted>Password must contain Uppercase, Lowercase, Number and at least 6 character long</Form.Text>
            
          </Form.Group>
          <div className="text-danger fw-bold mb-3">
          {error}
          </div>
          
          <Button variant="primary" type="submit" disabled={disableBtn}>
              Update Password
          </Button>
        </Form>
        <div className="text-end">
         You can <a href="/">Login</a> Here.
        </div>
      </div>
    </Container>
  );
};
