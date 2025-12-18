import React from "react"
import LoginForm from "../forms/auth-forms/login-form"
import RegisterForm from "../forms/auth-forms/register-form"
import ResetForm from "../forms/auth-forms/reset-form"
import RegisterOtp from "../forms/auth-forms/register-otp"
import ResetOtp from "../forms/auth-forms/reset-otp"
import NewPassword from "../forms/auth-forms/newpassword-form"

export const ModalContent: Record<string, React.ReactNode> = {
  login: <LoginForm/>,
  register: <RegisterForm/>,
  reset: <ResetForm/>,
  registerOtpModal: <RegisterOtp/>,
  resetOtpModal: <ResetOtp/>,
  newPassword: <NewPassword/>,
}

export default ModalContent