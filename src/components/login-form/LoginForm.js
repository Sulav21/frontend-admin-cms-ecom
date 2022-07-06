import React, {useRef,useEffect} from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import "./loginForm.css";
import { useDispatch, useSelector } from "react-redux";
import { postLoginUser } from "../../pages/register-login/signInUpAction";
import {Link,useNavigate} from 'react-router-dom'


export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const [form, setForm] = useState(initialState);
  // const [error, setError] = useState(false);

  // pull data from redux store
  const { isLoading } = useSelector((state) => state.signInUp);
  const { user } = useSelector((state) => state.admin);

  const emailRef = useRef()
  const passRef= useRef()

  useEffect(() => {
    user._id && navigate('/dashboard')
  
  }, [user])
  


  const handleOnSubmit = (e) => {
    e.preventDefault();
   const email = emailRef.current.value
   const password = passRef.current.value
   if(!email || !password){
    return alert('Both input field must be filled')
   }
   console.log(email,password)

  //  Call api, through action 
dispatch(postLoginUser({email,password}))

  };

  return (
    <Container>
      <div className="form-content">
        <h3>Welcome Back</h3>
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              name="password"
              ref={passRef}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {isLoading ? (
              <Spinner variant="primary" animation="border"/>
            ) : (
              "Log In"
            )}
          </Button>
        </Form>
        <div className="text-end">
          Forgot Password?
          <a href="/forgot-password">Reset Password</a> Now.
        </div>
      </div>
    </Container>
  );
};
