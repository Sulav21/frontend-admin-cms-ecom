import React, { useState } from "react";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import "./registerForm.css";
import { useDispatch, useSelector } from "react-redux";
import { postUserAction } from "../../pages/register-login/signInUpAction";
import {Link} from 'react-router-dom'

const initialState = {
  fName: "Sam",
  lName: "Smith",
  email: "sam@smith.com",
  password: "123456",
  confirmPassword: "123456",
  phone: "1234567899",
};
export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(false);

  // pull data from redux store
  const { isLoading } = useSelector((state) => state.signInUp);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // const {form.password,form.confirmPassword} = form

    if (form.password !== form.confirmPassword) {
      return setError(true);
    }
    setError(false);

    const { confirmPassword, ...rest } = form;

    // dispatch the action to the reducer
    dispatch(postUserAction(rest));
  };

  return (
    <Container>
      <div className="form-content">
        <h3>Admin Registration Form</h3>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
            <Form.Label>First Name*</Form.Label>
            <Form.Control
              name="fName"
              value={form.fName}
              onChange={handleOnChange}
              placeholder="Enter first Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
            <Form.Label>Last Name*</Form.Label>
            <Form.Control
              name="lName"
              value={form.lName}
              onChange={handleOnChange}
              placeholder="Enter last Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
            <Form.Label>Phone*</Form.Label>
            <Form.Control
              name="phone"
              value={form.phone}
              onChange={handleOnChange}
              placeholder="Enter phone number"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
            <Form.Label>DOB</Form.Label>
            <Form.Control
              name="dob"
              onChange={handleOnChange}
              type="date"
              placeholder="2022-06-01"
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address"
              value={form.address}
              onChange={handleOnChange}
              placeholder="Enter your address"
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
            <Form.Label>Email address*</Form.Label>
            <Form.Control
              name="email"
              value={form.email}
              onChange={handleOnChange}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              name="password"
              onChange={handleOnChange}
              value={form.password}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password*</Form.Label>
            <Form.Control
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleOnChange}
              type="password"
              placeholder="Confirm Password"
              required
            />
            <Alert variant="danger" show={error}>
              Password didnot match, type the same password
            </Alert>
          </Form.Group>

          {/* <Form.Group>
            {response.message && (
              <Alert
                variant={response.status === "success" ? "success" : "danger"}
              >
                {response.message}
              </Alert>
            )}
          </Form.Group> */}

          <Button variant="primary" type="submit">
            {isLoading ? (
              <Spinner variant="primary" animation="border"/>
            ) : (
              "Sign Up"
            )}
          </Button>
        </Form>
        <div className="text-end">
          Already a user ? <Link to="/">Login Now</Link>
        </div>
      </div>
    </Container>
  );
};
