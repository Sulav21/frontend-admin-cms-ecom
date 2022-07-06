import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { LoginForm } from '../../components/login-form/LoginForm'
import { ResetPassForm } from '../../components/password-reset/ResetPassForm'
import { ResetPasswordOTPForm } from '../../components/password-reset/ResetPasswordOTPForm'
import { DefaultLayout } from '../layouts/DefaultLayout'

export const ResetPassword = () => {
  const {showForm} = useSelector(state=>state.admin)
  const form = {
    otp: <ResetPassForm />,
    password:<ResetPasswordOTPForm />
  }
  return (
    <DefaultLayout>
     { form[showForm]  }
       
    </DefaultLayout>
  )
}
