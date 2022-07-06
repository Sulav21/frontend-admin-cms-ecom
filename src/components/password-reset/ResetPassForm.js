import React, {useRef,useEffect} from "react";
import { Form, Button, Container, Spinner,Alert } from "react-bootstrap";
import "./resetPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { postLoginUser } from "../../pages/register-login/signInUpAction";
import {Link,useNavigate} from 'react-router-dom'
import { requestPassResetOTPAction } from "../../pages/admin-profile/AdminProfileAction";


export const ResetPassForm = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate()
  // const [form, setForm] = useState(initialState);
  // const [error, setError] = useState(false);

  // pull data from redux store
  // const { isLoading } = useSelector((state) => state.signInUp);
  const { passResetResponse,isLoading } = useSelector((state) => state.admin);

  const emailRef = useRef()

  // useEffect(() => {
  
  
  // }, [])
  


  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value
  console.log(email)
  dispatch(requestPassResetOTPAction({email}))
  };

  return (
    <Container>
      <div className="form-content">
        <h3>Password Change Request !</h3>
        <hr/>
        {isLoading && <Spinner variant='primary' animation='border'/>}
        {
          passResetResponse.message && <Alert variant={passResetResponse.status==='success'?"success":"danger"}>
            {passResetResponse.message}
          </Alert>
        }
        <Form onSubmit={handleOnSubmit}>

          <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
            <Form.Label>Email address*</Form.Label>
            <Form.Control
              name="email"
              ref={emailRef}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
              Request OTP
          </Button>
        </Form>
        <div className="text-end">
         You can <a href="/">Login</a> Here.
        </div>
      </div>
    </Container>
  );
};
