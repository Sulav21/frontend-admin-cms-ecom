import React from "react";
import { RegisterForm } from "../../components/register-form/RegisterForm.js";
import { AdminLayout } from "../layouts/AdminLayout.js";

export const RegistrationPage = () => {
  return (
    <AdminLayout>
      <RegisterForm />
      </AdminLayout>
  );
};
