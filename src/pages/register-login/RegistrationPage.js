import React from "react";
import { RegisterForm } from "../../components/register-form/RegisterForm.js";
import { DefaultLayout } from "../layouts/DefaultLayout.js";

export const RegistrationPage = () => {
  return (
    <DefaultLayout>
      <RegisterForm />
    </DefaultLayout>
  );
};
