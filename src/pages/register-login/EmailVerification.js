import React, { useEffect, useState } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { postUserVerification } from "../../helpers/axiosHelpers";

export const EmailVerification = () => {
  const [queryParams] = useSearchParams();
  const [isPending, setIsPending] = useState(true);
  const [response, setResponse] = useState({});
  useEffect(() => {
    const obj = {
      emailValidationCode: queryParams.get("c"),
      email: queryParams.get("e"),
    };
    (async () => {
      const response = await postUserVerification(obj);
      setResponse(response);
      setIsPending(false);
      console.log(response);
    })();
  }, []);
  return (
    <div className="container d-flex justify-content-center">
      <div className="verify-email bg-info p-3 mt-5 w-75 rounded">
        <h2>Email Verification</h2>
        <hr />
        {isPending && (
          <>
            {""}
            <Spinner variant="primary" animation="border" />
            Please Wait ...
          </>
        )}
        {response.message && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}

        {response.status === "success" && <Link to="/">Login Now</Link>}
      </div>
    </div>
  );
};
