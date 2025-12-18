const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL;
const PROFILE_BASE = "https://6925eadd82b59600d725af6e.mockapi.io" 

export const REGISTER = `${BASE_URL}/register`;
export const VERIFY_REGISTER_OTP = `${BASE_URL}/verify-otp`;
export const RESEND_OTP = `${BASE_URL}/resend-otp`;
export const LOGIN = `${BASE_URL}/login`;
export const FORGET = `${BASE_URL}/forgot-password `;
export const VERIFY_FORGET_OTP = `${BASE_URL}/verify-forgot-otp`;
export const RESET = `${BASE_URL}/reset-password`;

// Profile
export const USER_PROFLE = `${PROFILE_BASE}/api/profile`;
